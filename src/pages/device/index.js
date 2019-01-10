import React from 'react'
import {Card, Form, Input, Button, Table, Select, Modal} from 'antd'
import axios from './../../axios'

const FormItem = Form.Item;
const Option = Select.Option;

export default class Device extends React.Component{

    state= {
        list:[],
        isVisible:false
    }
    params = {
        page:1
    }

    componentDidMount(){
        this.getDeviceList();
    }

    getDeviceList=()=>{
        axios.ajax({
            url:'/getDevice',
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
    addDevice=()=>{
        this.setState({
            isVisible:true
        })
    }
    //提交新增用户表单
    handleAddDevice=()=>{
        let data = this.deviceForm.props.form.getFieldsValue();
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
              title: '设备编号',
              dataIndex: 'deviceCode',
              key: 'deviceCode',
            },
            {
              title: '设备名称',
              dataIndex: 'deviceName',
              key: 'deviceName',
            },
            {
              title: '设备IP',
              dataIndex: 'deviceIp',
              key: 'deviceIp',
            },
            {
                title: '设备用途',
                dataIndex: 'deviceUse',
                key: 'deviceUse',
            },
            {
                title: '设备安装时间',
                dataIndex: 'deviceDate',
                key: 'deviceDate',
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
                        onClick={this.addDevice}
                        icon="plus"
                    >
                        新增设备
                    </Button>
                    <Table
                        bordered 
                        columns={columns}
                        dataSource={this.state.list}
                        pagination={true}
                    />
                </div>
                <Modal 
                    title="增加设备"
                    okText="确认"
                    cancelText="取消"
                    visible={this.state.isVisible}
                    onOk={this.handleAddDevice}
                    onCancel={()=>{
                        this.deviceForm.props.form.resetFields();
                        this.setState({
                            isVisible:false,
                        })
                    }}
                >
                    <DeviceForm wrappedComponentRef={(inst) => this.deviceForm = inst }/>
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
                <FormItem label="选择设备名称">
                    {
                        getFieldDecorator('deviceName',{
                            initialValue: ''
                        })
                        (
                            <Input />
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

// 增加表单
class DeviceForm extends React.Component{

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
                <FormItem label="设备名称" {...formItemLayout}>
                    {getFieldDecorator('deviceName', {
                        rules: [{ required: true ,message:'名称不能为空'}],
                    })(
                        <Input />
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
DeviceForm = Form.create({})(DeviceForm)

// 详情表单

// 修改表单
