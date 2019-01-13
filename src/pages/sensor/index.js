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
        sensorClassList:[],
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
        this.getSensorClass();
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
        this.setState({
            isVisible:true
        })
    }
    //提交新增用户表单
    handleAddSensor=()=>{
        this.sensorForm.props.form.validateFieldsAndScroll((err, values)=>{
            if(err){
                return
            }else{
                let data = this.sensorForm.props.form.getFieldsValue();
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
                        this.sensorForm.props.form.resetFields();
                    }else{
                        message.error('增加传感器失败');
                        this.setState({
                            isVisible:false
                        })
                    }
                })
                //重新查询
                this.getSensorList();
            }
        }); 
    }
    //查看详情
    handleDetail=(id)=>{
        //console.log(text)
        //console.log(record)
        axios.ajax({
            url:'/getSensorDetail',
            method:'get',
            data:{
                params:{seqId:id}
            }
        }).then((res)=>{
            if(res.code == 0){
                this.setState({
                    isDetailsVisible:true,
                    sensorInfo:res.result.data
                })
            }else{
                message.error('查询传感器失败');
                this.setState({
                    isDetailsVisible:false
                })
            }
        })
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
                            seqId:id
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
       
        axios.ajax({
            url:'/getSensorEdit',
            method:'get',
            data:{
                params:{seqId:id}
            }
        }).then((res)=>{
            if(res.code == 0){
                this.setState({
                    isEditVisible:true,
                    sensorEdit:res.result.data
                })
            }else{
                message.error('查询传感器失败');
                this.setState({
                    isEditVisible:false
                })
            }
        })
    }
    //提交编辑信息
    handleEditSensor=()=>{
        this.sensorEdit.props.form.validateFieldsAndScroll((err, values)=>{
            if(err){
                return
            }else{
                let data = this.sensorEdit.props.form.getFieldsValue();
                axios.ajax({
                    url:'/editSensor',
                    method:'get',
                    data:{
                        params:data
                    }
                }).then((res)=>{
                    if(res.code == 0){
                        message.success('修改成功');
                        this.sensorEdit.props.form.resetFields();
                        this.setState({
                            isEditVisible:false
                        })
                    }else{
                        message.error('修改失败');
                        this.setState({
                            isEditVisible:false
                        })
                    }
                })
                //重新查询列表
                this.getSensorList()
            }
        });  
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
                    <SensorForm 
                        sensorClassList={this.state.sensorClassList} 
                        typeList={this.state.typeList}
                        targetList={this.state.targetList} 
                        sectionList={this.state.sectionList} 
                        wrappedComponentRef={(inst) => this.sensorForm = inst }
                        
                    />
                </Modal>
                <Modal 
                    title="传感器详情页"
                    visible={this.state.isDetailsVisible}
                    onCancel={()=>{
                        this.setState({
                            isDetailsVisible:false,
                        })
                    }}
                    footer={null}
                >
                    <SensorDetail sensorInfo={this.state.sensorInfo}/>
                </Modal>
                <Modal 
                    title="编辑传感器"
                    okText="确认"
                    cancelText="取消"
                    visible={this.state.isEditVisible}
                    onOk={this.handleEditSensor}
                    onCancel={()=>{
                        this.sensorEdit.props.form.resetFields();
                        this.setState({
                            isEditVisible:false,
                        })
                    }}
                >
                    <SensorEdit
                        sensorEdit={this.state.sensorEdit}
                        sensorClassList={this.state.sensorClassList} 
                        typeList={this.state.typeList}
                        targetList={this.state.targetList} 
                        sectionList={this.state.sectionList} 
                        wrappedComponentRef={(inst) => this.sensorEdit = inst }
                        
                    />
                </Modal>
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
                        getFieldDecorator('typeName',{
                            initialValue: '0'
                        })
                        (
                            <Select style={{ width: 100 }}>
                                { this.renderOptoin(typeList,'typeName') }
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
                                { this.renderOptoin(targetList,'targetName') }
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

// 增加表单
class SensorForm extends React.Component{

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

        const typeList = this.props.typeList || [];
        const targetList = this.props.targetList || [];
        const sectionList = this.props.sectionList || [];
        const sensorClassList = this.props.sensorClassList || [];

        return (
            <Form layout="horizontal">
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
                <FormItem label="传感器类型" {...formItemLayout}>
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
                </FormItem>
                <FormItem label="检测指标类型" {...formItemLayout}>
                    {
                        getFieldDecorator('typeName',{
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
                        getFieldDecorator('targetName',{
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
                        getFieldDecorator('sectionName',{
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
            </Form>
        );
    }
}
SensorForm = Form.create({})(SensorForm)

// 详情表单
class SensorDetail extends React.Component{


    render(){
        const formItemLayout = {
            labelCol: {span: 5},
            wrapperCol: {span: 16}
        };

        const sensorInfo = this.props.sensorInfo || {}


        return (
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
        );
    }
}
SensorDetail = Form.create({})(SensorDetail)

// 修改表单
class SensorEdit extends React.Component{

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

        const typeList = this.props.typeList || [];
        const targetList = this.props.targetList || [];
        const sectionList = this.props.sectionList || [];
        const sensorClassList = this.props.sensorClassList || [];
        const sensorEdit = this.props.sensorEdit || {};
        return (
            <Form layout="horizontal">
                <FormItem label="ID" {...formItemLayout}>
                    {sensorEdit.seqId}
                </FormItem>
                <FormItem label="传感器编码" {...formItemLayout}>
                    {sensorEdit.sensorCode}
                </FormItem>
                <FormItem label="传感器名称" {...formItemLayout}>
                    {getFieldDecorator('sensorName', {
                        initialValue:sensorEdit.sensorName,
                        rules: [{ required: true ,message:'名称不能为空'}],
                    })(
                        <Input />
                    )}
                </FormItem>
                <FormItem label="通道编码" {...formItemLayout}>
                    {getFieldDecorator('channelCode', {
                        initialValue:sensorEdit.sensorName,
                        rules: [{ required: true ,message:'通道编码不能为空'}],
                    })(
                        <Input />
                    )}
                </FormItem>
                <FormItem label="传感器类型" {...formItemLayout}>
                    {
                        getFieldDecorator('sensorClass',{
                            rules: [{ required: true ,message:'传感器类型不能为空'}],
                        })
                        (
                            <Select>
                                { this.renderOptoin(sensorClassList,'sensorClass') }
                            </Select>
                        )
                    }
                </FormItem>
                <FormItem label="检测指标类型" {...formItemLayout}>
                    {
                        getFieldDecorator('typeName',{
                            rules: [{ required: true ,message:'检测指标类型不能为空'}],
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
                        getFieldDecorator('targetName',{
                            rules: [{ required: true ,message:'监测对象不能为空'}],
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
                        getFieldDecorator('sectionName',{
                            rules: [{ required: true ,message:'传感器位置不能为空'}],
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
                            initialValue:sensorEdit.initKValue,
                        })
                        (
                            <InputNumber step={0.001}/>
                        )
                    }
                </FormItem>
                <FormItem label="初始波长" {...formItemLayout}>
                    {
                        getFieldDecorator('initWave',{
                            initialValue:sensorEdit.initWave,
                        })
                        (
                            <InputNumber step={0.001}/>
                        )
                    }
                </FormItem>
                <FormItem label="初始方向" {...formItemLayout}>
                    {
                        getFieldDecorator('initOrientations',{
                            initialValue:sensorEdit.initOrientations,
                        })
                        (
                            <InputNumber/>
                        )
                    }
                </FormItem>
                <FormItem label="标定波长" {...formItemLayout}>
                    {
                        getFieldDecorator('bdWave',{
                            initialValue:sensorEdit.bdWave,
                        })
                        (
                            <InputNumber step={0.001}/>
                        )
                    }
                </FormItem>
                <FormItem label="标定温度" {...formItemLayout}>
                    {
                        getFieldDecorator('bdTemperature',{
                            initialValue:sensorEdit.bdTemperature,
                        })
                        (
                            <InputNumber step={0.001}/>
                        )
                    }
                </FormItem>
                <FormItem label="具体位置" {...formItemLayout}>
                    {
                        getFieldDecorator('info',{
                            initialValue:sensorEdit.info,
                            rules: [{ required: true ,message:'具体位置不能为空'}],
                        })
                        (
                            <TextArea autosize={{minRows: 4, maxRows: 6}}/>
                        )
                    }
                </FormItem>
                <FormItem label="备注" {...formItemLayout}>
                    {getFieldDecorator('sDesc', {
                        initialValue:sensorEdit.sDesc,
                    })(
                        <Input placeholder='备注随意'/>
                    )}
                </FormItem>
            </Form>
        );
    }
}
SensorEdit = Form.create({})(SensorEdit)