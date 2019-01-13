import React from 'react'
import {Card, Form, Input, Button, Table, Select, Modal} from 'antd'
import axios from './../../axios'

const FormItem = Form.Item;
const Option = Select.Option;

export default class Sensor extends React.Component{

    state= {
        list:[],
        isVisible:false
    }
    params = {
        page:1
    }

    componentDidMount(){
        this.getSensorList();
    }

    getSensorList=()=>{
        axios.ajax({
            url:'/getSensor',
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
    addSensor=()=>{
        this.setState({
            isVisible:true
        })
    }
    //提交新增用户表单
    handleAddSensor=()=>{
        let data = this.sensorForm.props.form.getFieldsValue();
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
              title: '传感器编号',
              dataIndex: 'sensorCode',
              key: 'sensorCode',
            },
            {
              title: '传感器名称',
              dataIndex: 'sensorName',
              key: 'sensorName',
            },
            {
              title: '检测指标类型',
              dataIndex: 'typeName',
              key: 'typeName',
            },
            {
                title: '传感器检测对象',
                dataIndex: 'targetName',
                key: 'targetName',
            },
            {
                title: '传感器位置',
                dataIndex: 'sectionName',
                key: 'sectionName',
            },
            {
                title: '传感器类型',
                dataIndex: 'sensorClass',
                key: 'sensorClass'
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
                        onClick={this.addSensor}
                        icon="plus"
                    >
                        新增传感器
                    </Button>
                    <Table
                        bordered 
                        columns={columns}
                        dataSource={this.state.list}
                        pagination={true}
                    />
                </div>
                <Modal 
                    title="增加传感器"
                    okText="确认"
                    cancelText="取消"
                    visible={this.state.isVisible}
                    onOk={this.handleAddSensor}
                    onCancel={()=>{
                        this.sensorForm.props.form.resetFields();
                        this.setState({
                            isVisible:false,
                        })
                    }}
                >
                    <SensorForm wrappedComponentRef={(inst) => this.sensorForm = inst }/>
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
                <FormItem label="选择传感器类型">
                    {
                        getFieldDecorator('sensorClass',{
                            initialValue: '0'
                        })
                        (
                            <Select style={{ width: 100 }}>
                                <Option value="0">全部</Option>
                                <Option value="1">温度</Option>
                                <Option value="2">应力</Option>
                                <Option value="3">位移</Option>
                            </Select>
                        )
                    }
                </FormItem>
                <FormItem label="选择传感器监测对象">
                    {
                        getFieldDecorator('targetName',{
                            initialValue: '0'
                        })
                        (
                            <Select style={{ width: 100 }}>
                                <Option value="0">全部</Option>
                                <Option value="1">钢轨</Option>
                                <Option value="2">轨道板</Option>
                                <Option value="3">底座板</Option>
                                <Option value="4">桥梁</Option>
                                <Option value="5">环境</Option>
                            </Select>
                        )
                    }
                </FormItem>
                <FormItem label="选择传感器位置">
                    {
                        getFieldDecorator('sectionName',{
                            initialValue: '0'
                        })
                        (
                            <Select style={{ width: 100 }}>
                                <Option value="0">全部</Option>
                                <Option value="1">辙叉区</Option>
                                <Option value="2">转折区</Option>
                                <Option value="3">连接区</Option>
                                <Option value="4">梁缝区</Option>
                            </Select>
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
class SensorForm extends React.Component{

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
                <FormItem label="传感器名称" {...formItemLayout}>
                    {getFieldDecorator('sensorName', {
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
SensorForm = Form.create({})(SensorForm)

// 详情表单

// 修改表单
