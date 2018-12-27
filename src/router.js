import React from 'react';
import {HashRouter,Route,Switch} from 'react-router-dom';
import App from './App';
import Login from './pages/login';
import Admin from './admin';
import Buttons from './pages/ui/buttons';
import NoMatch from './pages/nomatch';
import Home from './pages/home'
import modals from './pages/ui/modals'
import Loadings from './pages/ui/loadings'
import Notice from './pages/ui/notices'
import Messages from './pages/ui/messages'
import ITabs from './pages/ui/tabs'
import Gallery from './pages/ui/gallery'
import Carousels from './pages/ui/carousels'
import FormLogin from './pages/form/login'
import FormRegister from './pages/form/register'
import BasicTable from './pages/table/basicTable'
import HighTable from './pages/table/highTable'
import City from './pages/city'
import Order from './pages/order'
import Common from './common'

export default class IRouter extends React.Component{

    render(){
        return (
            <HashRouter>
                <App>
                    <Route path="/login" component={Login} />
                    <Route path="/admin" render={()=>(
                        <Admin>
                            <Switch>
                                <Route path="/admin/home" component={Home}/>
                                <Route path="/admin/ui/button" component={Buttons} />
                                <Route path="/admin/ui/modal" component={modals} />
                                <Route path="/admin/ui/loading" component={Loadings} />
                                <Route path="/admin/ui/notification" component={Notice} />
                                <Route path="/admin/ui/message" component={Messages} />
                                <Route path="/admin/ui/tab" component={ITabs} />
                                <Route path="/admin/ui/gallery" component={Gallery} />
                                <Route path="/admin/ui/carousel" component={Carousels} />
                                <Route path="/admin/form/login" component={FormLogin} />
                                <Route path="/admin/form/reg" component={FormRegister} />
                                <Route path="/admin/table/basic" component={BasicTable} />
                                <Route path="/admin/table/high" component={HighTable} />
                                <Route path="/admin/city" component={City} />
                                <Route path="/admin/order" component={Order} />
                                <Route component={NoMatch}/>
                            </Switch>
                        </Admin>
                    )} />
                    <Route path="/common" render={()=>(
                        <Common>
                            <Route path="/common/order/detail/:orederId" component={Login} />
                        </Common>
                    )} />
                </App>
            </HashRouter>
        );
    }
}