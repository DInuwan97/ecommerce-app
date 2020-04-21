import React, { Component } from 'react'
import axios from 'axios'
export default class ImageTestPage extends Component {
    constructor(props){
        super(props);
        this.state = {
            items : []
        }
    }

    componentDidMount(){
        axios.get(`/api/items`).then((res) => {
            const items = res.data;
            console.log(items);
      
            this.setState({ items });
          });
    }

    render() {
        return (
            <div>
                <div className="row">
                    {this.state.items.map(item => (
                        <img src={item.itemImage} alt=""/>
                        
                    ))}
                </div>
            </div>
        )
    }
}
