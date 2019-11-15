import React from 'react'
import {Card, Form, Row, Col, Radio} from 'antd'



export default class AlarmSetting extends React.Component{

    render(){

        return (
            <div>
                <Row gutter={16} style={{ paddingLeft:150}}>
                    <Col span={8}>
                        <Card title="系统报警" style={{ width:300}}>
                            <Radio>弹窗</Radio><br/>
                            <Radio>邮件</Radio><br/>
                            <Radio>短信</Radio>
                        </Card>
                    </Col>
                    <Col span={8}>
                        <Card title="一级结构报警" style={{ width:300}}>
                            <Radio>弹窗</Radio><br/>
                            <Radio>邮件</Radio><br/>
                            <Radio>短信</Radio><br/>
                        </Card> 
                    </Col>
                    <Col span={8}>
                        <Card title="二级结构报警" style={{ width:300}}>
                            <Radio>弹窗</Radio><br/>
                            <Radio>邮件</Radio><br/>
                            <Radio>短信</Radio><br/>
                        </Card>
                    </Col>
                </Row>
                
                
                
            </div>
        );
    }
}



