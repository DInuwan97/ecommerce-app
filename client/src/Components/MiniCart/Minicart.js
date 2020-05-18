import React, { Component } from 'react';
import $ from 'jquery';

import classes from './Minicart.module.css';

class Minicart extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    document.addEventListener("click", (evt) => {
      const minicartEl = document.getElementById("minicart");
      const clickedEl = evt.target;

      if (minicartEl) {
        if (minicartEl != clickedEl) {
          //console.log(this.props.active);
          minicartEl.style.display = "none";
        }
      }
    });
  }


  render() {

    return (
      <div id="minicart" className={classes.container}>
        minicart
      </div>
    );
  }
}



export default Minicart;

