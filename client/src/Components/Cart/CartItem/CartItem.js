import React from 'react';

import classes from "./CartItem.module.css";

const CartItem = props => {
  console.log(props.item.isSelected + ' ' + props.item.id);
  console.log(props.item);

  let isChecked = props.item.isSelected;

  return (
    <div className={classes.container}>
      <div className={classes.check}>
        <input className={classes.styledCheckbox} id={props.id} type="checkbox" value=""
          checked={isChecked}
          onChange={() => props.select(props.id)} />
        <label for={props.id}></label>
      </div>

      <div className={classes.picture}>
        <figure className={classes.imageFig}>
          {/* <img src={require('./tp3.jpg')} alt="Product Image" className={classes.image} /> */}
          <img src={props.item.itemImage} alt="Product Image" className={classes.image} />
        </figure>
      </div>

      <div className={classes.details}>
        <div className={classes.details__name}>
          {props.item.itemName}
        </div>
        <div className={classes.details__stockq}>
          <span className={classes.details__stockq_1}>Stock Quantity:</span>
          <span className={classes.details__stockq_2}>{props.item.stockQuantity}</span>
        </div>
        <div className={classes.details__color}>
          <span className={classes.details__color_1}>Color:</span>
          <span className={classes.details__color_2}>{props.item.color}</span>
          <span className={classes.details__color_3}>&nbsp;</span>
        </div>
        <div className={classes.details__size}>
          <span className={classes.details__size_1}>Size:</span>
          <span className={classes.details__size_2}>{props.item.size}</span>
        </div>
        <div className={classes.details__discount}>
          <span className={classes.details__discount_1}>Discount:</span>
          <span className={classes.details__discount_2}>{props.item.discount}%</span>
        </div>
        <div className={classes.details__price}>LKR {props.item.quantity <= 1 ? props.item.price : props.item.totalPrice}</div>
      </div>

      <div className={classes.actions}>
        <div className={classes.actions_1}>
          <div className={classes.wishlist}>
            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" className={classes.wishlist__btn}>
              <title>Wishlist</title>
              <path d="M17.19 4.156c-1.672-1.535-4.383-1.535-6.055 0l-1.135 1.041-1.136-1.041c-1.672-1.535-4.382-1.535-6.054 0-1.881 1.726-1.881 4.519 0 6.245l7.19 6.599 7.19-6.599c1.88-1.726 1.88-4.52 0-6.245zM16.124 9.375l-6.124 5.715-6.125-5.715c-0.617-0.567-0.856-1.307-0.856-2.094s0.138-1.433 0.756-1.999c0.545-0.501 1.278-0.777 2.063-0.777s1.517 0.476 2.062 0.978l2.1 1.825 2.099-1.826c0.546-0.502 1.278-0.978 2.063-0.978s1.518 0.276 2.063 0.777c0.618 0.566 0.755 1.212 0.755 1.999s-0.238 1.528-0.856 2.095z"></path>
            </svg>
          </div>
          <div className={classes.remove}>
            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" className={classes.remove__btn}>
              <title>Remove</title>
              <path d="M4 10v20c0 1.1 0.9 2 2 2h18c1.1 0 2-0.9 2-2v-20h-22zM10 28h-2v-14h2v14zM14 28h-2v-14h2v14zM18 28h-2v-14h2v14zM22 28h-2v-14h2v14z"></path>
              <path d="M26.5 4h-6.5v-2.5c0-0.825-0.675-1.5-1.5-1.5h-7c-0.825 0-1.5 0.675-1.5 1.5v2.5h-6.5c-0.825 0-1.5 0.675-1.5 1.5v2.5h26v-2.5c0-0.825-0.675-1.5-1.5-1.5zM18 4h-6v-1.975h6v1.975z"></path>
            </svg>
          </div>
        </div>

        <div className={classes.actions_2}>
          <div className={classes.plus}>
            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className={classes.plus__btn}>
              <path d="M18.984 12.984h-6v6h-1.969v-6h-6v-1.969h6v-6h1.969v6h6v1.969z"></path>
            </svg>
          </div>
          <div className={classes.quantity}>
            <span className={classes.quantity__number}>
              {props.item.quantity < 1 ? 1 : props.item.quantity}
            </span>
          </div>
          <div className={classes.minus}>
            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" className={classes.minus__btn}>
              <path d="M16 10c0 0.553-0.048 1-0.601 1h-10.798c-0.552 0-0.601-0.447-0.601-1s0.049-1 0.601-1h10.799c0.552 0 0.6 0.447 0.6 1z"></path>
            </svg>
          </div>
        </div>
      </div>
    </div >
  );
};

export default CartItem;