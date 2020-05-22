import React, { Component } from 'react';

import classes from './PasswordChangePopup.module.css';

class PopupMessage extends Component {
  state = {
    oldPwd: "sachin",
    newPwd: '',
    cnewPwd: '',
    isChangeBtnActive: false,

  };



  onChangePwd = (event) => {
    console.log(event.target.id);
    let value = event.target.value.trim();
    const oldPwdField = document.getElementById("oldPwd");
    const newPwdField = document.getElementById("newPwd");
    const newCPwdField = document.getElementById("cNewPwd");
    const errorList_oldPwd = document.getElementById("errorList-1");
    const errorList_newPwd = document.getElementById("errorList-2");
    const errorList_newCPwd = document.getElementById("errorList-3");
    const changeBtn = document.getElementById("changeBtn");

    switch (event.target.id) {
      // old password field
      case 'oldPwd':
        this.checkFieldEmpty(value, oldPwdField, errorList_oldPwd);

        if (value != this.state.oldPwd) {
          oldPwdField.style.border = "1px solid red";

          let hasNode = false;
          errorList_oldPwd.querySelectorAll('*').forEach(n => {
            if (n.innerHTML.toString() == "Incorrect old password") {
              hasNode = true;
            }
          });
          if (!hasNode) {
            const li = document.createElement("li");
            li.appendChild(document.createTextNode("Incorrect old password"));
            errorList_oldPwd.appendChild(li);
          }

        } else {
          oldPwdField.style.border = "1px solid rgba(0, 0, 0, 0.9)";

          let hasNode = false;
          errorList_oldPwd.querySelectorAll('*').forEach(n => {
            if (n.innerHTML == "Incorrect old password") {
              hasNode = true;
            }
          });
          if (hasNode) {
            errorList_oldPwd.innerHTML = "";
          }

        }

        oldPwdField.value = value;
        break;

      // new password field
      case "newPwd":
        this.checkFieldEmpty(value, newPwdField, errorList_newPwd);

        if (oldPwdField.value == this.state.oldPwd && oldPwdField.value == value) {
          newPwdField.style.border = "1px solid red";

          let hasNode = false;
          errorList_newPwd.querySelectorAll('*').forEach(n => {
            if (n.innerHTML.toString() == "Type another password") {
              hasNode = true;
            }
          });
          if (!hasNode) {
            const li = document.createElement("li");
            li.appendChild(document.createTextNode("Type another password"));
            errorList_newPwd.appendChild(li);
          }
        } else {
          if (newPwdField.style.border != "1px solid red") {
            newPwdField.style.border = "1px solid rgba(0, 0, 0, 0.9)";
          }

          let hasNode = false;
          errorList_newPwd.querySelectorAll('*').forEach(n => {
            if (n.innerHTML == "Type another password") {
              hasNode = true;
            }
          });
          if (hasNode) {
            errorList_newPwd.innerHTML = "";
          }
        }
        newPwdField.value = value;
        break;

      // conform new password field
      case "cNewPwd":
        this.checkFieldEmpty(value, newCPwdField, errorList_newCPwd);

        if (newPwdField.value.length != 0 && value != newPwdField.value) {
          newCPwdField.style.border = "1px solid red";

          let hasNode = false;
          errorList_newCPwd.querySelectorAll('*').forEach(n => {
            if (n.innerHTML.toString() == "Passwords do not match") {
              hasNode = true;
            }
          });
          if (!hasNode) {
            const li = document.createElement("li");
            li.appendChild(document.createTextNode("Passwords do not match"));
            errorList_newCPwd.appendChild(li);
          }
        } else {
          if (newCPwdField.style.border != "1px solid red") {
            newCPwdField.style.border = "1px solid rgba(0, 0, 0, 0.9)";
          }

          let hasNode = false;
          errorList_newCPwd.querySelectorAll('*').forEach(n => {
            if (n.innerHTML == "Passwords do not match") {
              hasNode = true;
            }
          });
          if (hasNode) {
            errorList_newCPwd.innerHTML = "";
          }
        }
        newCPwdField.value = value;
        break;

      default:
        oldPwdField.value = value;
        newPwdField.value = value;
        newCPwdField.value = value;
    }

    if (oldPwdField.value == this.state.oldPwd) {
      newPwdField.disabled = false;
    } else {
      newPwdField.disabled = true;
    }

    if (newPwdField.disabled || newPwdField.value == oldPwdField.value || newPwdField.value.length == 0) {
      newCPwdField.disabled = true;
    } else {
      newCPwdField.disabled = false;
    }

    // check and active change button
    if (oldPwdField.value == this.state.oldPwd && newPwdField.style.border != "1px solid red" &&
      newCPwdField.style.border != "1px solid red" && newCPwdField.value.length != 0) {
      changeBtn.disabled = false;
    } else {
      changeBtn.disabled = true;
    }


  }

