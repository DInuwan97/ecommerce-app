import React, { Component } from 'react';

export default class LineGraph extends Component {
  render() {
    return (
     
      <div className="card card-info">
      <div className="card-header">
        <h3 className="card-title">Line Chart</h3>

        <div className="card-tools">
          <button type="button" className="btn btn-tool" data-card-widget="collapse"><i className="fas fa-minus"></i>
          </button>
          <button type="button" className="btn btn-tool" data-card-widget="remove"><i className="fas fa-times"></i></button>
        </div>
      </div>
      <div className="card-body">
        <div className="chart">
          <canvas id="lineChart" style={{minHeight: 250, height: 250, maxHeight: 250, maxWidth: '100%'}}></canvas>
        </div>
      </div>
      
    </div>





    
            
    );
  }
}
