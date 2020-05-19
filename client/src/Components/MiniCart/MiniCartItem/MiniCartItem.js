import React from 'react';

import classes from './MiniCartItem.module.css';

const MiniCartItem = props => {
  let quantity = props.item.quantity;

  // decrease quantity of a item
  const decreaseQuantity = () => {
    if (quantity <= 1) {
      return;
    }
    let number = quantity - 1;
    props.changeQuantity(props.item._id, number);
  };

  // increase quantity of a item
  const increaseQuantity = () => {
    if (quantity == props.item.stockQuantity) {
      return;
    }
    let number = quantity + 1;
    props.changeQuantity(props.item._id, number);
  };

  // remove item
  const remove = () => {
    props.remove(props.item._id);
  };

  return (
    <div className={classes.container}>
      <div className={classes.name}>
        <span>{props.item.itemName}</span>
      </div>

      <div className={classes.price}>
        <span>LKR {props.item.quantity > 1 ? props.item.totalPrice.toFixed(2) : props.item.price.toFixed(2)}</span>
      </div>

      <div className={classes.actions}>
        <div className={classes.actions__q}>

          <button className={classes.minus} disabled={props.item.quantity === 1} onClick={decreaseQuantity}>
            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" className={classes.minus__btn}>
              <path d="M16 10c0 0.553-0.048 1-0.601 1h-10.798c-0.552 0-0.601-0.447-0.601-1s0.049-1 0.601-1h10.799c0.552 0 0.6 0.447 0.6 1z"></path>
            </svg>
          </button>
          <span>{props.item.quantity}</span>
          <button className={classes.plus} disabled={props.item.quantity === props.item.stockQuantity} onClick={increaseQuantity}>
            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className={classes.plus__btn}>
              <path d="M18.984 12.984h-6v6h-1.969v-6h-6v-1.969h6v-6h1.969v6h6v1.969z"></path>
            </svg>
          </button>

        </div>

        <div className={classes.actions__r} onClick={remove}>
          <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" className={classes.remove__btn}>
            <title>Remove</title>
            <path d="M4 10v20c0 1.1 0.9 2 2 2h18c1.1 0 2-0.9 2-2v-20h-22zM10 28h-2v-14h2v14zM14 28h-2v-14h2v14zM18 28h-2v-14h2v14zM22 28h-2v-14h2v14z"></path>
            <path d="M26.5 4h-6.5v-2.5c0-0.825-0.675-1.5-1.5-1.5h-7c-0.825 0-1.5 0.675-1.5 1.5v2.5h-6.5c-0.825 0-1.5 0.675-1.5 1.5v2.5h26v-2.5c0-0.825-0.675-1.5-1.5-1.5zM18 4h-6v-1.975h6v1.975z"></path>
          </svg>
        </div>
      </div>
    </div>
  );

};

export default MiniCartItem;