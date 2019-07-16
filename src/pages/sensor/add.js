import React from 'react'
import {Card, Form, Input, Button, Table, Select, Modal,InputNumber, message} from 'antd'
import axios from './../../axios'

const FormItem = Form.Item;
const Option = Select.Option;
const TextArea = Input.TextArea;
// 增加表单
class SensorForm extends React.Component{
    state ={
        list:[],
        //isVisible:false,
        typeList:[],
        targetList:[],
        sectionList:[],
        //sensorClassList:[],
        //sensorInfo:{},
        //isDetailsVisible:false,
        //isEditVisible:false,
        //sensorEdit:{}
       
    }

    componentDidMount(){
        //let id = this.props.location.id;
        //this.handleEdit(id)
        this.getTypeList();
        this.getTargetList();
        this.getSectionList();
        //this.getSensorClass();
    }
  

    //获取传感器类型列表
    getSensorClass=()=>{
        axios.ajax({
            url:'/getSensorClass',
            method:'post',
            data:{}
        }).then((res)=>{
            if(res.code == 0){
                res.result.data.map((item, index) => {
                    item.key = index;
                })
                this.setState({
                    sensorClassList: res.result.data
                })
            }
        })
    }
    //获取检测指标类型列表
    getTypeList=()=>{
        axios.ajax({
            url:'/getTypeList',
            method:'post',
            data:{}
        }).then((res)=>{
            if(res.code == 0){
                res.result.data.map((item, index) => {
                    item.key = index;
                })
                this.setState({
                    typeList: res.result.data
                })
            }
        })
    }
    
    //获取监测对象列表
    getTargetList=()=>{
        axios.ajax({
            url:'/getTargetList',
            method:'post',
            data:{}
        }).then((res)=>{
            if(res.code == 0){
                res.result.data.map((item, index) => {
                    item.key = index;
                })
                this.setState({
                    targetList: res.result.data
                })
            }
        })
    }
    
    //获取传感器类型列表
    getSectionList=()=>{
        axios.ajax({
            url:'/getSectionList',
            method:'post',
            data:{}
        }).then((res)=>{
            if(res.code == 0){
                res.result.data.map((item, index) => {
                    item.key = index;
                })
                this.setState({
                    sectionList: res.result.data
                })
            }
        })
    }

    renderOptoin(tagOptions,type){
        if(type == 'sensorClass'){
            return tagOptions.map(tag => <Option key={tag.itemId}>{tag.itemName}</Option>);
        }
        if(type == 'typeName'){
            return tagOptions.map(tag => tag.typeId == '0'?null:<Option key={tag.typeId}>{tag.typeName}</Option>);
        }
        if(type == 'targetName'){
            return tagOptions.map(tag => tag.targetId == '0'?null:<Option key={tag.targetId}>{tag.targetName}</Option>);
        }
        if(type == 'sectionName'){
            return tagOptions.map(tag => tag.sectionId == '0'?null:<Option key={tag.sectionId}>{tag.sectionName}</Option>);
        }
        
    }

    handleFilterSubmit=()=>{
        //let fieldsValue = this.props.form.getFieldsValue();
        //this.props.filterSubmit(fieldsValue);
        this.props.form.validateFieldsAndScroll((err, values)=>{
            if(err){
                return
            }else{
                let data = this.props.form.getFieldsValue();
                console.log(data);
                axios.ajax({
                    url:'/addSensor',
                    method:'get',
                    data:{
                        params:data
                    }
                }).then((res)=>{
                    if(res.code == 0){
                        message.success('增加传感器成功');
                        this.setState({
                            isVisible:false
                        })
                        this.props.form.resetFields();
                    }else{
                        message.error('增加传感器失败');
                        this.setState({
                            isVisible:false
                        })
                    }
                })
                //重新查询
                this.props.history.push('/AccountManager/ShowSensor')
                
            }
        }); 
    }

