import React from 'react';

import DashbordCardPanel from '../DashbordCardPannel/DashobordCardPanel'
import FlaotAreaChart from '../FloatDataSet/AreaChart';
import LineGraph from '../ChartJSDataset/LineGraph';
import DiectChat from '../DirectChat/DirectChat';
import SalesGraph from '../SalesGraph/SalesGraph'
import AreaChart from '../ChartJSDataset/AreaChart';
import DonutChart from '../ChartJSDataset/DonutChart';
import BarChart from '../ChartJSDataset/BarChart';
export default function HomePage() {
  return (
    <div>
            <section className="content-header">
              <div className="container-fluid">
                    <DashbordCardPanel/>  
              </div>
            </section>

            <section className="content-header">
              <div className="container-fluid"> 
              <div className="row">     
                <div className="col-md-6">
                  <FlaotAreaChart/> 
                </div> 
                <div className="col-md-6">
                  <DonutChart/> 
                </div>   
                </div>    
              </div>
            </section>

            <div className="row">

              <div className="col-md-6">

                <section className="content">
                  <div className="container-fluid">
                    <LineGraph/>
                  </div>
                </section>

              </div>


              <div className="col-md-6">

                <section className="content">
                  <div className="container-fluid">
                    <AreaChart/>
                  </div>
                </section>

              </div>

            </div>

           


            
            <section className="content">
                <div className="container-fluid">
               
                </div>
            </section>
    </div>
  );
}
