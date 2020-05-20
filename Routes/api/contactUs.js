const express = require('express');
const nodemailer = require('nodemailer');
const router = express.Router();

//-------------------------------Mongoose Schema Imports--------------------------------------
const contactUs = require('../../models/ContactUs');


//-------------------------------Middleware Imports---------------------------------------------
const verifyOnlyAdmin = require('../../middleware/ReviewMiddleware').verifyOnlyAdmin;
const verifyAdmin = require('../../middleware/ReviewMiddleware').verifyAdmin;
const authenticateUser = require("../../middleware/ReviewMiddleware").authenticateUser;


//-------------------------------NodeMailer Credentials Imports--------------------------------------
const mailEmail = require('../../config/mailCredentials').email;
const password = require('../../config/mailCredentials').password;


//-------------------------------User Actions--------------------------------------------------------

// Method       : Post
// Headers      : None
// Params       : None
// Body         : name, email, subject, phoneNumber, msg
// Validations  : Empty fields Validation
// Return       : msg
// Description  : Sending a Message to the administrators of the System
// Additional   : This method sends a Email to the provided email address
//                     stating to wait until an admin replies
router.post('/', async (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const subject = req.body.subject;
    const phoneNumber = req.body.phoneNumber;
    const msg = req.body.msg;

    if (name && email && subject && phoneNumber && msg) {
        const contactMessage = {
            name,
            email,
            subject,
            phoneNumber,
            msg
        }
        await contactUs.create(contactMessage, (err, response) => {
            if (err) {
                res.status(400).send({ msg: err });
            } else {
                res.status(201).send({ msg: "Message Sent." });
            }
        });

        const transporter = await nodemailer.createTransport({
            service: "Gmail",
            auth: {
                user: mailEmail,
                pass: password
            }
        });
        await transporter.sendMail({
            to: email,
            subject: `Regarding the message on ${subject}`,
            text: 'This is an auto-generated message. Our team will contact you shortly.'
        }).catch(err=>{
            console.log(err);
            
        });
    } else {
        res.status(403).send({ msg: "One or more required data are not available" });
    }
});


//-------------------------------Administrator Actions--------------------------------------

// Method       : Get
// Headers      : Authorization - 'Bearer token'
// Params       : None
// Body         : None
// Validations  : User Validation, Admin Validation
// Return       : msg -if Error , Data - if Success
// Description  : Getting the all the messages sent using contact us form
router.get('/',authenticateUser,verifyAdmin, (req, res) => {
    contactUs.find((err, data) => {
        if (err) {
            res.status(400).send({ msg: err });
        } else {
            if (data) {
                res.status(200).send({ data });
            } else {
                res.status(200).send({ data: [] });
            }
        }
    })
});


// Method       : Put
// Headers      : Authorization - 'Bearer token'
// Params       : messageId
// Body         : reply
// Validations  : User Validation, Admin Validation
// Return       : msg
// Description  : Replying to messages from contact us from.
// Additional   : The Mail Method in review.js can be used to send an Email to the User
//                After sending the email using that method this method can be called to update the status
router.put('/replied/:id', authenticateUser, verifyAdmin, async (req, res) => {
    const id = req.params.id;
    const reply = req.body.reply;
    const update = {
        replied: true,
        repliedAdmin: req.authData._id,
        replyTime: new Date(),
        reply: reply
    }
    await contactUs.findById(id, (err, contact) => {
        if (err) {
            res.status(400).send({ msg: err });
        } else {
            contactUs.findByIdAndUpdate(id, update, (err, data) => {
                if (err) {
                    res.status(400).send({ msg: err });
                } else {
                    res.status(200).send({ msg: "Updated" });
                }
            })
        }
    })

});

// Method       : Delete
// Headers      : Authorization - 'Bearer token'
// Params       : messageId
// Body         : None
// Validations  : User Validation, Admin Validation (Only Admins)
// Return       : msg
// Description  : Deleting a Message came through the Contact us Form
router.delete('/delete/:id',authenticateUser,verifyOnlyAdmin,(req,res)=>{
    const id = req.params.id;
    contactUs.findByIdAndDelete(id,(err)=>{
        if(err){
            res.status(400).send({msg:err});
        }else{
            res.status(200).send({msg:"Deleted!"});
        }
    })
})

module.exports = router;