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
                                <Route path="/admin/ui/buttons" component={Buttons} />
                                <Route path="/admin/ui/modals" component={modals} />
                                <Route path="/admin/ui/loadings" component={Loadings} />
                                <Route path="/admin/ui/notification" component={Notice} />
                                <Route path="/admin/ui/messages" component={Messages} />
                                <Route path="/admin/ui/tabs" component={ITabs} />
                                <Route path="/admin/ui/gallery" component={Gallery} />
                                <Route component={NoMatch}/>
                            </Switch>
                        </Admin>
                    )} />
                    <Route path="/order/detail" component={Login} />
                </App>
            </HashRouter>
        );
    }
}