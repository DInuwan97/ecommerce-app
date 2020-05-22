import React, { useState } from 'react';

import classes from './CartItemPopup.module.css';

const PopupMessage = props => {

  return (
    <div className={classes.popupModal}>
      <div className={classes.popupModal__content}>
        <div className={classes.popupModal__content_1}>
          <h3>Are you sure about this?</h3>
          <span id="close" className={classes.popupModal__close} onClick={props.close}>&times;</span>
        </div>
        <div className={classes.popupModal__content_2}>
          {props.content}
        </div>
        <div className={classes.popupModal__content_3}>
          <button className={classes.popupModal__btnOk} onClick={props.action}>OK</button>
          <button className={classes.popupModal__btnCancel} onClick={props.close}>Cancel</button>
        </div>
      </div>
    </div>

  );
};

export default PopupMessage;