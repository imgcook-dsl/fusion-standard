module.exports = function(schema, option) {
  const {prettier} = option;

  // imports
  const imports = [];

  // inline style
  const style = {};

  // Global Public Functions
  const utils = [];

  // Classes 
  const classes = [];

  // 1vw = width / 100
  const _w = (option.responsive.width / 100) || 750;

  const componentsMap = option.componentsMap;
  const components = [];

  const importComponent = (type) => {
    let result = '';

    if (!componentsMap || !componentsMap.list) {
      return result;
    }

    if (componentsMap && !components.includes(type)) {
      const componentMap = componentsMap.list.filter(com => com.name === type)[0];

      if (componentMap) {
        const pkgName = componentMap.package ? componentMap.package : '@alifd/next';

        // hack
        componentMap.destructuring = 1;

        if (componentMap.exportName) {
          if (componentMap.exportName !== componentMap.name) {
            if (componentMap.subName) {
              let exportName = componentMap.destructuring 
                ? `{ ${componentMap.name} }` 
                : componentMap.name;
              result = componentMap.main
                ? `import ${exportName} from '${pkgName}${componentMap.main}'`
                : `import ${exportName} from '${pkgName}'`;
              result += `\nconst ${componentMap.name} = ${exportName}.${componentMap.subName}`;
            } else {
              let exportName = componentMap.destructuring 
                ? `{ ${componentMap.exportName} as ${componentMap.name} }` 
                : `${componentMap.exportName} as ${componentMap.name}`;
              result = componentMap.main
                ? `import ${exportName} from '${pkgName}${componentMap.main}'`
                : `import ${exportName} from '${pkgName}'`;
            }
          }
        } else {
          let exportName = componentMap.destructuring ? `{ ${componentMap.name} }` : componentMap.name;
          result = componentMap.main
            ? `import ${exportName} from '${pkgName}${componentMap.main}'`
            : `import ${exportName} from '${pkgName}'`;
        }

        components.push(componentMap.name);
      } else {
        // not find in componentsMap
        result = `import {${type}} from '@alifd/next'`;
        components.push(type);
      }      
    }

    return result;
  };

  const isExpression = (value) => {
    return /^\{\{.*\}\}$/.test(value);
  }

  const toString = (value) => {
    if ({}.toString.call(value) === '[object Function]') {
      return value.toString();
    }
    if (typeof value === 'string') {
      return value;
    }
    if (typeof value === 'object') {
      return JSON.stringify(value, (key, value) => {
        if (typeof value === 'function') {
          return value.toString();
        } else {
          return value;
        }
      })
    }

    return String(value);
  };

  // flexDirection -> flex-direction
  const parseCamelToLine = (string) => {
    return string.split(/(?=[A-Z])/).join('-').toLowerCase();
  }

  // className structure support
  const generateLess = (schema, style) => {
    let less = '';

    function walk(json) {
      if (json.props && json.props.className) {
        let className = json.props.className;
        less += `.${className} {`;

        for (let key in style[className]) {
          less += `${parseCamelToLine(key)}: ${style[className][key]};\n`
        }
      }

      if (Array.isArray(json.children) && json.children.length > 0) {
        json.children.forEach(child => walk(child));
      }

      if (json.props && json.props.className) {
        less += '}';
      }
    }

    walk(schema);

    return less;
  };

  // convert to responsive unit, such as vw
  const parseStyle = (styles) => {
    for (let style in styles) {
      for (let key in styles[style]) {
        switch (key) {
          case 'fontSize':
          case 'marginTop':
          case 'marginBottom':
          case 'paddingTop':
          case 'paddingBottom':
          case 'height':
          case 'top':
          case 'bottom':
          case 'width':
          case 'maxWidth':
          case 'left':
          case 'right':
          case 'paddingRight':
          case 'paddingLeft':
          case 'marginLeft':
          case 'marginRight':
          case 'lineHeight':
          case 'borderBottomRightRadius':
          case 'borderBottomLeftRadius':
          case 'borderTopRightRadius':
          case 'borderTopLeftRadius':
          case 'borderRadius':
            styles[style][key] = (parseInt(styles[style][key]) / _w).toFixed(2) + 'vw';
            break;
        }
      }
    }

    return styles;
  }

  // parse function, return params and content
  const parseFunction = (func) => {
    const funcString = func.toString();
    const params = funcString.match(/\([^\(\)]*\)/)[0].slice(1, -1);
    const content = funcString.slice(funcString.indexOf('{') + 1, funcString.lastIndexOf('}'));
    return {
      params,
      content
    };
  }

  // parse layer props(static values or expression)
  const parseProps = (value, isReactNode) => {
    if (typeof value === 'string' || typeof value === 'number') {
      if (isExpression(value)) {
        if (isReactNode) {
          return value.slice(1, -1);
        } else {
          return value.slice(2, -2);
        }
      }

      if (isReactNode) {
        return value;
      } else {
        return `'${value}'`;
      }
    } else if (typeof value === 'function') {
      const {params, content} = parseFunction(value);
      return `(${params}) => {${content}}`;
    } else if (typeof value === 'boolean') {
      return value;
    } else if (typeof value === 'object') {
      return JSON.stringify(value);
    }
  }

  // parse async dataSource
  const parseDataSource = (data) => {
    const name = data.id;
    const {uri, method, params} = data.options;
    const action = data.type;
    let payload = {};

    switch (action) {
      case 'fetch':
        if (imports.indexOf(`import {fetch} from whatwg-fetch`) === -1) {
          imports.push(`import {fetch} from 'whatwg-fetch'`);
        }
        payload = {
          method: method
        };

        break;
      case 'jsonp':
        if (imports.indexOf(`import {fetchJsonp} from fetch-jsonp`) === -1) {
          imports.push(`import jsonp from 'fetch-jsonp'`);
        }
        break;
    }

    Object.keys(data.options).forEach((key) => {
      if (['uri', 'method', 'params'].indexOf(key) === -1) {
        payload[key] = toString(data.options[key]);
      }
    });

    // params parse should in string template
    if (params) {
      payload = `${toString(payload).slice(0, -1)} ,body: ${isExpression(params) ? parseProps(params) : toString(params)}}`;
    } else {
      payload = toString(payload);
    }

    let result = `{
      ${action}(${parseProps(uri)}, ${toString(payload)})
        .then((response) => response.json())
    `;

    if (data.dataHandler) {
      const { params, content } = parseFunction(data.dataHandler);
      result += `.then((${params}) => {${content}})
        .catch((e) => {
          console.log('error', e);
        })
      `
    }

    result += '}';

    return `${name}() ${result}`;
  }

  // parse condition: whether render the layer
  const parseCondition = (condition, render) => {
    if (typeof condition === 'boolean') {
      return `${condition} && ${render}`
    } else if (typeof condition === 'string') {
      return `${condition.slice(2, -2)} && ${render}`
    }
  }

  // parse loop render
  const parseLoop = (loop, loopArg, render) => {
    let data;
    let loopArgItem = (loopArg && loopArg[0]) || 'item';
    let loopArgIndex = (loopArg && loopArg[1]) || 'index';

    if (Array.isArray(loop)) {
      data = toString(loop);
    } else if (isExpression(loop)) {
      data = loop.slice(2, -2);
    }

    // add loop key
    const tagEnd = render.match(/^<[^\s>]+/)[0].length;
    render = `${render.slice(0, tagEnd)} key={${loopArgIndex}}${render.slice(tagEnd)}`;

    // remove `this` 
    const re = new RegExp(`this.${loopArgItem}`, 'g')
    render = render.replace(re, loopArgItem);

    return `${data}.map((${loopArgItem}, ${loopArgIndex}) => {
      return (${render});
    })`;
  }

  // generate render xml
  const generateRender = (schema) => {
    const type = schema.componentName;
    const className = schema.props && schema.props.className;
    const classString = className ? ` style={styles.${className}}` : '';

    if (className) {
      style[className] = schema.props.style;
    }

    let xml;
    let props = '';

    Object.keys(schema.props).forEach((key) => {
      if (['className', 'style', 'text', 'src'].indexOf(key) === -1) {
        props += ` ${key}={${parseProps(schema.props[key])}}`;
      }
    })

    switch(type) {
      case 'Text':
        const innerText = parseProps(schema.props.text, true);
        xml = `<span${classString}${props}>${innerText}</span>`;
        break;
      case 'Image':
        const source = parseProps(schema.props.src);
        xml = `<img${classString}${props} src={${source}} />`;
        break;
      case 'Div':
      case 'Page':
      case 'Block':
      case 'Component':
        if (schema.children && schema.children.length) {
          xml = `<div${classString}${props}>${transform(schema.children)}</div>`;
        } else {
          xml = `<div${classString}${props} />`;
        }
        break;
      default:
        if (schema.children && schema.children.length) {
          xml = `<${type}${classString}${props}>${transform(schema.children)}</${type}>`;
        } else {
          xml = `<${type}${classString}${props} />`;
        }

        const importString = importComponent(type);

        if (importString) {
          imports.push(importString);
        }
        
        break;
    }

    if (schema.loop) {
      xml = parseLoop(schema.loop, schema.loopArgs, xml)
    }
    if (schema.condition) {
      xml = parseCondition(schema.condition, xml);
    }
    if (schema.loop || schema.condition) {
      xml = `{${xml}}`;
    }

    return xml;
  }

  // parse schema
  const transform = (schema) => {
    let result = '';

    if (Array.isArray(schema)) {
      schema.forEach((layer) => {
        result += transform(layer);
      });
    } else if (typeof schema === 'string') {
      // text string children
      result += schema;
    } else {
      if (!schema.componentName) return result;

      const type = schema.componentName.toLowerCase();

      if (['page', 'block', 'component'].indexOf(type) !== -1) {
        // 容器组件处理: state/method/dataSource/lifeCycle/render
        const states = [];
        const lifeCycles = [];
        const methods = [];
        const init = [];
        const render = [`render(){ return (`];
        let classData = [`class ${schema.componentName}_${classes.length} extends Component {`];

        if (schema.state) {
          states.push(`state = ${toString(schema.state)}`);
        }

        if (schema.methods) {
          Object.keys(schema.methods).forEach((name) => {
            const { params, content } = parseFunction(schema.methods[name]);
            methods.push(`${name}(${params}) {${content}}`);
          });
        }

        if (schema.dataSource && Array.isArray(schema.dataSource.list)) {
          schema.dataSource.list.forEach((item) => {
            if (typeof item.isInit === 'boolean' && item.isInit) {
              init.push(`this.${item.id}();`)
            } else if (typeof item.isInit === 'string') {
              init.push(`if (${parseProps(item.isInit)}) { this.${item.id}(); }`)
            }
            methods.push(parseDataSource(item));
          });

          if (schema.dataSource.dataHandler) {
            const { params, content } = parseFunction(schema.dataSource.dataHandler);
            methods.push(`dataHandler(${params}) {${content}}`);
            init.push(`this.dataHandler()`);
          }
        }

        if (schema.lifeCycles) {
          if (!schema.lifeCycles['_constructor']) {
            lifeCycles.push(`constructor(props, context) { super(); ${init.join('\n')}}`);
          }

          Object.keys(schema.lifeCycles).forEach((name) => {
            const { params, content } = parseFunction(schema.lifeCycles[name]);

            if (name === '_constructor') {
              lifeCycles.push(`constructor(${params}) { super(); ${content} ${init.join('\n')}}`);
            } else {
              lifeCycles.push(`${name}(${params}) {${content}}`);
            }
          });
        }

        render.push(generateRender(schema))
        render.push(`);}`);

        classData = classData.concat(states).concat(lifeCycles).concat(methods).concat(render);
        classData.push('}');

        classes.push(classData.join('\n'));
      } else {
        result += generateRender(schema);
      }
    }

    return result;
  };

  if (option.utils) {
    Object.keys(option.utils).forEach((name) => {
      utils.push(`const ${name} = ${option.utils[name]}`);
    });
  }

  // start parse schema
  transform(schema);

  const prettierOpt = {
    parser: 'babel',
    printWidth: 120,
    singleQuote: true
  };

  return {
    panelDisplay: [
      {
        panelName: `index.jsx`,
        panelValue: prettier.format(`
          'use strict';

          import React, { Component } from 'react';
          ${imports.join('\n')}
          import styles from './style.js';
          ${utils.join('\n')}
          ${classes.join('\n')}
          export default ${schema.componentName}_0;
        `, prettierOpt),
        panelType: 'js',
      },
      {
        panelName: `style.js`,
        panelValue: prettier.format(`export default ${toString(style)}`, prettierOpt),
        panelType: 'js'
      },
      {
        panelName: `style.less`,
        panelValue: prettier.format(generateLess(schema, style), { parser: 'less' }),
        panelType: 'less'
      },
      {
        panelName: `style.responsive.js`,
        panelValue: prettier.format(`export default ${toString(parseStyle(style))}`, prettierOpt),
        panelType: 'js'
      }
    ],
    noTemplate: true
  };
}
