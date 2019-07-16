import React from 'react'
import {Card, Form, Input, Button, Table, Select, Modal,InputNumber, message} from 'antd'
import axios from './../../axios'

const FormItem = Form.Item;
const Option = Select.Option;
const TextArea = Input.TextArea;
export default class Sensor extends React.Component{

    state= {
        list:[],
        isVisible:false,
        typeList:[],
        targetList:[],
        sectionList:[],
        // sensorClassList:[],
        sensorInfo:{},
        isDetailsVisible:false,
        isEditVisible:false,
        sensorEdit:{}
    }

    params = {
        page:1
    }

    componentDidMount(){
        this.getSensorList();
        this.getTypeList();
        this.getTargetList();
        this.getSectionList();
        //this.getSensorClass();
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
    //获取传感器类型列表
    //TODO 暂时注释，因为数据库表没有sensorclass字段;包括
    // this.getSensorClass();和sensorClassList:[],都暂时注释
    // getSensorClass=()=>{
    //     axios.ajax({
    //         url:'/getSensorClass',
    //         method:'post',
    //         data:{}
    //     }).then((res)=>{
    //         if(res.code == 0){
    //             res.result.data.map((item, index) => {
    //                 item.key = index;
    //             })
    //             this.setState({
    //                 sensorClassList: res.result.data
    //             })
    //         }
    //     })
    // }

    //获取检测指标类型列表
    getTypeList=()=>{
        axios.ajax({
            url:'/getTypeList',
            method:'post',
            data:{}
        }).then((res)=>{
            console.log(res)
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

    // 提交查询表单
    handleSubmit=(params)=>{
        console.log(params)
        axios.ajax({
            url:'/getSensorByOther',
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
    addSensor=()=>{
        this.props.history.push('/AccountManager/sensorAdd')
    }
    
    //查看详情
    handleDetail=(id)=>{
        console.log(id)
        this.props.history.push('/AccountManager/sensorDetail/'+id);
    }
    //删除
    handleDel=(id)=>{
        Modal.confirm({
            title:'确认删除',
            content:'确定要删除此传感器吗？',
            okText:'确认',
            cancelText:'取消',
            onOk:()=>{
                axios.ajax({
                    url:'/delSensor',
                    method:'get',
                    data:{
                        params:{
                            sensorId:id
                        }
                    }
                }).then((res)=>{
                    if(res.code == 0){
                        message.success('删除成功！');
                        //重新刷新页面
                        this.getSensorList();
                    }else{
                        message.error('删除失败！');
                    }
                })
            }
        })
    }
    //编辑
    handleEdit=(id)=>{
        this.props.history.push('/AccountManager/sensorEdit/'+id);
    }
    

    render(){
        const columns = [
            {
              title:'ID',
              dataIndex:'sensorId',
              key:'sensorId',
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
            // {
            //     title: '传感器类型',
            //     dataIndex: 'sensorClass',
            //     key: 'sensorClass'
            // },
            {
                title: '操作',
                key: 'operation',
                render:(record)=>{
                    return (
                        <div>
                            <a onClick={()=>this.handleDetail(record.sensorId)}>查看详情</a>
                            <span style={{marginLeft:5,marginRight:5}}>|</span>
                            <a onClick={()=>this.handleEdit(record.sensorId)}>编辑</a>
                            <span style={{marginLeft:5,marginRight:5}}>|</span>
                            <a onClick={()=>this.handleDel(record.sensorId)}>删除</a>
                        </div>
                    );
                }
            }
        ]


        return (
            <div>
                <Card style={{marginBottom:10}}>
                    <FilterForm filterSubmit={this.handleSubmit} typeList={this.state.typeList} targetList={this.state.targetList} sectionList={this.state.sectionList}/>
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
            </div>
        );
    }
}

class FilterForm extends React.Component{

    renderOptoin(tagOptions,type){
        if(type == 'typeName'){
            return tagOptions.map(tag => <Option key={tag.typeId}>{tag.typeName}</Option>);
        }
        if(type == 'targetName'){
            return tagOptions.map(tag => <Option key={tag.targetId}>{tag.targetName}</Option>);
        }
        if(type == 'sectionName'){
            return tagOptions.map(tag => <Option key={tag.sectionId}>{tag.sectionName}</Option>);
        }
        
    }


    handleFilterSubmit=()=>{
        let fieldsValue = this.props.form.getFieldsValue();
        this.props.filterSubmit(fieldsValue);
    }

    reset=()=>{
        this.props.form.resetFields();
    }

    render(){

        const { getFieldDecorator } = this.props.form;
        const typeList = this.props.typeList || [];
        const targetList = this.props.targetList || [];
        const sectionList = this.props.sectionList || [];
        
        return (
            <Form layout="inline">
                <FormItem label="选择检测指标类型">
                    {
                        getFieldDecorator('typeId',{
                            initialValue: '0'
                        })
                        (
                            <Select style={{ width: 160 }}>
                                { this.renderOptoin(typeList,'typeName') }
                            </Select>
                        )
                    }
                </FormItem>
                <FormItem label="选择传感器监测对象">
                    {
                        getFieldDecorator('targetId',{
                            initialValue: '0'
                        })
                        (
                            <Select style={{ width: 100 }}>
                                { this.renderOptoin(targetList,'targetName') }
                            </Select>
                        )
                    }
                </FormItem>
                <FormItem label="选择传感器位置">
                    {
                        getFieldDecorator('sectionId',{
                            initialValue: '0'
                        })
                        (
                            <Select style={{ width: 100 }}>
                                { this.renderOptoin(sectionList,'sectionName') }
                            </Select>
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