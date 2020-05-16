import React, { Component } from 'react'

export default class BarChart extends Component {
    render() {
        return (
            <div className="card card-success">
            <div className="card-header">
              <h3 className="card-title">Stacked Bar Chart</h3>

              <div class="card-tools">
                <button type="button" className="btn btn-tool" data-card-widget="collapse"><i className="fas fa-minus"></i>
                </button>
                <button type="button" className="btn btn-tool" data-card-widget="remove"><i className="fas fa-times"></i></button>
              </div>
            </div>
            <div className="card-body">
              <div className="chart">
                <canvas id="stackedBarChart" style={{minHeight:250, height: 250, maxHeight: 250, maxWidth: '100%'}}></canvas>
              </div>
            </div>
          </div>
        )
    }
}
