module.exports = {
  "componentName": "Page",
  "fileName": "index",
  "props": {},
  "children": [{
    "componentName": "Nav",
    "props": {
      "footer": "",
      "direction": "hoz",
      "type": "primary",
      "style": {
        "margin": "0 0 0 0",
        "padding": "0 20px 0 0"
      },
      "header": []
    },
    "children": [{
      "componentName": "NavItem",
      "props": {},
      "children": "蚁服"
    }, {
      "componentName": "NavItem",
      "props": {},
      "children": "FINANCIAL TECHNOLOGY"
    }, {
      "componentName": "NavItem",
      "props": {},
      "children": "金融科技"
    }, {
      "componentName": "NavItem",
      "props": {},
      "children": "管理控制台"
    }, {
      "componentName": "NavItem",
      "props": {},
      "children": "出产品与服务V"
    }]
  }, {
    "componentName": "Row",
    "props": {
      "style": {}
    },
    "children": [{
      "componentName": "Col",
      "props": {
        "span": 4
      },
      "children": [{
        "componentName": "Nav",
        "props": {
          "direction": "ver",
          "type": "normal",
          "style": {
            "margin": "0 0 0 0",
            "padding": "0 20px 0 0",
            "height": "100%"
          }
        },
        "children": [{
          "componentName": "NavItem",
          "props": {
            "key": "level1Menu0"
          },
          "children": "一级菜单"
        }, {
          "componentName": "NavItem",
          "props": {
            "key": "level1Menu1"
          },
          "children": "一级菜单"
        }, {
          "componentName": "NavItem",
          "props": {
            "key": "level1Menu2"
          },
          "children": "一级菜单"
        }, {
          "componentName": "NavItem",
          "props": {
            "key": "level2Menu3"
          },
          "children": "二级菜单"
        }, {
          "componentName": "NavItem",
          "props": {
            "key": "level2Menu4"
          },
          "children": "二级菜单"
        }, {
          "componentName": "NavItem",
          "props": {
            "key": "level2Menu5"
          },
          "children": "二级菜单"
        }]
      }]
    }, {
      "componentName": "Col",
      "props": {},
      "children": [{
        "componentName": "Form",
        "props": {
          "inline": true,
          "labelAlign": "left",
          "style": {
            "margin": 20
          }
        },
        "children": [
          [
            [{
              "componentName": "FormItem",
              "props": {
                "label": "产品名称",
                "name": "productName",
                "style": {
                  "width": "30%"
                }
              },
              "children": [{
                "componentName": "Select",
                "props": {}
              }]
            }],
            [{
              "componentName": "FormItem",
              "props": {
                "label": "页面",
                "name": "page",
                "style": {
                  "width": "30%"
                }
              },
              "children": [{
                "componentName": "Select",
                "props": {}
              }]
            }],
            [{
              "componentName": "FormItem",
              "props": {
                "label": "门户页",
                "name": "portalPage",
                "style": {
                  "width": "30%"
                }
              },
              "children": [{
                "props": {}
              }]
            }]
          ]
        ]
      }, {
        "componentName": "Div",
        "props": {
          "style": {
            "margin": 20
          }
        },
        "children": [{
          "componentName": "LineChartBG",
          "props": {
            "yType": "normal",
            "forceFit": true,
            "line": true,
            "point": false,
            "area": false,
            "shape": "line",
            "legend": true,
            "y": ["Tokyo"],
            "data": [{
              "month": "Jan",
              "Tokyo": 7,
              "London": 3.9
            }, {
              "month": "Feb",
              "Tokyo": 6.9,
              "London": 4.2
            }, {
              "month": "Mar",
              "Tokyo": 9.5,
              "London": 5.7
            }, {
              "month": "Apr",
              "Tokyo": 14.5,
              "London": 8.5
            }, {
              "month": "May",
              "Tokyo": "-",
              "London": "-"
            }, {
              "month": "Jun",
              "Tokyo": 21.5,
              "London": 15.2
            }, {
              "month": "Jul",
              "Tokyo": 25.2,
              "London": 17
            }, {
              "month": "Aug",
              "Tokyo": 26.5,
              "London": 16.6
            }, {
              "month": "Sep",
              "Tokyo": 23.3,
              "London": 14.2
            }, {
              "month": "Oct",
              "Tokyo": 18.3,
              "London": 10.3
            }, {
              "month": "Nov",
              "Tokyo": 13.9,
              "London": 6.6
            }, {
              "month": "Dec",
              "Tokyo": 9.6,
              "London": 4.8
            }],
            "x": "month",
            "fillX": true,
            "tooltip": {
              "field": "month"
            }
          }
        }]
      }, {
        "componentName": "Table",
        "props": {
          "style": {
            "margin": 20
          },
          "dataSource": [{
            "time": "0：00",
            "pv": "6567",
            "uv": "344",
            "indicator1": "+50%",
            "indicator2": "+32%"
          }, {
            "time": "0：00",
            "pv": "6567",
            "uv": "344",
            "indicator1": "+50%",
            "indicator2": "+32%"
          }, {
            "time": "0：00",
            "pv": "6567",
            "uv": "344",
            "indicator1": "+50%",
            "indicator2": "+32%"
          }, {
            "time": "0：00",
            "pv": "6567",
            "uv": "344",
            "indicator1": "+50%",
            "indicator2": "+32%"
          }]
        },
        "children": [{
          "componentName": "TableColumn",
          "props": {
            "title": "时间",
            "dataIndex": "time",
            "key": "time",
            "renderType": "text"
          }
        }, {
          "componentName": "TableColumn",
          "props": {
            "title": "Pv",
            "dataIndex": "pv",
            "key": "pv",
            "renderType": "text"
          }
        }, {
          "componentName": "TableColumn",
          "props": {
            "title": "Uv",
            "dataIndex": "uv",
            "key": "uv",
            "renderType": "text"
          }
        }, {
          "componentName": "TableColumn",
          "props": {
            "title": "指标一",
            "dataIndex": "indicator1",
            "key": "indicator1",
            "renderType": "text"
          }
        }, {
          "componentName": "TableColumn",
          "props": {
            "title": "指标二",
            "dataIndex": "indicator2",
            "key": "indicator2",
            "renderType": "text"
          }
        }]
      }]
    }]
  }],
  "reference": "fusion_image",
  "artboardImg": "https://img.alicdn.com/tfs/TB1P28qAoY1gK0jSZFMXXaWcVXa-2880-2126.png"
}