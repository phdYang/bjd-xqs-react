import React from 'react'
import { withRouter } from 'react-router-dom'
import { Card, Form, Input, Icon, Checkbox, Button, message} from 'antd'
import axios from './../../axios'
import './index.less'

const FormItem = Form.Item;

export default withRouter(class Login extends React.Component{

    login=(params)=>{
        // console.log(params);
        let userName = params.userName;
        // let userPwd = params.userPwd;
        axios.ajax({
            url:'/login',
            method:'get',
            data:{
                params:params
            }
        }).then((res)=>{
            if(res.code == 0){
                message.success('欢迎您,'+userName+'！');
                sessionStorage.setItem('login',true);
                sessionStorage.setItem('userName',userName);
                this.props.history.push('/')
            }else{
                message.error('用户名或密码错误!')
            }
        })
        // if((userName == 'admin' && userPwd == '123') || (userName == 'yang' && userPwd == 'yang') ){
        //     message.success('欢迎您,'+userName+'！');
        //     sessionStorage.setItem('login',true);
        //     sessionStorage.setItem('userName',userName);
        //     this.props.history.push('/')
        // }else{
        //     message.error('密码或用户名错误!')
        // }
    }
    

    render(){
        return (
            <div>
                <FormLogin handleSubmit={this.login}/>
            </div>
        );
    }
})

class FormLogin extends React.Component{

    handleSubmit=()=>{
        console.log(1)
        let userInfo = this.props.form.getFieldsValue();
        this.props.handleSubmit(userInfo);
    }


    render(){

        const {getFieldDecorator} = this.props.form;

        return (
            <div className="login">
                <div className="login-form" >
                    <div className="login-logo">
                        <span>欢迎使用铁路线桥隧状态监测预警系统</span>
                    </div>
                    <Form style={{maxWidth: '300px'}}>
                        <FormItem>
                            {getFieldDecorator('userName', {
                                rules: [{ required: true, message: '请输入用户名!' }],
                            })(
                                <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="请输入用户名" />
                            )}
                        </FormItem>
                        <FormItem>
                            {getFieldDecorator('password', {
                                rules: [{ required: true, message: '请输入密码!' }],
                            })(
                                <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="请输入密码" />
                            )}
                        </FormItem>
                        <FormItem>
                            {getFieldDecorator('remember', {
                                valuePropName: 'checked',
                                initialValue: true,
                            })(
                                <Checkbox>记住我</Checkbox>
                            )}
                            <span className="login-form-forgot" href="" style={{float: 'right'}}>忘记密码</span>
                            <Button type="primary" className="login-form-button" style={{width: '100%'}} onClick={this.handleSubmit}>
                                登录
                            </Button>
                        </FormItem>
                    </Form>
                </div>
            </div>
        );
    }
}
FormLogin = Form.create({})(FormLogin);