  checkFieldEmpty = (value, field, errorList) => {
    if (value.length == 0) {
      field.style.border = "1px solid red";
      console.log("fucked");

      let hasNode = false;
      errorList.querySelectorAll('*').forEach(n => {
        if (n.innerHTML.toString() == "Field cannot be empty") {
          hasNode = true;
        }
      });
      if (!hasNode) {
        const li = document.createElement("li");
        li.appendChild(document.createTextNode("Field cannot be empty"));
        errorList.appendChild(li);
      }

    } else {
      field.style.border = "1px solid rgba(0, 0, 0, 0.9)";

      let hasNode = false;
      errorList.querySelectorAll('*').forEach(n => {
        if (n.innerHTML == "Field cannot be empty") {
          hasNode = true;
        }
      });
      if (hasNode) {
        errorList.innerHTML = "";
      }

    }
  }



  onPwdView = (field) => {
    const oldPwdField = document.getElementById("oldPwd");
    const newPwdField = document.getElementById("newPwd");
    const newCPwdField = document.getElementById("cNewPwd");

    switch (field) {
      case "oldPwd_show":
        oldPwdField.type = "text";
        break;
      case "oldPwd_hide":
        oldPwdField.type = "password";
        break;
      case "newPwd_show":
        newPwdField.type = "text";
        break;
      case "newPwd_hide":
        newPwdField.type = "password";
        break;
      case "newCPwd_show":
        newCPwdField.type = "text";
        break;
      case "newCPwd_hide":
        newCPwdField.type = "password";
        break;
      default:
        oldPwdField.type = "text";
        newPwdField.type = "text";
        newCPwdField.type = "text";
    }

  }

  changePassword = () => {

  };

