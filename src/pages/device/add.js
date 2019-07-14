import React from 'react'
import {Card, Form, Input, Button, Table, Select, Modal, message} from 'antd'
import axios from './../../axios'

const FormItem = Form.Item;
const Option = Select.Option;

class DeviceForm extends React.Component{

    handleFilterSubmit=()=>{
        this.props.form.validateFieldsAndScroll((err, values)=>{
            if(err){
                return
            }else{
                let data = this.props.form.getFieldsValue();
                //console.log('add:'+data);
                axios.ajax({
                    url:'/addDevice',
                    method:'get',
                    data:{
                        params:data
                    }
                }).then((res)=>{
                    if(res.code == 0){
                        message.success('增加成功');
                        this.setState({
                            isVisible:false
                        })
                        this.props.form.resetFields();
                    }else{
                        message.error('增加失败');
                        this.setState({
                            isVisible:false
                        })
                    }
                })

                this.props.history.push('/AccountManager/ShowDevice')
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

        return (
            <Card title="设备增加页" extra={<a href="http://localhost:3000/#/AccountManager/ShowDevice">返回</a>}>
                <Form layout="horizontal">
                    <FormItem label="设备名称" {...formItemLayout}>
                        {getFieldDecorator('deviceName', {
                            rules: [{ required: true ,message:'名称不能为空'}],
                        })(
                            <Input />
                        )}
                    </FormItem>
                    <FormItem label="设备IP" {...formItemLayout}>
                        {getFieldDecorator('deviceIp', {
                            rules: [{ required: true ,message:'设备IP不能为空'}],
                        })(
                            <Input />
                        )}
                    </FormItem>
                    <FormItem label="设备用途" {...formItemLayout}>
                        {getFieldDecorator('deviceUse', {
                            rules: [{ required: true ,message:'用途不能为空'}],
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
                    <FormItem {...offsetLayout}>
                        <Button type="primary" onClick={this.handleFilterSubmit} style={{marginLeft:200}}>确定</Button>
                        <Button type="primary" onClick={this.reset} style={{marginLeft:10}}>重置</Button>
                    </FormItem>
                </Form>
            </Card>
        );
    }
}
export default DeviceForm = Form.create({})(DeviceForm)