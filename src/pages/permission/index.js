import React from 'react'
import {Card, Button, Table, Form, Input, Select, Modal, Tree} from 'antd'
import Utils from './../../utils/utils'
import axios from './../../axios'
import menuConfig from '../../config/menuConfig' 

const FormItem = Form.Item;
const Option = Select.Option;
const TreeNode = Tree.TreeNode;
export default class PermissionUser extends React.Component{

    state = {
        isRoleVisible:false
    }

    componentDidMount(){
        this.requestList();
    }

    onRowClick = (record, index) => {
        let selectedRowKeys = [index];
        this.setState({
            selectedRowKeys,
            selectedItem: record
        })
    }

    requestList=()=>{
        axios.ajax({
            url:'/role/list',
            data:this.params
        }).then((res)=>{
            if(res.code == 0){
                this.setState({
                    list:res.result.item_list.map((item,index)=>{
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
    //增加角色
    handleRole = ()=>{
        this.setState({
            isRoleVisible:true
        })
    }
    //角色提交
    handleRoleSubmit = ()=>{
        let data = this.roleForm.props.form.getFieldsValue();
        axios.ajax({
            url:'/role/create',
            data:{
                params:data
            }
        }).then((res)=>{
            if(res.code==0){
                this.setState({
                    isRoleVisible:false
                })
                this.requestList();
                this.roleForm.props.form.resetFields();
            }
        })
    }
    // 权限设置
    handlePermission = ()=>{
        let item = this.state.selectedItem;
        if(!item){
            Modal.info({
                title: '信息',
                content: '请选择一个角色'
            })
            return
        }
        this.setState({
            isPermVisible:true,
            detailInfo:item
        })
    }
    render(){
        const columns = [
            {
                title: '角色ID',
                dataIndex: 'id'
            }, {
                title: '角色名称',
                dataIndex: 'role_name'
            },{
                title: '创建时间',
                dataIndex: 'create_time',
                render: Utils.formateDate
            }, {
                title: '使用状态',
                dataIndex: 'status',
                render(status){
                    if (status == 1) {
                        return "启用"
                    } else {
                        return "停用"
                    }
                }
            }, {
                title: '授权时间',
                dataIndex: 'authorize_time',
                render: Utils.formateDate
            }, {
                title: '授权人',
                dataIndex: 'authorize_user_name',
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
                    <Button type="primary" onClick={this.handleRole} style={{marginRight:10}}>创建角色</Button>
                    <Button type="primary" style={{marginRight:10}} onClick={this.handlePermission}>设置权限</Button>
                    <Button type="primary">用户授权</Button>
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
                <Modal
                    title="创建角色"
                    visible={this.state.isRoleVisible}
                    onOk={this.handleRoleSubmit}
                    onCancel={()=>{
                        this.roleForm.props.form.resetFields();
                        this.setState({
                            isRoleVisible:false
                        })
                    }}
                >
                    <RoleForm wrappedComponentRef={(inst) => this.roleForm = inst }/>
                </Modal>
                <Modal
                    title="设置权限"
                    visible={this.state.isPermVisible}
                    width={600}
                    onOk={this.handlePermEditSubmit}
                    onCancel={()=>{
                        this.setState({
                            isPermVisible:false
                        })
                    }}
                >
                    <PermEditForm detailInfo={this.state.detailInfo} />
                </Modal>
            </div>
        );
    }
}

// 角色创建
class RoleForm extends React.Component{

    render(){
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {span: 5},
            wrapperCol: {span: 16}
        };
        return (
            <Form layout="horizontal">
                <FormItem label="角色名称" {...formItemLayout}>
                    {
                        getFieldDecorator('role_name',{
                            initialValue:''
                        })(
                            <Input type="text" placeholder="请输入角色名称"/>
                        )
                    }
                </FormItem>
                <FormItem label="状态" {...formItemLayout}>
                    {
                        getFieldDecorator('state',{
                            initialValue:1
                        })(
                        <Select>
                            <Option value={1}>开启</Option>
                            <Option value={0}>关闭</Option>
                        </Select>
                    )}
                </FormItem>
            </Form>
        );
    }
}
RoleForm = Form.create({})(RoleForm);

class PermEditForm extends React.Component{


    renderTreeNodes = (data)=>{
        return data.map((item)=>{
            if(item.children){
                return <TreeNode title={item.title} key={item.key}>{ this.renderTreeNodes(item.children) }</TreeNode>
            }else{
                return <TreeNode title={item.title} key={item.key} />
            }
        })
    }


    render(){

        const {getFieldDecorator} = this.props.form;

        const formItemLayout = {
            labelCol: {span: 5},
            wrapperCol: {span: 18}
        };

        const detailInfo = this.props.detailInfo;

        return (
            <Form layout="horizontal">
                <FormItem label="角色名称" {...formItemLayout}>
                    <Input disabled placeholder={detailInfo.role_name}/>
                </FormItem>
                <FormItem label="状态" {...formItemLayout}>
                    {
                        getFieldDecorator('status',{
                            initialValue:'1'
                        })(
                            <Select style={{ width: 80}} placeholder="启用">
                                <Option value="1">启用</Option>
                                <Option value="0">停用</Option>
                            </Select>
                        )
                    }
                </FormItem>
                <Tree
                    checkable
                    defaultExpandAll
                    
                >
                    <TreeNode title="平台权限" key="platform_all">
                        {this.renderTreeNodes(menuConfig)}
                    </TreeNode>
                </Tree>
            </Form>
        );
    }
}
PermEditForm = Form.create({})(PermEditForm);