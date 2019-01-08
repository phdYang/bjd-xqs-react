import React from 'react'
import {Card, Form, Input, Button, Table} from 'antd'
import axios from './../../axios'

const FormItem = Form.Item;

export default class User extends React.Component{

    state= {
        list:[]
    }
    params = {
        page:1
    }

    componentDidMount(){
        this.getUserList();
    }

    getUserList=()=>{
        axios.ajax({
            url:'/getUserList',
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
                title: '职位名称',
                dataIndex: 'job',
                key: 'job',
                editable: true,
            },
            {
                title: '角色等级',
                dataIndex: 'roleGrade',
                key: 'roleGrade',
                editable: true,
            },
            {
                title: '创建时间',
                dataIndex: 'createDate',
                key: 'createDate'
            },
            {
                title: '邮箱地址',
                dataIndex: 'email',
                key: 'email',
                editable: true,
            },
            {
                title: '电话',
                dataIndex: 'tel',
                key: 'tel',
                editable: true,
            },
            {
                title: '备注',
                dataIndex: 'sDesc',
                key: 'sDesc',
                editable: true,
            },
            {
                title: '操作',
                key: 'operation',
                render(){
                    return (
                        <div>
                            <a>查看详情</a>
                            <span style={{marginLeft:5,marginRight:5}}>|</span>
                            <a>编辑</a>
                            <span style={{marginLeft:5,marginRight:5}}>|</span>
                            <a>删除</a>
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
                    <Button
                        style={{ width: '100%', marginTop: 16, marginBottom: 8 }}
                        type="dashed"
                        onClick={this.addUser}
                        icon="plus"
                    >
                        新增用户
                    </Button>
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
                <FormItem label="权限">
                    {
                        getFieldDecorator('roleGrade',)
                        (
                            <Input placeholder="" />
                        )
                    }
                </FormItem>
                <FormItem>
                    <Button type="primary" style={{ margin: '0 20px' }} onClick={this.handleFilterSubmit}>查询</Button>
                    <Button onClick={this.reset}>重置</Button>
                </FormItem>
            </Form>
        );
    }
}
FilterForm = Form.create({})(FilterForm);