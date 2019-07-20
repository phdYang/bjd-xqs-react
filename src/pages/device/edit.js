import React from 'react'
import {Card, Form, Input, Button, Table, Select, Modal, message, DatePicker, InputNumber} from 'antd'
import axios from './../../axios'
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');

const FormItem = Form.Item;
const Option = Select.Option;

//编辑表单
class DeviceEdit extends React.Component{

    state ={
        deviceEdit:{}
    }

    componentDidMount(){
        let id = this.props.match.params.id
        this.handleEdit(id)
    }

    //提交编辑设备
    handleFilterSubmit=()=>{
        this.props.form.validateFieldsAndScroll((err, values)=>{
            if(err){
                return
            }else{
                let data = this.props.form.getFieldsValue();
                data['deviceDate'] = data['deviceDate'].format('YYYY-MM-DD HH:mm:ss')

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
                        this.props.form.resetFields();
                    }else{
                        message.error('修改失败');
                        this.setState({
                            isEditVisible:false
                        })
                    }
                })
                //重新查询所有设备ƒ列表
                this.props.history.push('/AccountManager/ShowDevice')
            }
        });  
    }

    reset=()=>{
        this.props.form.resetFields();
    }

    handleEdit=(id)=>{
        axios.ajax({
            url:'/getDeviceEdit',
            method:'get',
            data:{
                params:{deviceId:id}
            }
        }).then((res)=>{
            if(res.code == 0){
                this.setState({
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

    render(){

        const { getFieldDecorator } = this.props.form;

        const formItemLayout = {
            labelCol:{
                xs:10,
                sm:8
            },
            wrapperCol:{
                xs:24,
                sm:8
            }
            //labelCol: {span: 5},
            //wrapperCol: {span: 16}
        };
        const offsetLayout = {
            wrapperCol:{
                xs:{
                    span:8,
                    offset:8
                },
                sm:{
                    span:16,
                    offset:4
                }
            }
        }

        const deviceEdit = this.state.deviceEdit || {};

        return (
            <Card title="设备编辑页" extra={<a href="#/AccountManager/ShowDevice">返回</a>}>
            <Form layout="horizontal">
                <FormItem label="ID" {...formItemLayout}>
                    {getFieldDecorator('deviceId', {
                        initialValue:deviceEdit.deviceId
                    })(
                        <Input disabled/>
                    )}
                </FormItem>
                <FormItem label="设备编号" {...formItemLayout}>
                {getFieldDecorator('deviceCode', {
                        initialValue:deviceEdit.deviceCode
                    })(
                        <Input disabled/>
                    )}
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
                <FormItem label="仪器频率" {...formItemLayout}>
                        {getFieldDecorator('deviceFre', {
                            initialValue:deviceEdit.deviceFre,
                            rules: [{ required: true ,message:'频率不能为空'}],
                        })(
                            <InputNumber />
                        )}
                </FormItem>
                <FormItem label="通道数" {...formItemLayout}>
                        {getFieldDecorator('channelCount', {
                            initialValue:deviceEdit.channelCount,
                            rules: [{ required: true ,message:'通道数不能为空'}],
                        })(
                            <InputNumber />
                        )}
                </FormItem>
                <FormItem label="设备安装时间" {...formItemLayout}>
                        {getFieldDecorator('deviceDate',{
                            initialValue:moment(deviceEdit.deviceDate),
                            rules: [{ required: true ,message:'时间不能为空'}],
                        })(<DatePicker placeholder='请选择时间'/>)}
                </FormItem>
                <FormItem label="备注" {...formItemLayout}>
                    {getFieldDecorator('sdesc', {
                        initialValue:deviceEdit.sdesc,
                    })(
                        <Input placeholder='备注随意'/>
                    )}
                </FormItem>
                <FormItem {...offsetLayout}>
                    <Button type="primary" onClick={this.handleFilterSubmit} style={{marginLeft:200}}>确定</Button>
                    <Button type="primary" onClick={this.reset} style={{marginLeft:10}}>重置</Button>
                </FormItem>
            </Form>
            </Card>
        );
    }
}
export default DeviceEdit = Form.create({})(DeviceEdit);