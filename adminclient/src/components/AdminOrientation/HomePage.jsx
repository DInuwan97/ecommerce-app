import React from 'react';

import DashbordCardPanel from '../DashbordCardPannel/DashobordCardPanel'
import FlaotAreaChart from '../FloatDataSet/AreaChart';
import PieChart from '../ChartJSDataset/PieChart';
import DiectChat from '../DirectChat/DirectChat';
import SalesGraph from '../SalesGraph/SalesGraph'

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
                    <FlaotAreaChart/> 
              </div>
            </section>

            <section className="content">
                <div className="container-fluid">
                    <PieChart/>
                </div>
            </section>

            <section className="content">
                <div className="container-fluid">
                    <DiectChat/>
                </div>
            </section>

            
            <section className="content">
                <div className="container-fluid">
                <SalesGraph/>
                </div>
            </section>
    </div>
  );
}
