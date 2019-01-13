import React from 'react'
import {Card, Form, Input, Button, Table, Select, Modal, message} from 'antd'
import axios from './../../axios'

const FormItem = Form.Item;
const Option = Select.Option;

export default class Device extends React.Component{

    state= {
        list:[],
        isVisible:false,
        isDetailsVisible:false,
        deviceInfo:{},
        isEditVisible:false,
        deviceEdit:{}
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
        //console.log(params)
        axios.ajax({
            url:'/getDeviceByOther',
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
    addDevice=()=>{
        this.setState({
            isVisible:true
        })
    }
    //提交新增表单
    handleAddDevice=()=>{
        this.deviceForm.props.form.validateFieldsAndScroll((err, values)=>{
            if(err){
                return
            }else{
                let data = this.deviceForm.props.form.getFieldsValue();
                console.log(data);
                axios.ajax({
                    url:'/addDevice',
                    method:'get',
                    data:{
                        params:data
                    }
                }).then((res)=>{
                    if(res.code == 0){
                        message.success('增加成功');
                        this.setState({
                            isVisible:false
                        })
                        this.deviceForm.props.form.resetFields();
                    }else{
                        message.error('增加失败');
                        this.setState({
                            isVisible:false
                        })
                    }
                })
                //重新查询所有用户列表
                this.getDeviceList()
            }
        });      
    }
    //
    //查看详情
    handleDetail=(id)=>{
        //console.log(text)
        //console.log(record)
        axios.ajax({
            url:'/getDeviceDetail',
            method:'get',
            data:{
                params:{seqId:id}
            }
        }).then((res)=>{
            if(res.code == 0){
                this.setState({
                    isDetailsVisible:true,
                    deviceInfo:res.result.data
                })
            }else{
                message.error('查询失败');
                this.setState({
                    isDetailsVisible:false
                })
            }
        })
    }
    //编辑
    handleEdit=(id)=>{
        axios.ajax({
            url:'/getDeviceEdit',
            method:'get',
            data:{
                params:{seqId:id}
            }
        }).then((res)=>{
            if(res.code == 0){
                this.setState({
                    isEditVisible:true,
                    deviceEdit:res.result.data
                })
            }else{
                message.error('查询失败');
                this.setState({
                    isEditVisible:false
                })
            }
        })
    }
    //提交编辑用户
    handleEditDevice=()=>{
        this.deviceEditForm.props.form.validateFieldsAndScroll((err, values)=>{
            if(err){
                return
            }else{
                let data = this.deviceEditForm.props.form.getFieldsValue();
                
                axios.ajax({
                    url:'/editDevice',
                    method:'get',
                    data:{
                        params:data
                    }
                }).then((res)=>{
                    if(res.code == 0){
                        message.success('修改成功');
                        this.setState({
                            isEditVisible:false
                        })
                        this.deviceEditForm.props.form.resetFields();
                    }else{
                        message.error('修改失败');
                        this.setState({
                            isEditVisible:false
                        })
                    }
                })
                //重新查询所有用户列表
                this.getDeviceList()
            }
        });  
    }

    //删除
    handleDel=(id)=>{
        Modal.confirm({
            title:'确认删除',
            content:'确定要删除此设备吗？',
            okText:'确认',
            cancelText:'取消',
            onOk:()=>{
                axios.ajax({
                    url:'/delDevice',
                    method:'get',
                    data:{
                        params:{
                            seqId:id
                        }
                    }
                }).then((res)=>{
                    if(res.code == 0){
                        message.success('删除成功！');
                        this.getDeviceList();
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
                <Modal 
                    title="设备详情页"
                    visible={this.state.isDetailsVisible}
                    onCancel={()=>{
                        this.setState({
                            isDetailsVisible:false,
                        })
                    }}
                    footer={null}
                >
                    <DeviceDetail deviceInfo={this.state.deviceInfo}/>
                </Modal>
                <Modal 
                    title="编辑设备页"
                    okText="确认"
                    cancelText="取消"
                    visible={this.state.isEditVisible}
                    onOk={this.handleEditDevice}
                    onCancel={()=>{
                        this.deviceEditForm.props.form.resetFields();
                        this.setState({
                            isEditVisible:false,
                        })
                    }}
                >
                    <DeviceEdit wrappedComponentRef={(inst) => this.deviceEditForm = inst } deviceEdit={this.state.deviceEdit}/>
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
                    <Button type="primary" style={{ margin: '0 20px' }} onClick={this.handleFilterSubmit}>查询</Button>
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
                <FormItem label="设备IP" {...formItemLayout}>
                    {getFieldDecorator('deviceIp', {
                        rules: [{ required: true ,message:'设备IP不能为空'}],
                    })(
                        <Input />
                    )}
                </FormItem>
                <FormItem label="设备用途" {...formItemLayout}>
                    {getFieldDecorator('deviceUse', {
                        rules: [{ required: true ,message:'用途不能为空'}],
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
class DeviceDetail extends React.Component{

    render(){
        const formItemLayout = {
            labelCol: {span: 5},
            wrapperCol: {span: 16}
        };
        const deviceInfo = this.props.deviceInfo || {};
        return (
            <Form layout="horizontal">
                <FormItem label="ID" {...formItemLayout}>
                    {deviceInfo.seqId}
                </FormItem>
                <FormItem label="设备编号" {...formItemLayout}>
                    {deviceInfo.deviceCode}
                </FormItem>
                <FormItem label="设备名称" {...formItemLayout}>
                    {deviceInfo.deviceName}
                </FormItem>
                <FormItem label="设备IP" {...formItemLayout}>
                    {deviceInfo.deviceIp}
                </FormItem>
                <FormItem label="设备用途" {...formItemLayout}>
                    {deviceInfo.deviceUse}
                </FormItem>
                <FormItem label="安装时间" {...formItemLayout}>
                    {deviceInfo.deviceDate}
                </FormItem>
                <FormItem label="备注" {...formItemLayout}>
                    {deviceInfo.sDesc}
                </FormItem>
            </Form>
        );
    }
}
DeviceDetail = Form.create({})(DeviceDetail)
//增加表单
class DeviceEdit extends React.Component{

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

        const deviceEdit = this.props.deviceEdit || {};

        return (
            <Form layout="horizontal">
                <FormItem label="ID" {...formItemLayout}>
                    {deviceEdit.seqId}
                </FormItem>
                <FormItem label="设备编号" {...formItemLayout}>
                    {deviceEdit.deviceCode}
                </FormItem>
                <FormItem label="设备名称" {...formItemLayout}>
                    {getFieldDecorator('deviceName', {
                        initialValue:deviceEdit.deviceName,
                        rules: [{ required: true ,message:'名称不能为空'}],
                    })(
                        <Input />
                    )}
                </FormItem>
                <FormItem label="设备IP" {...formItemLayout}>
                    {getFieldDecorator('deviceIp', {
                        initialValue:deviceEdit.deviceIp,
                        rules: [{ required: true ,message:'设备IP不能为空'}],
                    })(
                        <Input />
                    )}
                </FormItem>
                <FormItem label="设备用途" {...formItemLayout}>
                    {getFieldDecorator('deviceUse', {
                        initialValue:deviceEdit.deviceUse,
                        rules: [{ required: true ,message:'用途不能为空'}],
                    })(
                        <Input />
                    )}
                </FormItem>
                <FormItem label="备注" {...formItemLayout}>
                    {getFieldDecorator('sDesc', {
                        initialValue:deviceEdit.sDesc,
                    })(
                        <Input placeholder='备注随意'/>
                    )}
                </FormItem>
            </Form>
        );
    }
}
DeviceEdit = Form.create({})(DeviceEdit)
