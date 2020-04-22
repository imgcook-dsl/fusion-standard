'use strict';

import React, { Component } from 'react';
import { NavItem } from '@alifd/next';
import { Nav } from '@alifd/next';
import { Col } from '@alifd/next';
import { Select } from '@alifd/next';
import { FormItem } from '@alifd/next';
import { Form } from '@alifd/next';
import { LineChartBG } from '@alifd/next';
import { TableColumn } from '@alifd/next';
import { Table } from '@alifd/next';
import { Row } from '@alifd/next';
import styles from './style.js';
const print = function(value) {
  console.log(value);
};
class Page_0 extends Component {
  render() {
    return (
      <div>
        <Nav footer={''} direction={'hoz'} type={'primary'} header={[]}>
          <NavItem>蚁服</NavItem>
          <NavItem>FINANCIAL TECHNOLOGY</NavItem>
          <NavItem>金融科技</NavItem>
          <NavItem>管理控制台</NavItem>
          <NavItem>出产品与服务V</NavItem>
        </Nav>
        <Row>
          <Col span={'4'}>
            <Nav direction={'ver'} type={'normal'}>
              <NavItem key={'level1Menu0'}>一级菜单</NavItem>
              <NavItem key={'level1Menu1'}>一级菜单</NavItem>
              <NavItem key={'level1Menu2'}>一级菜单</NavItem>
              <NavItem key={'level2Menu3'}>二级菜单</NavItem>
              <NavItem key={'level2Menu4'}>二级菜单</NavItem>
              <NavItem key={'level2Menu5'}>二级菜单</NavItem>
            </Nav>
          </Col>
          <Col>
            <Form inline={true} labelAlign={'left'}>
              <FormItem label={'产品名称'} name={'productName'}>
                <Select />
              </FormItem>
              <FormItem label={'页面'} name={'page'}>
                <Select />
              </FormItem>
              <FormItem label={'门户页'} name={'portalPage'}></FormItem>
            </Form>
            <div>
              <LineChartBG
                yType={'normal'}
                forceFit={true}
                line={true}
                point={false}
                area={false}
                shape={'line'}
                legend={true}
                y={['Tokyo']}
                data={[
                  { month: 'Jan', Tokyo: 7, London: 3.9 },
                  { month: 'Feb', Tokyo: 6.9, London: 4.2 },
                  { month: 'Mar', Tokyo: 9.5, London: 5.7 },
                  { month: 'Apr', Tokyo: 14.5, London: 8.5 },
                  { month: 'May', Tokyo: '-', London: '-' },
                  { month: 'Jun', Tokyo: 21.5, London: 15.2 },
                  { month: 'Jul', Tokyo: 25.2, London: 17 },
                  { month: 'Aug', Tokyo: 26.5, London: 16.6 },
                  { month: 'Sep', Tokyo: 23.3, London: 14.2 },
                  { month: 'Oct', Tokyo: 18.3, London: 10.3 },
                  { month: 'Nov', Tokyo: 13.9, London: 6.6 },
                  { month: 'Dec', Tokyo: 9.6, London: 4.8 }
                ]}
                x={'month'}
                fillX={true}
                tooltip={{ field: 'month' }}
              />
            </div>
            <Table
              dataSource={[
                { time: '0：00', pv: '6567', uv: '344', indicator1: '+50%', indicator2: '+32%' },
                { time: '0：00', pv: '6567', uv: '344', indicator1: '+50%', indicator2: '+32%' },
                { time: '0：00', pv: '6567', uv: '344', indicator1: '+50%', indicator2: '+32%' },
                { time: '0：00', pv: '6567', uv: '344', indicator1: '+50%', indicator2: '+32%' }
              ]}
            >
              <TableColumn title={'时间'} dataIndex={'time'} key={'time'} renderType={'text'} />
              <TableColumn title={'Pv'} dataIndex={'pv'} key={'pv'} renderType={'text'} />
              <TableColumn title={'Uv'} dataIndex={'uv'} key={'uv'} renderType={'text'} />
              <TableColumn title={'指标一'} dataIndex={'indicator1'} key={'indicator1'} renderType={'text'} />
              <TableColumn title={'指标二'} dataIndex={'indicator2'} key={'indicator2'} renderType={'text'} />
            </Table>
          </Col>
        </Row>
      </div>
    );
  }
}
export default Page_0;
