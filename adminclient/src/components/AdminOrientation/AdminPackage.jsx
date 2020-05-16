import React, { Component } from 'react';
import DashbordCardPanel from '../DashbordCardPannel/DashobordCardPanel'
import AdminPackages from '../AdminPackages/AdminPackages';
import AddedPackages from '../AdminPackages/AddedPackages';
export default class AdminPackage extends Component {


    
  render() {
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
                            <AdminPackages/>
                        </div>

                        <div className="col-md-6">
                            <AddedPackages/>
                        </div>

                    </div>
                </div>
            </section>

            
      
            
         

        
      </div>
    );
  }
}
