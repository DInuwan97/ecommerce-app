import React from 'react';

import classes from './POrderCard.module.css';

const POrderCard = props => {
  console.log(props.order);

  // formate purchased date
  let date = (new Date(props.order.purchasedDate)).toString();
  let date2 = date.substring(4, 15);
  let time = date.substring(16, 21);
  date = time + " " + date2;
  console.log("date : " + time);

  // redirect to single item
  const redirectToSingleItem = (item) => {
    console.log(item);
  };

  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <div className={classes.header__1}>
          <div className={classes.header__1__orderId}>
            <span className={classes.header__topic}>Order Id:</span>
            <span className={classes.header__value}>{props.order._id}</span>
          </div>

          <div className={classes.header__1__orderDate}>
            <span className={classes.header__topic}>Order Date:</span>
            <span className={classes.header__value}>{date}</span>
          </div>
        </div>

        <div className={classes.header__2}>
          <div className={classes.header__2__orderAmount}>
            <span className={classes.header__topic2}>Order Amount:</span>
            <span className={classes.header__value2}>LKR {props.order.summary.total.toFixed(2)}</span>
          </div>

          <div className={classes.header__2__delete}>
            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"
              className={classes.remove__btn} onClick={() => props.remove(props.order._id)}>
              <title>Remove</title>
              <path d="M4 10v20c0 1.1 0.9 2 2 2h18c1.1 0 2-0.9 2-2v-20h-22zM10 28h-2v-14h2v14zM14 28h-2v-14h2v14zM18 28h-2v-14h2v14zM22 28h-2v-14h2v14z"></path>
              <path d="M26.5 4h-6.5v-2.5c0-0.825-0.675-1.5-1.5-1.5h-7c-0.825 0-1.5 0.675-1.5 1.5v2.5h-6.5c-0.825 0-1.5 0.675-1.5 1.5v2.5h26v-2.5c0-0.825-0.675-1.5-1.5-1.5zM18 4h-6v-1.975h6v1.975z"></path>
            </svg>
          </div>
        </div>
      </div>

      <div className={classes.items}>
        {props.order.items.map((item, index) => (
          <div className={classes.item}>
            <div className={classes.image}>
              <figure className={classes.imageFig}>
                <img src={item.itemImage} alt="Product Image" onClick={() => redirectToSingleItem(item)} />
              </figure>
            </div>

            <div className={classes.details1}>
              <div className={classes.details1__name} onClick={() => redirectToSingleItem(item)}>
                {item.itemName}
              </div>

              <div className={classes.details1__price}>
                <span className={classes.details__topic}>Unit price:</span>
                <span className={classes.details__value}>LKR {item.price.toFixed(2)}</span>
              </div>

              <div className={classes.details1__orderAmount}>
                <span className={classes.details__topic}>Quantity:</span>
                <span className={classes.details__value}>{item.quantity}</span>
              </div>

              <div className={classes.details1__orderAmount}>
                <span className={classes.details__topic}>Discount:</span>
                <span className={classes.details__value}>{item.discount}</span>
              </div>
            </div>

            <div className={classes.details2}>
              <div className={classes.details1__orderAmount}>
                <span className={classes.details__topic}>Company:</span>
                <span className={classes.details__value}>{item.company}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

}

export default POrderCard;