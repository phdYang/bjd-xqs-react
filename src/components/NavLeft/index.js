import React from 'react';
import MenuConfig from './../../config/menuConfig'
import {Menu} from 'antd'
import './index.less'

const SubMenu = Menu.SubMenu

export default class NavLeft extends React.Component{

    componentWillMount(){
        const menuTreeNode = this.renderMenu(MenuConfig);
        this.setState({
            menuTreeNode
        })
    }

    // 菜单渲染
    renderMenu=(data)=>{
        return data.map((item)=>{
            if(item.children){
                return (
                    <SubMenu title={item.title} key={item.key}>
                        { this.renderMenu(item.children) } 
                    </SubMenu>
                )
            }else{
                return (
                    <Menu.Item title={item.title} key={item.key}>{ item.title}</Menu.Item>
                )
            }
        })
    }

    render(){
        return (
            <div>
                <div className="logo">
                    <img src="/assert/logo.png" alt=""/>
                </div>
                <Menu
                    theme="dark"
                >
                    { this.state.menuTreeNode }
                </Menu>
            </div>
        )
    }
}