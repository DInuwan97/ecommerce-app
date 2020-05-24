import React, { useState } from 'react';
import axios from 'axios';
import classes from "./CartItem.module.css";
import PopupMessage from '../../PopupWindows/CartItemPopup/CartItemPopup';

const CartItem = props => {
  const [popupModal, setPopupModal] = useState({
    isActive: false,
    activeModal: '',
    text: ''
  });

  let quantity = props.item.quantity;
  let price = props.item.price;
  if (props.item.quantity > 1) {
    price = props.item.totalPrice;
  }

  // set disable styles for increse and decrease quantity buttons
  let plusBtnStyle = 'plus__btn';
  let minusBtnStyle = 'minus__btn';
  if (props.item.quantity <= 1) {
    minusBtnStyle = 'minus__btn_deactive';
  }
  if (props.item.quantity === props.item.stockQuantity) {
    plusBtnStyle = 'plus__btn_deactive';
  }

  //console.log(props.item.isSelected + ' ' + props.item.id);
  //console.log(props.item);
  console.log('rendered cartitem');
  console.log(props.item);

  let isChecked = props.item.isSelectedItem;

  //////////////////////////////// methods ////////////////////////////////
  // open popup to add to wishlist
  const moveToWishlistHandler = () => {
    if (!popupModal.isActive) {
      setPopupModal({
        isActive: true,
        activeModal: 'wishlist',
        text: 'This action will move this item to the wishlist.'
      });
    }
  };

  // open popup to remove item
  const removeItemHandler = () => {
    if (!popupModal.isActive) {
      setPopupModal({
        isActive: true,
        activeModal: 'remove',
        text: 'This action will remove this item from your shopping cart.'
      });
    }
  };

  //add to wishlist or remove
  const moveOrRemove = () => {
    if (popupModal.activeModal == 'wishlist') {
      closePopup();
      props.move(props.item);
    } else {
      closePopup();
      props.remove(props.item._id);
    }
  };

  // close popup
  const closePopup = () => {
    if (popupModal.isActive) {
      setPopupModal({ isActive: false, activeModal: '', text: '' });
    }
  };

  // increase quantity of a item
  const increaseQuantity = () => {
    if (quantity == props.item.stockQuantity) {
      return;
    }
    let number = quantity + 1;
    props.changeQuantity(props.item._id, number);
    // axios({
    //   method:'patch',
    //   url:`/api/cart/setQuantity/${props.item._id}`,
    //   data:{
    //     quantity:quantity
    //   }
    // })
  };

  // decrease quantity of a item
  const decreaseQuantity = () => {
    if (quantity <= 1) {
      return;
    }
    let number = quantity - 1;
    props.changeQuantity(props.item._id, number);

    // axios({
    //   method:'patch',
    //   url:`/api/cart/setQuantity/${props.item._id}`,
    //   data:{
    //     quantity:quantity
    //   }
    // })
  };

  // change item quantity using input field
  const changeQuantity = (event) => {
    let number = Number.parseInt(event.target.value);
    console.log(number);
    if (number > props.item.stockQuantity || number < 1 || event.target.value.includes('-') || event.target.value.includes('+')) {
      return;
    } else if (isNaN(number)) {
      number = 1;
    }
    props.changeQuantity(props.item._id, number);
  };

  // redirect to single item
  const redirectToSingleItem = (item) => {
    console.log(item);
  };

  return (
    <div className={classes.container}>
      <div className={classes.check}>
        <input className={classes.styledCheckbox} id={props.item._id} type="checkbox" value=""
          checked={isChecked}
          onChange={() => props.select(props.item._id)} />
        <label for={props.item._id}></label>
      </div>

      <div className={classes.picture}>
        <figure className={classes.imageFig}>
          <img src={props.item.itemImage} alt="Product Image" className={classes.image} onClick={() => redirectToSingleItem(props.item)} />
        </figure>
      </div>

      <div className={classes.details}>
        <div className={classes.details__name} onClick={() => redirectToSingleItem(props.item)}>
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
        <div className={classes.details__price}>LKR {props.item.price.toFixed(2) * props.item.quantity}</div>
      </div>

      <div className={classes.actions}>
        <div className={classes.actions_1}>
          <div className={classes.wishlist} onClick={moveToWishlistHandler}>
            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" className={classes.wishlist__btn}>
              <title>Wishlist</title>
              <path d="M17.19 4.156c-1.672-1.535-4.383-1.535-6.055 0l-1.135 1.041-1.136-1.041c-1.672-1.535-4.382-1.535-6.054 0-1.881 1.726-1.881 4.519 0 6.245l7.19 6.599 7.19-6.599c1.88-1.726 1.88-4.52 0-6.245zM16.124 9.375l-6.124 5.715-6.125-5.715c-0.617-0.567-0.856-1.307-0.856-2.094s0.138-1.433 0.756-1.999c0.545-0.501 1.278-0.777 2.063-0.777s1.517 0.476 2.062 0.978l2.1 1.825 2.099-1.826c0.546-0.502 1.278-0.978 2.063-0.978s1.518 0.276 2.063 0.777c0.618 0.566 0.755 1.212 0.755 1.999s-0.238 1.528-0.856 2.095z"></path>
            </svg>
          </div>
          <div className={classes.remove} onClick={removeItemHandler}>
            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" className={classes.remove__btn}>
              <title>Remove</title>
              <path d="M4 10v20c0 1.1 0.9 2 2 2h18c1.1 0 2-0.9 2-2v-20h-22zM10 28h-2v-14h2v14zM14 28h-2v-14h2v14zM18 28h-2v-14h2v14zM22 28h-2v-14h2v14z"></path>
              <path d="M26.5 4h-6.5v-2.5c0-0.825-0.675-1.5-1.5-1.5h-7c-0.825 0-1.5 0.675-1.5 1.5v2.5h-6.5c-0.825 0-1.5 0.675-1.5 1.5v2.5h26v-2.5c0-0.825-0.675-1.5-1.5-1.5zM18 4h-6v-1.975h6v1.975z"></path>
            </svg>
          </div>
        </div>

        <div className={classes.actions_2}>
          <button className={classes.minus} onClick={decreaseQuantity} disabled={props.item.quantity === 1}>
            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" className={classes[minusBtnStyle]}>
              <path d="M16 10c0 0.553-0.048 1-0.601 1h-10.798c-0.552 0-0.601-0.447-0.601-1s0.049-1 0.601-1h10.799c0.552 0 0.6 0.447 0.6 1z"></path>
            </svg>
          </button>
          <div className={classes.quantity} >
            <input type="number" className={classes.quantity__numberI} value={quantity} maxLength="3"
              onChange={changeQuantity} min="0" />
            {/* <span className={classes.quantity__number}>
              {props.item.quantity < 1 ? 1 : props.item.quantity}
            </span> */}
          </div>
          <button className={classes.plus} onClick={increaseQuantity} disabled={props.item.quantity >= props.item.stockQuantity}>
            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className={classes[plusBtnStyle]}>
              <path d="M18.984 12.984h-6v6h-1.969v-6h-6v-1.969h6v-6h1.969v6h6v1.969z"></path>
            </svg>
          </button>
        </div>
      </div>

      {/*******  pop up modal ***********/}
      {popupModal.isActive ? <PopupMessage content={popupModal.text} close={closePopup} action={moveOrRemove} /> : null}

    </div >
  );
};

export default CartItem;



