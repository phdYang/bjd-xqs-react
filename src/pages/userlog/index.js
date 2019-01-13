import React from 'react'
import {Card, Form, Input, Button, Table, Select, Modal, message} from 'antd'
import axios from './../../axios'

const FormItem = Form.Item;
const Option = Select.Option;

export default class UserLog extends React.Component{

    state= {
        list:[],
        isVisible:false,
        logInfo:{}
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
        console.log(params);
        axios.ajax({
            url:'/getLogByOther',
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
    //查看详情
    handleDetail=(id)=>{
        //console.log(text)
        //console.log(record)
        axios.ajax({
            url:'/getLogDetail',
            method:'get',
            data:{
                params:{seqId:id}
            }
        }).then((res)=>{
            if(res.code == 0){
                this.setState({
                    isVisible:true,
                    logInfo:res.result.data
                })
            }else{
                message.error('查询用户失败');
                this.setState({
                    isVisible:false
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
                render:(record)=>{
                    return (
                        <div>
                            <a onClick={()=>this.handleDetail(record.seqId)}>查看详情</a>
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
                <Modal 
                    title="用户日志详情页"
                    visible={this.state.isVisible}
                    onCancel={()=>{
                        this.setState({
                            isVisible:false,
                        })
                    }}
                    footer={null}
                >
                    <LogDetail logInfo={this.state.logInfo}/>
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
                    <Button type="primary" style={{ margin: '0 20px' }} onClick={this.handleFilterSubmit}>查询</Button>
                    <Button onClick={this.reset}>重置</Button>
                </FormItem>
            </Form>
        );
    }
}
FilterForm = Form.create({})(FilterForm);

//用户日志详情页
class LogDetail extends React.Component{

    render(){
        const formItemLayout = {
            labelCol: {span: 5},
            wrapperCol: {span: 16}
        };
        const logInfo = this.props.logInfo || {};
        return (
            <Form layout="horizontal">
                <FormItem label="ID" {...formItemLayout}>
                    {logInfo.seqId}
                </FormItem>
                <FormItem label="用户编码" {...formItemLayout}>
                    {logInfo.userCode}
                </FormItem>
                <FormItem label="用户名称" {...formItemLayout}>
                    {logInfo.userName}
                </FormItem>
                <FormItem label="角色名称" {...formItemLayout}>
                    {logInfo.realName}
                </FormItem>
                <FormItem label="IP地址" {...formItemLayout}>
                    {logInfo.ipAdrress}
                </FormItem>
                <FormItem label="用户操作" {...formItemLayout}>
                    {logInfo.userAct}
                </FormItem>
                <FormItem label="操作时间" {...formItemLayout}>
                    {logInfo.actDate}
                </FormItem>
                <FormItem label="备注" {...formItemLayout}>
                    {logInfo.sDesc}
                </FormItem>
            </Form>
        );
    }
}
LogDetail = Form.create({})(LogDetail)