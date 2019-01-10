import React from 'react';
import {Card,Form, Input, Button, DatePicker} from 'antd';
import axios from './../../axios'

import ReactEcharts from 'echarts-for-react';
// import echarts from 'echarts'
import echarts from 'echarts/lib/echarts'
// 引入饼图和折线图
import 'echarts/lib/chart/line'
// 引入提示框和标题组件
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/markPoint';

const FormItem = Form.Item;
export default class MonitorData extends React.Component {

    state = {
        list:[],
        listTest:[]
    }

    componentWillMount(){
        this.getMonitorData();
        this.getMonitorDataTest();
    }

    getMonitorData=()=>{
        axios.ajax({
            url:'/getMonitorData',
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

    // 测试接口  正式不应使用
    getMonitorDataTest=()=>{
        axios.ajax({
            url:'/getMonitorData',
            method:'post',
            data:{}
        }).then((res)=>{
            if(res.code == 0){
                res.result.data.map((item, index) => {
                    item.key = index;
                })
                this.setState({
                    listTest: res.result.data
                })
            }
        })
    }

    getOption() {
        let md = []
        let xT = []
        let data = this.state.list;
        for(let i=0;i<data.length;i++){
            md.push(data[i].MonitorData)
            xT.push(i);
        }

        let mdT = []
        let temp = this.state.listTest;
        for(let i=0;i<temp.length;i++){
            mdT.push(temp[i].MonitorData)
        }
        
        let option = {
            title: {
				text: '铁路线桥隧状态数据显示'
		    },
            tooltip: {
                trigger: 'axis'
            },
            legend:{
                data:['温度传感器','应力传感器']
            },
            xAxis: {
                data: xT
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    name: '温度传感器',
                    type: 'line',
                    stack: '总量',
                    data: md
                },
                {
                    name: '应力传感器',
                    type: 'line',
                    stack: '总量',
                    data: mdT
                }
            ]
        }
        return option;
    }

    // 提交表单
    handleSubmit=()=>{

    }

    render() {
        return (
            <div>
                <Card title="">
                    <FilterForm filterSubmit={this.handleSubmit}/>
                </Card>
                <Card title="数据展示" style={{marginTop:10}}>
                    <ReactEcharts
                        option={this.getOption()}
                        notMerge={true}
                        lazyUpdate={true}
                        style={{
                        height: 700
                    }}/>
                </Card>
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
                        getFieldDecorator('sensorItemId',{
                            initialValue: ''
                        })
                        (
                            <Input />
                        )
                    }
                </FormItem>
                <FormItem label="选择传感器">
                    {
                        getFieldDecorator('sensorId',{
                            initialValue: ''
                        })
                        (
                            <Input />
                        )
                    }
                </FormItem>
                <FormItem label="选择起止时间" >
                    {
                        getFieldDecorator('begin_time')(
                            <DatePicker showTime={true} placeholder="开始时间" format="YYYY-MM-DD HH:mm:ss"/>
                        )
                    }
                </FormItem>
                <FormItem label="" colon={false} >
                    {
                        getFieldDecorator('end_time')(
                            <DatePicker showTime={true} placeholder="结束时间" format="YYYY-MM-DD HH:mm:ss" />
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