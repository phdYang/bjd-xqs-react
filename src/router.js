import React from 'react';
import {HashRouter,Route,Switch,Redirect} from 'react-router-dom';
import App from './App';
import Login from './pages/login';
import Admin from './admin';
import Home from './pages/home';
import User from './pages/user'
import UserLog from './pages/userlog'
import Sensor from './pages/sensor'
import Device from './pages/device'
import MonitorData from './pages/dataEcharts'


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
                                    <Route path='/AccountManager/ShowDevice' component={Device}/>
                                    <Route path='/MonitorDataManager/ShowMonitorData' component={MonitorData}/>
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