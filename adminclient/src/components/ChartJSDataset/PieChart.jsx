import React, { Component } from 'react';

export default class PieChart extends Component {
  render() {
    return (
        <div className="row">
            <div className="col-md-6">

            <div className="card card-danger">
              <div className="card-header">
                <h3 className="card-title">Pie Chart</h3>

                <div class="card-tools">
                  <button type="button" className="btn btn-tool" data-card-widget="collapse"><i className="fas fa-minus"></i>
                  </button>
                  <button type="button" className="btn btn-tool" data-card-widget="remove"><i className="fas fa-times"></i></button>
                </div>
              </div>
              <div className="card-body">
                <canvas id="pieChart" style={{minHeight: 250, height: 250, maHeight: 250,maxWidth: '100%'}}></canvas>
              </div>
              
            </div>
            </div>

            <div className="col-md-6">
            <div class="card card-success">
              <div className="card-header">
                <h3 className="card-title">Bar Chart</h3>

                <div class="card-tools">
                  <button type="button" className="btn btn-tool" data-card-widget="collapse"><i className="fas fa-minus"></i>
                  </button>
                  <button type="button" className="btn btn-tool" data-card-widget="remove"><i className="fas fa-times"></i></button>
                </div>
              </div>
              <div className="card-body">
                <div className="chart">
                  <canvas id="barChart" style={{minHeight: 250, height: 250, maHeight: 250,maxWidth: '100%'}}></canvas>
                </div>
              </div>
           
            </div>
            </div>

            
        </div>
            
    );
  }
}
