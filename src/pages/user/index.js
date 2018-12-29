import React from 'react'
import { Card, Button, Table, Form, Input, Checkbox,Select,Radio, Icon, message, Modal, DatePicker } from 'antd'
import axios from './../../axios'
import Utils from '../../utils/utils'

const FormItem = Form.Item;

export default class User extends React.Component{

    state = {}

    params = {
        page:1
    }

    componentDidMount(){
        this.requestList();
    }

    handleFilter=(params)=>{
        console.log(params)
        this.params = params;
        this.requestList();
    }

    requestList = ()=>{
        axios.ajax({
            url:'/table/list1',
            data:this.params
        }).then((res)=>{
            if(res.code == 0){
                this.setState({
                    list:res.result.list.map((item,index)=>{
                        item.key = index;
                        return item;
                    }),
                    pagination: Utils.pagination(res, (current)=>{
                        this.params.page = current;
                        this.requestList();
                    })
                })
            }
        })
    }

    onRowClick = (record, index) => {
        let selectedRowKeys = [index];
        this.setState({
            selectedRowKeys,
            selectedItem: record
        })
    }

    render(){

        const columns = [{
            title: 'id',
            dataIndex: 'id'
          }, {
            title: '用户名',
            dataIndex: 'username'
          }, {
            title: '性别',
            dataIndex: 'sex',
            render(sex){
                return sex ==1 ?'男':'女'
            }
          }, {
            title: '状态',
            dataIndex: 'state',
            render(state){
                let config = {
                    '1':'咸鱼一条',
                    '2':'风华浪子',
                    '3':'北大才子一枚',
                    '4':'百度FE',
                    '5':'创业者'
                }
                return config[state];
            }
          },{
            title: '爱好',
            dataIndex: 'interest',
            render(interest){
                let config = {
                    '1':'游泳',
                    '2':'打篮球',
                    '3':'踢足球',
                    '4':'跑步',
                    '5':'爬山',
                    '6':'骑行',
                    '7':'桌球',
                    '8':'麦霸'
                }
                return config[interest];
            }
          },{
            title: '婚姻情况',
            dataIndex: 'isMarried',
            render(isMarried){
                return isMarried?'已婚':'未婚'
            }
          },{
            title: '生日',
            dataIndex: 'birthday'
          },{
            title: '联系地址',
            dataIndex: 'address'
          },{
            title: '早起时间',
            dataIndex: 'time'
          }
        ];

        const selectedRowKeys = this.state.selectedRowKeys;

        const rowSelection = {
            type: 'radio',
            selectedRowKeys
        }
        return (
            <div>
                <Card>
                    <FilterForm filterSubmit={this.handleFilter}/>
                </Card>
                <Card style={{marginTop:10}} className="operate-wrap">
                    <Button type="primary" icon="plus" onClick={()=>this.handleOperator('create')}>创建员工</Button>
                    <Button icon="edit" onClick={()=>this.handleOperator('edit')}>编辑员工</Button>
                    <Button onClick={()=>this.handleOperator('detail')}>员工详情</Button>
                    <Button type="danger" icon="delete" onClick={()=>this.handleOperator('delete')}>删除员工</Button>
                </Card>
                <div className="content-wrap">
                    <Table 
                        bordered
                        columns={columns}
                        dataSource={this.state.list}
                        pagination={this.state.pagination}
                        rowSelection={rowSelection}
                        onRow={(record, index)=>{
                            return {
                                onClick:()=>{
                                    this.onRowClick(record, index);
                                }
                            };
                        }}
                    />
                </div>
            </div>
        );
    }
}

class FilterForm extends React.Component{

    handleFilterSubmit = ()=>{
        let fieldsValue = this.props.form.getFieldsValue();
        this.props.filterSubmit(fieldsValue);
    }

    reset = ()=>{
        this.props.form.resetFields();
    }

    render(){

        const { getFieldDecorator }  =this.props.form;

        return (
            <Form layout="inline">
                <FormItem label="用户名">
                    {
                        getFieldDecorator('user_name',{
                            initialValue:''
                        })(
                            <Input placeholder="请输入用户名"/>
                        )
                    }
                </FormItem>
                <FormItem label="手机号">
                    {
                        getFieldDecorator('user_mobile',{
                            rules:[
                                {
                                    required:false,
                                    pattern: new RegExp(/^[1-9]\d*$/, "g"),
                                     message: '请输入正确的手机号'
                                }
                            ]
                        })(
                            <Input placeholder="请输入手机号"/>
                        )
                    }
                </FormItem>
                <FormItem label="入职时间">
                    {
                        getFieldDecorator('user_date',{
                            initialValue:''
                        })(
                            <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" placeholder="入职时间"/>
                        )
                    }
                </FormItem>
                <FormItem>
                    <Button type="primary" style={{margin:'0 20px'}} onClick={this.handleFilterSubmit}>查询</Button>
                    <Button onClick={this.reset}>重置</Button>
                </FormItem>
            </Form>
        );
    }
}
FilterForm = Form.create({})(FilterForm);