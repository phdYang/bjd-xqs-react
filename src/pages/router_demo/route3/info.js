import React from 'react'

export default class Info extends React.Component{

    render(){
        return (
            <div>
                this is a Info page. {this.props.match.params.mainId}
            </div>
        );
    }
}