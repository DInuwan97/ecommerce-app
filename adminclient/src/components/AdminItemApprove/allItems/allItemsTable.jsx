import React, { Component } from 'react'
import Table from './Table'
export default class allItemsTable extends Component {


    render() {
        return (
            <div>
                <Table items = {this.props.items} declineItem = {this.props.declineItem}/>
            </div>
        )
    }
}
