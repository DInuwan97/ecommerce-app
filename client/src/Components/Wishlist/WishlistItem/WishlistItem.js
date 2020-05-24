import React, { useState } from 'react';
import {Link} from 'react-router-dom';
import classes from './WishlistItem.module.css';

const WishlistItem = props => {
  const options = {
    month: "long", day: "numeric", year: "numeric",
    hour: 'numeric', minute: 'numeric', second: 'numeric',
    hour12: true,
};
const date = new Date(Date.parse(props.item.addedDate));
const AddedDate = new Intl.DateTimeFormat("en-US", options).format(date);

  return (
    
    <div className={classes.container}>
      <div className={classes.image}>
        <figure className={classes.imageFig}>
          <Link to={props.item.category+ '/' +props.item.itemId}>
          <img src={props.item.itemImage} alt="Product Image" onClick={() => props.goto(props.item)} />
          </Link>
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
          <span>Added {AddedDate}</span>
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