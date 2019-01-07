import React from 'react'
import { withRouter } from 'react-router-dom'
import { Card, Form, Input, Icon, Checkbox, Button, message} from 'antd'

const FormItem = Form.Item;

export default withRouter(class Login extends React.Component{

    login=(params)=>{
        // console.log(params);
        let userName = params.userName;
        let userPwd = params.userPwd;

        if((userName == 'admin' && userPwd == '123') || (userName == 'yang' && userPwd == 'yang') ){
            message.success('欢迎您,'+userName+'！');
            sessionStorage.setItem('login',true);
            sessionStorage.setItem('userName',userName);
            this.props.history.push('/')
        }else{
            message.error('密码或用户名错误!')
        }
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
        let userInfo = this.props.form.getFieldsValue();
        this.props.handleSubmit(userInfo);
    }


    render(){

        const {getFieldDecorator} = this.props.form;

        return (
            <Card title="" style={{width:500, marginTop:100, marginLeft:500}}>
                    <Form style={{width:300}}>
                        <FormItem>
                            {
                                getFieldDecorator('userName',{
                                    initialValue: '',
                                    rules: [
                                        {
                                            required:true,
                                            message:'用户名不能为空'
                                        }
                                    ]
                                })(<Input prefix={<Icon type="user"/>} placeholder="请输入用户名"/>)
                            }
                        </FormItem>
                        <FormItem>
                            {
                                getFieldDecorator('userPwd',{
                                    initialValue: '',
                                    rules: []
                                })(<Input prefix={<Icon type="lock"/>} type="password" placeholder="请输入密码"/>)
                            }
                        </FormItem>
                        <FormItem>
                            {
                                getFieldDecorator('remember', {
                                    valuePropName:'checked',
                                    initialValue: true
                                })(
                                    <Checkbox>记住密码</Checkbox>
                                )
                            }
                            <a href="#" style={{float:'right'}}>忘记密码</a>
                        </FormItem>
                        <FormItem>
                            <Button type="primary" onClick={this.handleSubmit}>登陆</Button>
                        </FormItem>
                    </Form>
                </Card>
        );
    }
}
FormLogin = Form.create({})(FormLogin);