    reset=()=>{
        this.props.form.resetFields();
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

        const typeList = this.state.typeList || [];
        const targetList = this.state.targetList || [];
        const sectionList = this.state.sectionList || [];
        const sensorClassList = this.state.sensorClassList || [];

        return (
            <Card title="传感器增加页" extra={<a href="#/AccountManager/ShowSensor">返回</a>}>
            <Form layout="horizontal">
                <FormItem label="传感器编号" {...formItemLayout}>
                    {getFieldDecorator('sensorCode', {
                        rules: [{ required: true ,message:'编码不能为空'}],
                    })(
                        <Input />
                    )}
                </FormItem>
                <FormItem label="传感器名称" {...formItemLayout}>
                    {getFieldDecorator('sensorName', {
                        rules: [{ required: true ,message:'名称不能为空'}],
                    })(
                        <Input />
                    )}
                </FormItem>
                <FormItem label="通道编码" {...formItemLayout}>
                    {getFieldDecorator('channelCode', {
                        rules: [{ required: true ,message:'通道编码不能为空'}],
                    })(
                        <Input />
                    )}
                </FormItem>
                {/* <FormItem label="传感器类型" {...formItemLayout}>
                    {
                        getFieldDecorator('sensorClass',{
                            initialValue: '0'
                        })
                        (
                            <Select>
                                { this.renderOptoin(sensorClassList,'sensorClass') }
                            </Select>
                        )
                    }
                </FormItem> */}
                <FormItem label="检测指标类型" {...formItemLayout}>
                    {
                        getFieldDecorator('typeId',{
                            initialValue: '1'
                        })
                        (
                            <Select>
                                { this.renderOptoin(typeList,'typeName') }
                            </Select>
                        )
                    }
                </FormItem>
                <FormItem label="监测对象" {...formItemLayout}>
                    {
                        getFieldDecorator('targetId',{
                            initialValue: '1'
                        })
                        (
                            <Select>
                                { this.renderOptoin(targetList,'targetName') }
                            </Select>
                        )
                    }
                </FormItem>
                <FormItem label="传感器位置" {...formItemLayout}>
                    {
                        getFieldDecorator('sectionId',{
                            initialValue: '1'
                        })
                        (
                            <Select>
                                { this.renderOptoin(sectionList,'sectionName') }
                            </Select>
                        )
                    }
                </FormItem>
                <FormItem label="初始阈值" {...formItemLayout}>
                    {
                        getFieldDecorator('initKValue',{
                            initialValue: 0.000
                        })
                        (
                            <InputNumber step={0.001}/>
                        )
                    }
                </FormItem>
                <FormItem label="初始波长" {...formItemLayout}>
                    {
                        getFieldDecorator('initWave',{
                            initialValue: 0.000
                        })
                        (
                            <InputNumber step={0.001}/>
                        )
                    }
                </FormItem>
                <FormItem label="初始方向" {...formItemLayout}>
                    {
                        getFieldDecorator('initOrientations',{
                            initialValue: 0
                        })
                        (
                            <InputNumber/>
                        )
                    }
                </FormItem>
                <FormItem label="标定波长" {...formItemLayout}>
                    {
                        getFieldDecorator('bdWave',{
                            initialValue: 0.000
                        })
                        (
                            <InputNumber step={0.001}/>
                        )
                    }
                </FormItem>
                <FormItem label="标定温度" {...formItemLayout}>
                    {
                        getFieldDecorator('bdTemperature',{
                            initialValue: 0.000
                        })
                        (
                            <InputNumber step={0.001}/>
                        )
                    }
                </FormItem>
                <FormItem label="具体位置" {...formItemLayout}>
                    {
                        getFieldDecorator('info',{
                            rules: [{ required: true ,message:'具体位置不能为空'}],
                        })
                        (
                            <TextArea autosize={{minRows: 4, maxRows: 6}}/>
                        )
                    }
                </FormItem>
                <FormItem label="备注" {...formItemLayout}>
                    {getFieldDecorator('sDesc', {
                        
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
export default SensorForm = Form.create({})(SensorForm);