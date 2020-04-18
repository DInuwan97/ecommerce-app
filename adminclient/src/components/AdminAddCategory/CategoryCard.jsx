import React from "react";

export default function CategoryCard({ color, name, value, icon }) {
  return (
    <div className="col-lg-4 col-6">
      <div className={`small-box ${color}`}>
        <div className="inner">
          <h3>{value}</h3>

          <p>{name}</p>
        </div>
        <div className="icon">
          <i className={`ion ${icon}`}></i>
        </div>
        <a href="#" className="small-box-footer">
          More info <i className="fas fa-arrow-circle-right"></i>
        </a>
      </div>
    </div>
  );
}
