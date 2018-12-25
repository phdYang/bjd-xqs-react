import React from 'react'
import './../ui.less'
import {Card, Button, notification} from 'antd'


export default class Notice extends React.Component{

    openNotification=(type, direction)=>{
        if(direction){
            notification.config({
                placement: direction
            })
        }
        notification[type]({
            message: '发工资了',
            description: '嚓嚓嚓嚓嚓嚓嚓嚓嚓嚓嚓'
        });
    }

    render(){
        return (
            <div>
                <Card title="通知提醒框" className="card-wrap">
                    <Button type="primary" onClick={()=>this.openNotification('success')}>Success</Button>
                    <Button type="primary" onClick={()=>this.openNotification('info')}>Info</Button>
                    <Button type="primary" onClick={()=>this.openNotification('warning')}>Warning</Button>
                    <Button type="primary" onClick={()=>this.openNotification('error')}>Error</Button>
                </Card>
                <Card title="通知提醒框" className="card-wrap">
                    <Button type="primary" onClick={() => this.openNotification('success','topLeft')}>Success</Button>
                    <Button type="primary" onClick={() => this.openNotification('info','topRight')}>Info</Button>
                    <Button type="primary" onClick={() => this.openNotification('warning','bottomLeft')}>Warning</Button>
                    <Button type="primary" onClick={() => this.openNotification('error','bottomRight')}>Error</Button>
                </Card>
            </div>
        );
    }
}