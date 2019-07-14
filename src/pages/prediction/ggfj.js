import React from 'react';
import {Card,Form, Input, Button, DatePicker, Modal, TreeSelect,Select,Upload,message,Icon} from 'antd';
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
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');

const FormItem = Form.Item;
const Option = Select.Option;
const {RangePicker} =  DatePicker;



export default class MonitorData extends React.Component {

    state = {
        list:[],
        isVisible:false,
        treeSensorList:[]
    }

    
    componentWillMount(){
        //this.getMonitorData();
        this.getTreeSensor();
    }
    //获取传感器类型列表
    getTreeSensor=()=>{
        axios.ajax({
            url:'/getTreeSensor',
            method:'post',
            data:{}
        }).then((res)=>{
            if(res.code == 0){
                res.result.data.map((item, index) => {
                    item.key = index;
                })
                this.setState({
                    treeSensorList: res.result.data
                })
            }
        })
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


    getOption() {
        let data = this.state.list;
        let len = data.length;
        let xData = [];
        let yData = [];
        let legendData = [];
        let i = 0;
        for(i=0;i<len;i++){
            let name = data[i];
            let key = Object.keys(name)[0];
            legendData.push(key);
            let arrays = name[key];
            let tpData = []
            for(let j=0;j<arrays.length;j++){
                if(i == 0){
                    xData.push(arrays[j].monitorDate);
                }                  
                tpData.push(arrays[j].monitorValue);
            }
            let str = { name:key,type:'line',stack:'总量',data: tpData}
            //console.log(json_d)
            yData.push(str)
        }
        //let str = "{ name:'as',type:'line',stack:'总量',data:"+ yData[0]+"}"
        console.log(yData)
        let option = {
            title: {
				text: '数据预测显示'
		    },
            tooltip: {
                trigger: 'axis'
            },
            legend:{
                data:legendData
            },
            xAxis: {
                data: xData
            },
            yAxis: {
                type: 'value'
            },
            series: yData
        }
        return option;
    }

    
      

    // 提交表单
    handleSubmit=(params)=>{
       
        axios.ajax({
            url:'/getMonitorData',
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

    
    render() {
        return (
            <div>
                <Card title="">
                    <FilterForm filterSubmit={this.handleSubmit} treeSensorList={this.state.treeSensorList}/>
                </Card>
                <Card title="钢轨附加应力预测" style={{marginTop:10}}>
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

    //option
    handleChange(value) {
        console.log(`selected ${value}`);
    }


    render(){

        const { getFieldDecorator } = this.props.form;
        const treeSensorList = this.props.treeSensorList || [];

        //文件上传
        const props = {
            name: 'file',
            action: 'https://www.easy-mock.com/mock/5c3445e954d64509bd7982f3/api/filedUpload',
            headers: {
                authorization: 'authorization-text',
            },
            onChange(info) {
                console.log(info)
                if (info.file.status !== 'uploading') {
                    console.log(info.file, info.fileList);
                }
                if (info.file.status === 'done') {
                    message.success(`${info.file.name} file uploaded successfully`);
                } else if (info.file.status === 'error') {
                    message.error(`${info.file.name} file upload failed.`);
                }
            },
        };

        return (
            <Form layout="inline">
                <FormItem label="选择传感器" >
                    {
                        getFieldDecorator('sensorItemId',{
                            initialValue: ''
                        })
                        (
                            <TreeSelect  
                                treeDefaultExpandAll
                                treeData={treeSensorList}
                                treeCheckable={true}
                                
                                searchPlaceholder='请选择传感器'
                                style={{width:300}}
                            />
                        )
                    }
                </FormItem>
                {/* <FormItem label="选择日期范围" >
                    {
                        getFieldDecorator('dateRange',{
                            initialValue: ''
                        })
                        (
                            <RangePicker 
                                placeholder={['开始时间', '结束时间']}
                            />
                        )
                    }
                </FormItem> */}
                <FormItem>
                    <Select defaultValue="最近一天" style={{ width: 120 }} onChange={this.handleChange}>
                        <Option value="最近一天">最近一天</Option>
                        <Option value="最近三天">最近三天</Option>
                        <Option value="最近一周">最近一周</Option>
                        <Option value="最近一月">最近一月</Option>
                    </Select>
                </FormItem>
                <FormItem>
                    
                    <Upload {...props}>
                        <Button>
                        <Icon type="upload" />选择模型
                        </Button>
                        </Upload>
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