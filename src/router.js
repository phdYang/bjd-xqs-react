import React from 'react';
import {HashRouter,Route,Switch,Redirect} from 'react-router-dom';
import App from './App';
import Login from './pages/login';
import Admin from './admin';
import Home from './pages/home';
import User from './pages/user'
import UserLog from './pages/userlog'
import Sensor from './pages/sensor'

export default class IRouter extends React.Component{

    render(){
        return (
            <HashRouter>
                <App>
                    <Switch>
                        <Route path="/login" component={Login} />
                        <Route path="/" render={()=>(
                            <Admin>
                                <Switch>
                                    <Route path="/home" component={Home}/>
                                    <Route path='/SystemManager/ShowUser' component={User}/>
                                    <Route path='/SystemManager/UserLog' component={UserLog}/>
                                    <Route path='/AccountManager/ShowSensor' component={Sensor}/>
                                    <Redirect to="/home"/>
                                </Switch>
                            </Admin>
                        )} />
                    </Switch>
                </App>
            </HashRouter>
        );
    }
}