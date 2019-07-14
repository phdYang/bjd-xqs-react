import React from 'react';
import {Row,Col} from 'antd';
import Header from './components/Header'
import Footer from './components/Footer'
import NavLeft from './components/NavLeft'
import {withRouter} from 'react-router-dom'
import './style/common.less'

export default withRouter(class Admin extends React.Component{

    constructor(props){
        super(props)
        this.state={
            isLogin: sessionStorage.getItem('login') || false
        }
    }

    componentWillMount(){
        
        if(!this.state.isLogin){
            const {history} = this.props;
            setTimeout(() => {
              history.replace("/login");
            }, 1000)
          }
    }


    render(){
        return (
            this.state.isLogin?(
                <Row className="container">
                    <Col span="3" className="nav-left">
                        <NavLeft />
                    </Col>
                    <Col span="21" className="main">
                        <Header />
                        <Row className="content">
                            {this.props.children}
                        </Row>
                        <Footer />
                    </Col>
                </Row>
            ):null
        )
    }
})