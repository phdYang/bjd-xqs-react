import React from 'react'
import {Card, Form, Input, Button, Table, Select, Modal} from 'antd'
import axios from './../../axios'

const FormItem = Form.Item;
const Option = Select.Option;

export default class User extends React.Component{

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

    // 提交查询表单
    handleSubmit=(params)=>{
        console.log(params)
    }
    //弹出表单
    addUser=()=>{
        this.setState({
            isVisible:true
        })
    }
    //提交新增用户表单
    handleAddUser=()=>{
        let data = this.userForm.props.form.getFieldsValue();
        console.log(data);
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
            },
            {
                title: '角色等级',
                dataIndex: 'roleGrade',
                key: 'roleGrade',
            },
            {
                title: '创建时间',
                dataIndex: 'createDate',
                key: 'createDate'
            },
            {
                title: '邮箱地址',
                dataIndex: 'email',
                key: 'email'
            },
            {
                title: '电话',
                dataIndex: 'tel',
                key: 'tel'
            },
            {
                title: '备注',
                dataIndex: 'sDesc',
                key: 'sDesc'
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
                <Modal 
                    title="增加用户"
                    visible={this.state.isVisible}
                    onOk={this.handleAddUser}
                    onCancel={()=>{
                        this.userForm.props.form.resetFields();
                        this.setState({
                            isVisible:false,
                        })
                    }}
                >
                    <UserForm wrappedComponentRef={(inst) => this.userForm = inst }/>
                </Modal>
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
                    <Button type="primary" style={{ margin: '0 20px' }} onClick={this.handleFilterSubmit}>确定</Button>
                    <Button onClick={this.reset}>重置</Button>
                </FormItem>
            </Form>
        );
    }
}
FilterForm = Form.create({})(FilterForm);

class UserForm extends React.Component{

    handleFilterSubmit=()=>{
        let fieldsValue = this.props.form.getFieldsValue();
        this.props.filterSubmit(fieldsValue);
    }

    reset=()=>{
        this.props.form.resetFields();
    }


    render(){

        const { getFieldDecorator } = this.props.form;

        const formItemLayout = {
            labelCol: {span: 5},
            wrapperCol: {span: 16}
        };

        return (
            <Form layout="horizontal">
                <FormItem label="用户名称" {...formItemLayout}>
                    {getFieldDecorator('userName', {
                        rules: [{ required: true ,message:'用户名不能为空'}],
                    })(
                        <Input />
                    )}
                </FormItem>
                <FormItem label="角色名称" {...formItemLayout}>
                    {getFieldDecorator('realName', {
                        rules: [{ required: true,message:'角色不能为空' }],
                    })(
                        <Select>
                            <Option  value='管理员'>管理员</Option >
                            <Option  value='北交大'>北交大</Option >
                            <Option  value='光信理通'>光信理通</Option >
                            <Option  value='测试用户'>测试用户</Option >
                        </Select >
                    )}
                </FormItem>
                <FormItem label="职位名称" {...formItemLayout}>
                    {getFieldDecorator('job', {
                        rules: [{ required: true,message:'职位不能为空' }],
                    })(
                        <Select>
                            <Option  value='admin'>admin</Option >
                            <Option  value='bjd'>bjd</Option >
                            <Option  value='gs'>gs</Option >
                            <Option  value='test'>test</Option >
                        </Select >
                    )}
                </FormItem>
                <FormItem label="角色等级" {...formItemLayout}>
                    {getFieldDecorator('roleGrade', {
                        rules: [{ required: true ,message:'等级不能为空'}],
                    })(
                        <Select>
                            <Option  value='1'>1</Option >
                            <Option  value='2'>2</Option >
                            <Option  value='3'>3</Option >
                        </Select >
                    )}
                </FormItem>
                <FormItem label="邮箱地址" {...formItemLayout}>
                    {getFieldDecorator('email', {
                        rules: [{ required: true,type:'email',message:'请输入正确的邮箱' }],
                    })(
                        <Input />
                    )}
                </FormItem>
                <FormItem label="电话" {...formItemLayout}>
                    {getFieldDecorator('tel', {
                        rules: [{ required: true,pattern: new RegExp(/^[1-9]\d*$/, "g"),message:'请输入正确的电话号码' }],
                    })(
                        <Input/>
                    )}
                </FormItem>
                <FormItem label="备注" {...formItemLayout}>
                    {getFieldDecorator('sDesc', {
                        
                    })(
                        <Input placeholder='备注随意'/>
                    )}
                </FormItem>
            </Form>
        );
    }
}
UserForm = Form.create({})(UserForm)