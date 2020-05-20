import React, { Component } from "react";

import DashbordCardPanel from '../DashbordCardPannel/DashobordCardPanel'
import FlaotAreaChart from '../FloatDataSet/AreaChart';
import LineGraph from '../ChartJSDataset/LineGraph';
import DiectChat from '../DirectChat/DirectChat';
import SalesGraph from '../SalesGraph/SalesGraph'
import AreaChart from '../ChartJSDataset/AreaChart';
import DonutChart from '../ChartJSDataset/DonutChart';
import BarChart from '../ChartJSDataset/BarChart';

import axios from 'axios';
export default class HomePage extends Component{


  constructor(props){
    super(props);
    this.state = {
      usersList:[],
      loggedUserDetails:''
    }
  }



render(){

  return (
    <div>
            <section className="content-header">
              <div className="container-fluid">
                    <DashbordCardPanel usersList={this.props.usersList} loggedUserDetails={this.props.loggedUserDetails} itemsList={this.props.itemsList}/>  
              </div>
            </section>

            <section className="content-header">
              <div className="container-fluid"> 
              <div className="row">     
                <div className="col-md-6">
                  <BarChart/> 
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
}
