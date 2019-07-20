import React from 'react'
import {Card, Form, Input, Button, Table, Select, Modal, message} from 'antd'
import axios from './../../axios'
const FormItem = Form.Item;



// 详情表单
class DeviceDetail extends React.Component{
    state ={
        deviceInfo:{}
    }

    componentDidMount(){
        let id = this.props.location.id;
        this.handleDetail(id)
    }

    handleDetail=(id)=>{
       
        axios.ajax({
            url:'/getDeviceDetail',
            method:'get',
            data:{
                params:{seqId:id}
            }
        }).then((res)=>{
            if(res.code == 0){
                this.setState({
                    //isDetailsVisible:true,
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
    render(){
        const formItemLayout = {
            labelCol:{
                xs:10,
                sm:8
            },
            wrapperCol:{
                xs:24,
                sm:10
            }
        };
        const deviceInfo = this.state.deviceInfo || {};
        return (
            <Card title="设备详情页" extra={<a href="#/AccountManager/ShowDevice">返回</a>}>
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
            </Card>
        );
    }
}
export default DeviceDetail = Form.create({})(DeviceDetail);