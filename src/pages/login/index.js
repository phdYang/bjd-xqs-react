import React from 'react'
import { withRouter } from 'react-router-dom'

export default withRouter(class Login extends React.Component{

    login(){
        sessionStorage.setItem('login',true)
        this.props.history.push('/')
    }
    
    render(){
        return (
            <div>
                this is a Login page.
                {/* <div><Link to="/">login</Link></div> */}
                <div onClick={() => this.login()}>login</div>
                
            </div>
        );
    }
})