  render() {
    return (
      <div className={classes.popupModal}>
        <div className={classes.popupModal__content}>
          <div className={classes.header}>
            <h3>Reset Password</h3>
            <span id="close" className={classes.popupModal__close} onClick={this.props.close}>&times;</span>
          </div>

          <div className={classes.form}>
            <div className={classes.formItem}>
              <label for="oldPwd">Old Password</label>
              <div className={classes.formItem_input}>
                <input id="oldPwd" type="password" onChange={this.onChangePwd} />
                <span>
                  <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"
                    onMouseDown={() => this.onPwdView("oldPwd_show")}
                    onMouseUp={() => this.onPwdView("oldPwd_hide")}>
                    <title>View Password</title>
                    <path d="M0.106 11.553c-0.136 0.274-0.146 0.603 0 0.894 0 0 0.396 0.789 1.12 1.843 0.451 0.656 1.038 1.432 1.757 2.218 0.894 0.979 2.004 1.987 3.319 2.8 1.595 0.986 3.506 1.692 5.698 1.692s4.103-0.706 5.698-1.692c1.315-0.813 2.425-1.821 3.319-2.8 0.718-0.786 1.306-1.562 1.757-2.218 0.724-1.054 1.12-1.843 1.12-1.843 0.136-0.274 0.146-0.603 0-0.894 0 0-0.396-0.789-1.12-1.843-0.451-0.656-1.038-1.432-1.757-2.218-0.894-0.979-2.004-1.987-3.319-2.8-1.595-0.986-3.506-1.692-5.698-1.692s-4.103 0.706-5.698 1.692c-1.315 0.813-2.425 1.821-3.319 2.8-0.719 0.786-1.306 1.561-1.757 2.218-0.724 1.054-1.12 1.843-1.12 1.843zM2.14 12c0.163-0.281 0.407-0.681 0.734-1.158 0.41-0.596 0.94-1.296 1.585-2.001 0.805-0.881 1.775-1.756 2.894-2.448 1.35-0.834 2.901-1.393 4.647-1.393s3.297 0.559 4.646 1.393c1.119 0.692 2.089 1.567 2.894 2.448 0.644 0.705 1.175 1.405 1.585 2.001 0.328 0.477 0.572 0.876 0.734 1.158-0.163 0.281-0.407 0.681-0.734 1.158-0.41 0.596-0.94 1.296-1.585 2.001-0.805 0.881-1.775 1.756-2.894 2.448-1.349 0.834-2.9 1.393-4.646 1.393s-3.297-0.559-4.646-1.393c-1.119-0.692-2.089-1.567-2.894-2.448-0.644-0.705-1.175-1.405-1.585-2.001-0.328-0.477-0.572-0.877-0.735-1.158zM16 12c0-1.104-0.449-2.106-1.172-2.828s-1.724-1.172-2.828-1.172-2.106 0.449-2.828 1.172-1.172 1.724-1.172 2.828 0.449 2.106 1.172 2.828 1.724 1.172 2.828 1.172 2.106-0.449 2.828-1.172 1.172-1.724 1.172-2.828zM14 12c0 0.553-0.223 1.051-0.586 1.414s-0.861 0.586-1.414 0.586-1.051-0.223-1.414-0.586-0.586-0.861-0.586-1.414 0.223-1.051 0.586-1.414 0.861-0.586 1.414-0.586 1.051 0.223 1.414 0.586 0.586 0.861 0.586 1.414z"></path>
                  </svg>
                </span>
              </div>
              <ul id="errorList-1" className={classes.errorList}>
              </ul>
            </div>

            <div className={classes.formItem}>
              <label for="newPwd">New Password</label>
              <div className={classes.formItem_input}>
                <input id="newPwd" type="password" onChange={this.onChangePwd} disabled />
                <span>
                  <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"
                    onMouseDown={() => this.onPwdView("newPwd_show")}
                    onMouseUp={() => this.onPwdView("newPwd_hide")}>
                    <title>View Password</title>
                    <path d="M0.106 11.553c-0.136 0.274-0.146 0.603 0 0.894 0 0 0.396 0.789 1.12 1.843 0.451 0.656 1.038 1.432 1.757 2.218 0.894 0.979 2.004 1.987 3.319 2.8 1.595 0.986 3.506 1.692 5.698 1.692s4.103-0.706 5.698-1.692c1.315-0.813 2.425-1.821 3.319-2.8 0.718-0.786 1.306-1.562 1.757-2.218 0.724-1.054 1.12-1.843 1.12-1.843 0.136-0.274 0.146-0.603 0-0.894 0 0-0.396-0.789-1.12-1.843-0.451-0.656-1.038-1.432-1.757-2.218-0.894-0.979-2.004-1.987-3.319-2.8-1.595-0.986-3.506-1.692-5.698-1.692s-4.103 0.706-5.698 1.692c-1.315 0.813-2.425 1.821-3.319 2.8-0.719 0.786-1.306 1.561-1.757 2.218-0.724 1.054-1.12 1.843-1.12 1.843zM2.14 12c0.163-0.281 0.407-0.681 0.734-1.158 0.41-0.596 0.94-1.296 1.585-2.001 0.805-0.881 1.775-1.756 2.894-2.448 1.35-0.834 2.901-1.393 4.647-1.393s3.297 0.559 4.646 1.393c1.119 0.692 2.089 1.567 2.894 2.448 0.644 0.705 1.175 1.405 1.585 2.001 0.328 0.477 0.572 0.876 0.734 1.158-0.163 0.281-0.407 0.681-0.734 1.158-0.41 0.596-0.94 1.296-1.585 2.001-0.805 0.881-1.775 1.756-2.894 2.448-1.349 0.834-2.9 1.393-4.646 1.393s-3.297-0.559-4.646-1.393c-1.119-0.692-2.089-1.567-2.894-2.448-0.644-0.705-1.175-1.405-1.585-2.001-0.328-0.477-0.572-0.877-0.735-1.158zM16 12c0-1.104-0.449-2.106-1.172-2.828s-1.724-1.172-2.828-1.172-2.106 0.449-2.828 1.172-1.172 1.724-1.172 2.828 0.449 2.106 1.172 2.828 1.724 1.172 2.828 1.172 2.106-0.449 2.828-1.172 1.172-1.724 1.172-2.828zM14 12c0 0.553-0.223 1.051-0.586 1.414s-0.861 0.586-1.414 0.586-1.051-0.223-1.414-0.586-0.586-0.861-0.586-1.414 0.223-1.051 0.586-1.414 0.861-0.586 1.414-0.586 1.051 0.223 1.414 0.586 0.586 0.861 0.586 1.414z"></path>
                  </svg>
                </span>
              </div>
              <ul id="errorList-2" className={classes.errorList}>
              </ul>
            </div>

            <div className={classes.formItem}>
              <label for="cNewPwd">Confirm New Password</label>
              <div className={classes.formItem_input}>
                <input id="cNewPwd" type="password" onChange={this.onChangePwd} disabled />
                <span>
                  <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"
                    onMouseDown={() => this.onPwdView("newCPwd_show")}
                    onMouseUp={() => this.onPwdView("newCPwd_hide")}>
                    <title>View Password</title>
                    <path d="M0.106 11.553c-0.136 0.274-0.146 0.603 0 0.894 0 0 0.396 0.789 1.12 1.843 0.451 0.656 1.038 1.432 1.757 2.218 0.894 0.979 2.004 1.987 3.319 2.8 1.595 0.986 3.506 1.692 5.698 1.692s4.103-0.706 5.698-1.692c1.315-0.813 2.425-1.821 3.319-2.8 0.718-0.786 1.306-1.562 1.757-2.218 0.724-1.054 1.12-1.843 1.12-1.843 0.136-0.274 0.146-0.603 0-0.894 0 0-0.396-0.789-1.12-1.843-0.451-0.656-1.038-1.432-1.757-2.218-0.894-0.979-2.004-1.987-3.319-2.8-1.595-0.986-3.506-1.692-5.698-1.692s-4.103 0.706-5.698 1.692c-1.315 0.813-2.425 1.821-3.319 2.8-0.719 0.786-1.306 1.561-1.757 2.218-0.724 1.054-1.12 1.843-1.12 1.843zM2.14 12c0.163-0.281 0.407-0.681 0.734-1.158 0.41-0.596 0.94-1.296 1.585-2.001 0.805-0.881 1.775-1.756 2.894-2.448 1.35-0.834 2.901-1.393 4.647-1.393s3.297 0.559 4.646 1.393c1.119 0.692 2.089 1.567 2.894 2.448 0.644 0.705 1.175 1.405 1.585 2.001 0.328 0.477 0.572 0.876 0.734 1.158-0.163 0.281-0.407 0.681-0.734 1.158-0.41 0.596-0.94 1.296-1.585 2.001-0.805 0.881-1.775 1.756-2.894 2.448-1.349 0.834-2.9 1.393-4.646 1.393s-3.297-0.559-4.646-1.393c-1.119-0.692-2.089-1.567-2.894-2.448-0.644-0.705-1.175-1.405-1.585-2.001-0.328-0.477-0.572-0.877-0.735-1.158zM16 12c0-1.104-0.449-2.106-1.172-2.828s-1.724-1.172-2.828-1.172-2.106 0.449-2.828 1.172-1.172 1.724-1.172 2.828 0.449 2.106 1.172 2.828 1.724 1.172 2.828 1.172 2.106-0.449 2.828-1.172 1.172-1.724 1.172-2.828zM14 12c0 0.553-0.223 1.051-0.586 1.414s-0.861 0.586-1.414 0.586-1.051-0.223-1.414-0.586-0.586-0.861-0.586-1.414 0.223-1.051 0.586-1.414 0.861-0.586 1.414-0.586 1.051 0.223 1.414 0.586 0.586 0.861 0.586 1.414z"></path>
                  </svg>
                </span>
              </div>
              <ul id="errorList-3" className={classes.errorList}>
              </ul>
            </div>

            <div className={classes.formSubmit}>
              <button id="changeBtn" className={classes.btnChange} onChange={this.changePassword}
                disabled>Change Password</button>
              <button className={classes.btnCancel} onClick={this.props.close}>Cancel</button>
            </div>
          </div>

        </div>
      </div>

    );
  }

};

export default PopupMessage;