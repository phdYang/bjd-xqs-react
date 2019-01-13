import React from 'react'
import {Card, Form, Input, Button, Table, Select, Modal, message} from 'antd'
import axios from './../../axios'

const FormItem = Form.Item;
const Option = Select.Option;

export default class User extends React.Component{

    state= {
        list:[],
        isVisible:false,
        userInfo:{},
        isDetailsVisible:false,
        isEditVisible:false,
        userEdit:{}
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
        //console.log(params);
        axios.ajax({
            url:'/getUserByOther',
            method:'post',
            data:{
                params:params
            }
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
    //弹出表单
    addUser=()=>{
        this.setState({
            isVisible:true
        })
    }
    //提交新增用户表单
    handleAddUser=()=>{
        this.userForm.props.form.validateFieldsAndScroll((err, values)=>{
            if(err){
                return
            }else{
                let data = this.userForm.props.form.getFieldsValue();
                console.log(data);
                axios.ajax({
                    url:'/addUser',
                    method:'get',
                    data:{
                        params:data
                    }
                }).then((res)=>{
                    if(res.code == 0){
                        message.success('增加用户成功');
                        this.setState({
                            isVisible:false
                        })
                    }else{
                        message.error('增加用户失败');
                        this.setState({
                            isVisible:false
                        })
                    }
                })
                //重新查询所有用户列表
                this.getUserList()
            }
        });        
    }
    //查看详情
    handleDetail=(id)=>{
        //console.log(text)
        //console.log(record)
        let seqId = {"seqId":id}
        axios.ajax({
            url:'/getUserDetail',
            method:'get',
            data:{
                params:seqId
            }
        }).then((res)=>{
            if(res.code == 0){
                this.setState({
                    isDetailsVisible:true,
                    userInfo:res.result.data
                })
            }else{
                message.error('查询用户失败');
                this.setState({
                    isDetailsVisible:false
                })
            }
        })
    }
    //编辑
    handleEdit=(id)=>{
        let seqId = {"seqId":id}
        axios.ajax({
            url:'/getUserEdit',
            method:'get',
            data:{
                params:seqId
            }
        }).then((res)=>{
            if(res.code == 0){
                this.setState({
                    isEditVisible:true,
                    userEdit:res.result.data
                })
            }else{
                message.error('查询用户失败');
                this.setState({
                    isDetailsVisible:false
                })
            }
        })
    }
    //提交编辑用户
    handleEditUser=()=>{
        this.userEdit.props.form.validateFieldsAndScroll((err, values)=>{
            if(err){
                return
            }else{
                let data = this.userEdit.props.form.getFieldsValue();
                
                axios.ajax({
                    url:'/editUser',
                    method:'get',
                    data:{
                        params:data
                    }
                }).then((res)=>{
                    if(res.code == 0){
                        message.success('修改用户成功');
                        this.setState({
                            isEditVisible:false
                        })
                    }else{
                        message.error('修改用户失败');
                        this.setState({
                            isEditVisible:false
                        })
                    }
                })
                //重新查询所有用户列表
                this.getUserList()
            }
        });  
    }

    //删除
    handleDel=(id)=>{
        Modal.confirm({
            title:'确认删除',
            content:'确定要删除此用户吗？',
            okText:'确认',
            cancelText:'取消',
            onOk:()=>{
                axios.ajax({
                    url:'/delUser',
                    method:'get',
                    data:{
                        params:{
                            seqId:id
                        }
                    }
                }).then((res)=>{
                    if(res.code == 0){
                        message.success('删除成功！');
                        this.getUserList();
                    }else{
                        message.error('删除失败！');
                    }
                })
            }
        })
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
                render:(record)=>{
                    return (
                        <div>
                            <a onClick={()=>this.handleDetail(record.seqId)}>查看详情</a>
                            <span style={{marginLeft:5,marginRight:5}}>|</span>
                            <a onClick={()=>this.handleEdit(record.seqId)}>编辑</a>
                            <span style={{marginLeft:5,marginRight:5}}>|</span>
                            <a onClick={()=>this.handleDel(record.seqId)}>删除</a>
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
                    okText="确认"
                    cancelText="取消"
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
                <Modal 
                    title="用户详情页"
                    visible={this.state.isDetailsVisible}
                    onCancel={()=>{
                        this.setState({
                            isDetailsVisible:false,
                        })
                    }}
                    footer={null}
                >
                    <UserDetail userInfo={this.state.userInfo}/>
                </Modal>
                <Modal 
                    title="用户编辑页"
                    visible={this.state.isEditVisible}
                    okText="确认"
                    cancelText="取消"
                    onOk={this.handleEditUser}
                    onCancel={()=>{
                        this.setState({
                            isEditVisible:false,
                        })
                    }}
                >
                    <UserEdit userEdit={this.state.userEdit} wrappedComponentRef={(inst) => this.userEdit = inst }/>
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
                    <Button type="primary" style={{ margin: '0 20px' }} onClick={this.handleFilterSubmit}>查询</Button>
                    <Button onClick={this.reset}>重置</Button>
                </FormItem>
            </Form>
        );
    }
}
FilterForm = Form.create({})(FilterForm);

class UserForm extends React.Component{


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

//用户详情页
class UserDetail extends React.Component{

    render(){
        const formItemLayout = {
            labelCol: {span: 5},
            wrapperCol: {span: 16}
        };
        const userInfo = this.props.userInfo || {};
        return (
            <Form layout="horizontal">
                <FormItem label="ID" {...formItemLayout}>
                    {userInfo.seqId}
                </FormItem>
                <FormItem label="用户编码" {...formItemLayout}>
                    {userInfo.userCode}
                </FormItem>
                <FormItem label="用户名称" {...formItemLayout}>
                    {userInfo.userName}
                </FormItem>
                <FormItem label="角色名称" {...formItemLayout}>
                    {userInfo.realName}
                </FormItem>
                <FormItem label="职位名称" {...formItemLayout}>
                    {userInfo.job}
                </FormItem>
                <FormItem label="角色等级" {...formItemLayout}>
                    {userInfo.roleGrade}
                </FormItem>
                <FormItem label="创建时间" {...formItemLayout}>
                    {userInfo.createDate}
                </FormItem>
                <FormItem label="邮箱地址" {...formItemLayout}>
                    {userInfo.email}
                </FormItem>
                <FormItem label="电话" {...formItemLayout}>
                    {userInfo.tel}
                </FormItem>
                <FormItem label="备注" {...formItemLayout}>
                    {userInfo.sDesc}
                </FormItem>
            </Form>
        );
    }
}
UserDetail = Form.create({})(UserDetail)

//用户编辑页
class UserEdit extends React.Component{

    render(){
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {span: 5},
            wrapperCol: {span: 16}
        };
        const userEdit = this.props.userEdit || {};

        return (
            <Form layout="horizontal">
                <FormItem label="ID" {...formItemLayout}>
                    {userEdit.seqId}
                </FormItem>
                <FormItem label="用户编码" {...formItemLayout}>
                    {userEdit.userCode}
                </FormItem>
                <FormItem label="用户名称" {...formItemLayout}>
                    {userEdit.userName}
                </FormItem>
                <FormItem label="角色名称" {...formItemLayout}>
                    {getFieldDecorator('realName', {
                        initialValue:userEdit.realName,
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
                        initialValue:userEdit.job,
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
                        initialValue:userEdit.roleGrade,
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
                        initialValue:userEdit.email,
                        rules: [{ required: true,type:'email',message:'请输入正确的邮箱' }],
                    })(
                        <Input />
                    )}
                </FormItem>
                <FormItem label="电话" {...formItemLayout}>
                    {getFieldDecorator('tel', {
                        initialValue:userEdit.tel,
                        rules: [{ required: true,pattern: new RegExp(/^[1-9]\d*$/, "g"),message:'请输入正确的电话号码' }],
                    })(
                        <Input/>
                    )}
                </FormItem>
                <FormItem label="备注" {...formItemLayout}>
                    {getFieldDecorator('sDesc', {
                        initialValue:userEdit.sDesc,
                    })(
                        <Input placeholder='备注随意'/>
                    )}
                </FormItem>
            </Form>
        );
    }
}
UserEdit = Form.create({})(UserEdit)