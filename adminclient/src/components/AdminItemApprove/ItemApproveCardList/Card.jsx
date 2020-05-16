import React from "react";
import {Link} from 'react-router-dom'
export default function Card({ color, name, value, icon,link }) {
  return (
    <div className="col-lg-3 col-6">
      <div className={`small-box ${color}`}>
        <div className="inner">
          <h3>{value}</h3>

          <p>{name}</p>
        </div>
        <div className="icon">
          <i className={`ion ${icon}`}></i>
        </div>
        <Link to  = {link} className="small-box-footer">
          More info <i className="fas fa-arrow-circle-right"></i>
        </Link>
      </div>
    </div>
  );
}
