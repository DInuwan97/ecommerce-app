import React, { Component } from 'react';

class about extends Component {
    render() {
        return (
            <div class="team" id="team">
                <div className="container">
                    <h3> Our Team</h3>
                    <div className="team-grids">
                        <div className="col-md-3 team-grid">
                            <div className="team-img">
                                <img src="https://res.cloudinary.com/dsuhs6bf5/image/upload/v1589710467/fttacjtcxw86b8bh5yay.png" className="img-responsive" alt=" " />
                                
                                <h4>Dinuwan Kalubowila</h4>
                            </div>
                        </div>
                        <div className="col-md-3 team-grid">
                            <div className="team-img">
                                <img src="https://res.cloudinary.com/dsuhs6bf5/image/upload/v1589459440/xfos10duno5g2hrbvypb.jpg" className="img-responsive" alt=" " />
                                
                                <h4>Dinuka Perera</h4>
                            </div>
                        </div>
                        <div className="col-md-3 team-grid">
                            <div className="team-img">
                                <img src="https://res.cloudinary.com/dsuhs6bf5/image/upload/v1589621741/zehopwq1wkhq1fjfctza.png" className="img-responsive" alt=" " />
                                
                                <h4>Pawan Ariyathilake</h4>
                            </div>
                        </div>
                        <div className="col-md-3 team-grid">
                            <div className="team-img">
                                <img src="https://res.cloudinary.com/dsuhs6bf5/image/upload/v1589621741/zehopwq1wkhq1fjfctza.png" className="img-responsive" alt=" " />
                                <h4>Sachin Athukorala</h4>
                            </div>
                        </div>
                        <div className="clearfix" />
                    </div>
                </div>
            </div>
        );
    }
}

export default about;