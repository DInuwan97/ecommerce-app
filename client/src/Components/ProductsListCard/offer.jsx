import React, { Component } from 'react'

export default class offer extends Component {
    render() {
        return (
            <div className="w3ls_dresses_grid_left_grid">
                    <div className="dresses_img_hover">
                        <img src={require('./assets/images/offer5.jpg')} alt=" " className="img-responsive" />
                        <div className="dresses_img_hover_pos">
                            <h4>Upto<span>30%</span><i>Off</i></h4>
                        </div>
                    </div>
                </div>
        )
    }
}
