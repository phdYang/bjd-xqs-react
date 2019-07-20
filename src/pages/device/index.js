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
        this.props.history.push('/AccountManager/deviceAdd')
    }
    
    //查看详情
    handleDetail=(id)=>{
        this.props.history.push('/AccountManager/deviceDetail/2');
    }
    //编辑
    handleEdit=(id)=>{
        this.props.history.push('/AccountManager/deviceEdit/2');
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
              dataIndex:'deviceId',
              key:'deviceId',
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