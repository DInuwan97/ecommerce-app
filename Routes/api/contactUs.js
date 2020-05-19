const express = require('express');
const nodemailer = require('nodemailer');
const contactUs = require('../../models/ContactUs');
const router = express.Router();

router.get('/', (req, res) => {
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

const mailEmail = require('../../config/mailCredentials').email;
const password = require('../../config/mailCredentials').password;
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

const authenticateUser = require("../../middleware/ReviewMiddleware").authenticateUser;
const verifyOnlyAdmin = require('../../middleware/ReviewMiddleware').verifyOnlyAdmin;
const verifyAdmin = require('../../middleware/ReviewMiddleware').verifyAdmin;
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