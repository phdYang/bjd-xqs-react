import React from 'react'
import './index.less'
import homeImg from '../home/index-bg2.png';

export default class Home extends React.Component{

    render(){
        return (
            <div className="home-wrap" style={{backgroundImage: `url(${homeImg})` ,height: 700}}>
                
            </div>
        )
    }
}