import React from 'react'
import './index.less'
export default class Life extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            count: 0
        };
    }

    // 正常方式
    handleAdd=()=>{
        this.setState({
            count: this.state.count + 1
        })
    }
    // 另一种方式
    handleClick(){
    
    }

    render(){
        let style = {
            padding: 50
        }

        return (
            <div className="content">
                <p>React 生命周期</p>
                <button onClick={this.handleAdd}>点击一下</button>
                <button onClick={this.handleClick.bind(this)}>点击一下</button>
                <p> {this.state.count}</p>
            </div>
        )
    }
}