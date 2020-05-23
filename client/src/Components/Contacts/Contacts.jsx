import React, { Component } from "react";
import Axios from "axios";
import swal from "sweetalert";

export default class Contacts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      msg: "",
      name: "",
      subject: "",
      phoneNumber: "",
    };
  }

  changeInput = (e) => {
    let value = e.target.value;
    const nameField = document.getElementById("name");
    const emailField = document.getElementById("email");
    const subjectField = document.getElementById("subject");
    const phoneNumberField = document.getElementById("phoneNumber");
    const messageField = document.getElementById("message");
    const warningList = document.getElementById("warningList");
    const submitBtn = document.getElementById("submitBtn");

    switch (e.target.id) {
      case "name":
        this.checkEmptyField(nameField, value, "Name is required");

        this.setState({
          [e.target.name]: value,
        });
        break;

      case "email":
        this.checkEmptyField(emailField, value, "Email is required");

        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)) {
          if (emailField.style.border != "1px solid red") {
            emailField.style.border = "1px solid black";
            this.removeWarning("Invalid email");
          }
        } else {
          emailField.style.border = "1px solid red";
          this.addWarning("Invalid email");
        }
        this.setState({
          [e.target.name]: value.trim(),
        });
        break;

      case "subject":
        this.checkEmptyField(subjectField, value, "Subject is required");

        this.setState({
          [e.target.name]: value,
        });
        break;

      case "phoneNumber":
        this.checkEmptyField(
          phoneNumberField,
          value,
          "Phone number is required"
        );

        if (value[0] != 0 || value.length < 10) {
          if (phoneNumberField.style.border != "1px solid red") {
            phoneNumberField.style.border = "1px solid red";
            this.addWarning("Invalid phone number");
          }
        } else {
          if (phoneNumberField.style.border != "1px solid red") {
            phoneNumberField.style.border = "1px solid black";
            this.removeWarning("Invalid phone number");
          }
        }

        if (!isNaN(value)) {
          this.setState({
            [e.target.name]: value.trim(),
          });
        }

        break;

      case "message":
        this.checkEmptyField(messageField, value, "Message is required");
        this.setState({
          [e.target.name]: value,
        });
        break;

      default:
        console.log("no field match");
    }

    if (
      nameField.style.border != "1px solid red" &&
      emailField.style.border != "1px solid red" &&
      subjectField.style.border != "1px solid red" &&
      phoneNumberField.style.border != "1px solid red" &&
      messageField.style.border != "1px solid red" &&
      this.state.email.trim().length != 0 &&
      this.state.msg.trim().length != 0 &&
      this.state.name.trim().length != 0 &&
      this.state.subject.trim().length != 0 &&
      this.state.phoneNumber.trim().length != 0
    ) {
      this.removeWarning("Please fill all the fields");
    } else {
      this.addWarning("Please fill all the fields");
    }
  };

  checkEmptyField = (field, value, warning) => {
    this.removeWarning("Something went wrong");
    if (value.trim().length == 0) {
      field.style.border = "1px solid red";
      this.addWarning(warning);
    } else {
      field.style.border = "1px solid black";
      this.removeWarning(warning);
    }
  };

  addWarning = (warning) => {
    const warningList = document.getElementById("warningList");
    let hasNode = false;
    warningList.querySelectorAll("*").forEach((n) => {
      if (n.innerHTML.toString() == warning) {
        hasNode = true;
      }
    });
    if (!hasNode) {
      const li = document.createElement("li");
      li.appendChild(document.createTextNode(warning));
      warningList.appendChild(li);
    }
  };

  removeWarning = (warning) => {
    const warningList = document.getElementById("warningList");
    let hasNode = false;
    let li;
    warningList.querySelectorAll("*").forEach((n) => {
      if (n.innerHTML == warning) {
        hasNode = true;
        li = n;
      }
    });
    if (hasNode) {
      warningList.removeChild(li);
    }
  };

  sendMail = () => {
    const warningList = document.getElementById("warningList");
    if (
      this.state.email.trim().length != 0 &&
      this.state.msg.trim().length != 0 &&
      this.state.name.trim().length != 0 &&
      this.state.subject.trim().length != 0 &&
      this.state.phoneNumber.trim().length != 0 &&
      warningList.innerHTML == ""
    ) {
      warningList.innerHTML = "";

      const url = "/api/contactus/";
      const data = {
        name: this.state.name,
        email: this.state.email,
        subject: this.state.subject,
        phoneNumber: this.state.phoneNumber,
        msg: this.state.msg,
      };
      Axios.post(url, data)
        .then(async (res) => {
          await swal({
            title: "Status",
            text: res.data.msg,
            icon: "success",
          });
          this.setState({
            email: "",
            msg: "",
            name: "",
            subject: "",
            phoneNumber: "",
          });
        })
        .catch((err) => {
          swal({
            title: "Error!",
            text: "Fill all the fields.",
            icon: "error",
          });
          this.addWarning("Something went wrong");
        });
    } else {
      this.addWarning("Please fill all the fields");
    }
  };

  render() {
    return (
      <div>
        <div className="contact">
          <div className="container">
            <h3>Contact Us</h3>
            <div className="col-md-3 col-sm-3 contact-left">
              <div className="address">
                <h4>ADDRESS</h4>
                <h5>100 Kaduwela road,</h5>
                <h5>Malabe. Sri Lanka.</h5>
              </div>
              <div className="phone">
                <h4>PHONE</h4>
                <h5>+94(712) 1234 567.</h5>
                <h5>+94(715) 1234 567.</h5>
              </div>
              <div className="email">
                <h4>EMAIL</h4>
                <h5>
                  <a href="mailto:FashionStoreBionics@gmail.com">
                    FashionStoreBionics@gmail.com
                  </a>
                </h5>
              </div>
            </div>
            <div className="col-md-9 col-sm-9 contact-right">
              <input
                id="name"
                type="text"
                value={this.state.name}
                name="name"
                placeholder="Your name"
                required=" "
                maxLength="40"
                onChange={(e) => this.changeInput(e)}
              />
              <input
                id="email"
                type="text"
                value={this.state.email}
                name="email"
                placeholder="Your email"
                required=" "
                maxLength="25"
                onChange={(e) => this.changeInput(e)}
              />
              <input
                id="subject"
                type="text"
                value={this.state.subject}
                name="subject"
                placeholder="Your subject"
                required=" "
                maxLength="40"
                onChange={(e) => this.changeInput(e)}
              />
              <input
                id="phoneNumber"
                type="text"
                value={this.state.phoneNumber}
                name="phoneNumber"
                placeholder="Phone number ex-:0771234567"
                required=" "
                maxLength="10"
                onChange={(e) => this.changeInput(e)}
              />
              <textarea
                id="message"
                name="msg"
                value={this.state.msg}
                placeholder="Your message"
                required=" "
                onChange={(e) => this.changeInput(e)}
              ></textarea>
              <ul
                id="warningList"
                style={{
                  listStyle: "none",
                  fontSize: "1.3rem",
                  color: "red",
                  paddingLeft: "1rem",
                }}
              ></ul>
              <input
                id="submitBtn"
                type="submit"
                value="Send message"
                onClick={() => this.sendMail()}
              />
            </div>
          </div>
        </div>

        <div className="map-w3ls">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3951.403636707571!2d80.75784231538883!3d7.957172494268695!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3afca1239433dcb5%3A0x762e72bb619aef0c!2sSigiriya+Lion+Rock!5e0!3m2!1sen!2slk!4v1533052641591"
            allowfullscreen
          ></iframe>
        </div>
      </div>
    );
  }
}
