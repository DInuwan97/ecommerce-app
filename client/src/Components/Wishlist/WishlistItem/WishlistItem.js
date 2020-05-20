import React, { useState } from 'react';

import classes from './WishlistItem.module.css';

const WishlistItem = props => {


  return (
    <div className={classes.container}>
      <div className={classes.image}>
        <figure className={classes.imageFig}>
          <img src={props.item.itemImage} alt="Product Image" onClick={() => props.goto(props.item)} />
        </figure>
      </div>

      <div className={classes.description}>
        <div className={classes.description__name} onClick={() => props.goto(props.item)}>
          {props.item.itemName}
        </div>
        <div className={classes.description__price}>
          <span>LKR {props.item.price}</span>
        </div>
        <div className={classes.description__date}>
          <span>Added {props.item.addedDate}</span>
        </div>
      </div>

      <div className={classes.actions}>
        <div className={classes.remove}>
          <button onClick={() => props.remove(props.item)}>Remove</button>
        </div>

        <div className={classes.addToCart}>
          <button onClick={() => props.add(props.item)}>Add to cart</button>
        </div>
      </div>
    </div>
  );
};

export default WishlistItem;