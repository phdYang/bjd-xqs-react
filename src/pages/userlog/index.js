import React from 'react'
import {Card, Form, Input, Button, Table, Select, Modal} from 'antd'
import axios from './../../axios'

const FormItem = Form.Item;
const Option = Select.Option;

export default class UserLog extends React.Component{

    state= {
        list:[],
        isVisible:false
    }
    params = {
        page:1
    }

    componentDidMount(){
        this.getUserList();
    }

    getUserList=()=>{
        axios.ajax({
            url:'/getUserLog',
            method:'post',
            data:{}
        }).then((res)=>{
            if(res.code == 0){
                res.result.data.map((item, index) => {
                    item.key = index;
                })
                this.setState({
                    list: res.result.data
                })
            }
        })
    }

    // 提交查询表单
    handleSubmit=(params)=>{
        console.log(params)
    }

    render(){
        const columns = [
            {
              title:'ID',
              dataIndex:'seqId',
              key:'seqId',
            }, 
            {
              title: '用户编号',
              dataIndex: 'userCode',
              key: 'userCode',
            },
            {
              title: '用户名称',
              dataIndex: 'userName',
              key: 'userName',
            },
            {
              title: '角色名称',
              dataIndex: 'realName',
              key: 'realName',
            },
            {
                title: 'IP地址',
                dataIndex: 'ipAdrress',
                key: 'ipAdrress'
            },
            {
                title: '用户操作',
                dataIndex: 'userAct',
                key: 'userAct',
            },
            {
                title: '操作时间',
                dataIndex: 'actDate',
                key: 'actDate'
            },
            {
                title: '备注',
                dataIndex: 'sDesc',
                key: 'sDesc',
            },
            {
                title: '操作',
                key: 'operation',
                render(){
                    return (
                        <div>
                            <a>查看详情</a>
                        </div>
                    );
                }
            }
        ]


        return (
            <div>
                <Card style={{marginBottom:10}}>
                    <FilterForm filterSubmit={this.handleSubmit}/>
                </Card>
                <div className="content-wrap">
                    <Table
                        bordered 
                        columns={columns}
                        dataSource={this.state.list}
                        pagination={true}
                    />
                </div>
            </div>
        );
    }
}

class FilterForm extends React.Component{

    handleFilterSubmit=()=>{
        let fieldsValue = this.props.form.getFieldsValue();
        this.props.filterSubmit(fieldsValue);
    }

    reset=()=>{
        this.props.form.resetFields();
    }

    render(){

        const { getFieldDecorator } = this.props.form;

        return (
            <Form layout="inline">
                <FormItem label="用户名">
                    {
                        getFieldDecorator('userName',)
                        (
                            <Input placeholder="" />
                        )
                    }
                </FormItem>
                <FormItem label="ip地址">
                    {
                        getFieldDecorator('ipAdrress',)
                        (
                            <Input placeholder="" />
                        )
                    }
                </FormItem>
                <FormItem label="用户操作">
                    {
                        getFieldDecorator('userAct',)
                        (
                            <Input placeholder="" />
                        )
                    }
                </FormItem>
                <FormItem>
                    <Button type="primary" style={{ margin: '0 20px' }} onClick={this.handleFilterSubmit}>确定</Button>
                    <Button onClick={this.reset}>重置</Button>
                </FormItem>
            </Form>
        );
    }
}
FilterForm = Form.create({})(FilterForm);
