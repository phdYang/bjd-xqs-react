import React from 'react'
import {Card, Form, Input, Button, Table, Select, Modal,InputNumber, message} from 'antd'
import axios from './../../axios'

const FormItem = Form.Item;

// 详情表单
class SensorDetail extends React.Component{
    state ={
        sensorInfo:{}
    }

    componentDidMount(){
        let id = this.props.location.id;
        this.handleDetail(id)
        
    }

    handleDetail=(id)=>{

        axios.ajax({
            url:'/getSensorDetail',
            method:'get',
            data:{
                params:{seqId:id}
            }
        }).then((res)=>{
            if(res.code == 0){
                this.setState({
                    //isDetailsVisible:true,
                    sensorInfo:res.result.data
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
        
        const sensorInfo = this.state.sensorInfo || {}


        return (
            
            
            <Card title="传感器详情页" extra={<a href="http://localhost:3000/#/AccountManager/ShowSensor">返回</a>}>
            <Form layout="horizontal">
                
                <FormItem label="ID" {...formItemLayout}>
                    {sensorInfo.seqId}
                </FormItem>
                <FormItem label="传感器编码" {...formItemLayout}>
                    {sensorInfo.sensorCode}
                </FormItem>
                <FormItem label="传感器名称" {...formItemLayout}>
                    {sensorInfo.sensorName}
                </FormItem>
                <FormItem label="通道编码" {...formItemLayout}>
                    {sensorInfo.channelCode}
                </FormItem>
                <FormItem label="传感器类型" {...formItemLayout}>
                    {sensorInfo.sensorClass}
                </FormItem>
                <FormItem label="检测指标类型" {...formItemLayout}>
                    {sensorInfo.typeName}
                </FormItem>
                <FormItem label="监测对象" {...formItemLayout}>
                    {sensorInfo.targetName}
                </FormItem>
                <FormItem label="传感器位置" {...formItemLayout}>
                    {sensorInfo.sectionName}
                </FormItem>
                <FormItem label="初始阈值" {...formItemLayout}>
                    {sensorInfo.initKValue}
                </FormItem>
                <FormItem label="初始波长" {...formItemLayout}>
                    {sensorInfo.initWave}
                </FormItem>
                <FormItem label="初始方向" {...formItemLayout}>
                    {sensorInfo.initOrientations}
                </FormItem>
                <FormItem label="标定波长" {...formItemLayout}>
                    {sensorInfo.bdWave}
                </FormItem>
                <FormItem label="标定温度" {...formItemLayout}>
                    {sensorInfo.bdTemperature}
                </FormItem>
                <FormItem label="具体位置" {...formItemLayout}>
                    {sensorInfo.info}
                </FormItem>
                <FormItem label="备注" {...formItemLayout}>
                    {sensorInfo.sDesc}
                </FormItem>
            </Form>
            </Card>
        );
    }
}
export default SensorDetail = Form.create({})(SensorDetail);