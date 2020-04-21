import React, { useState } from 'react';

import classes from './SelectAll.module.css';

const selectAll = (props) => {
  const totalItems = 3;

  return (
    <div className={classes.container}>
      <h2 className={classes.header}>Shopping Cart ({totalItems})</h2>

      <div>
        <input className={classes.styledCheckbox} id="styled-checkbox-1" type="checkbox" value="" />
        <label for="styled-checkbox-1">Select all</label>
      </div>
    </div>
  );
};

export default selectAll;