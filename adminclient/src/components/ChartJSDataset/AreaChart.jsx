import React, { Component } from 'react'

export default class AreaChart extends Component {
    render() {
        return (
            
            <div class="card card-primary">
            <div className="card-header">
              <h3 className="card-title">Area Chart</h3>

              <div class="card-tools">
                <button type="button" className="btn btn-tool" data-card-widget="collapse"><i className="fas fa-minus"></i>
                </button>
                <button type="button" className="btn btn-tool" data-card-widget="remove"><i className="fas fa-times"></i></button>
              </div>
            </div>
            <div className="card-body">
              <div className="chart">
                <canvas id="areaChart" style={{minHeight: 250, height: 250, maxHeight: 250,maxWidth: '100%'}}></canvas>
              </div>
            </div>
           
          </div>
            
        )
    }
}
