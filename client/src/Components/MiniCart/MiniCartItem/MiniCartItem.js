import React from 'react';

import classes from './MiniCartItem.module.css';

const MiniCartItem = props => {

  return (
    <div className={classes.container}>
      <div className={classes.name}>
        <span>{props.item.itemName}</span>
      </div>

      <div className={classes.price}>
        <span>LKR{props.item.price.toFixed(2)}</span>
      </div>

      <div className={classes.actions}>
        <div className={classes.actions__q}>
          quantity
        </div>

        <div className={classes.actions__r}>
          remove
        </div>
      </div>
    </div>
  );

};

export default MiniCartItem;