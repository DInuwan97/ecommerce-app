import React, { useState } from 'react';

import classes from './SelectAll.module.css';

const SelectAll = props => {

  let isChecked = props.selected;
  console.log(isChecked);

  return (
    <div className={classes.container}>
      <h2 className={classes.header}>Shopping Cart ({props.totalItems})</h2>

      <div>
        <input className={classes.styledCheckbox} id="styled-checkbox-main" type="checkbox" value=""
          onChange={props.clicked} checked={isChecked} />
        <label for="styled-checkbox-main">Select all</label>
      </div>
    </div>
  );


};

export default SelectAll;