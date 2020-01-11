const {Todo} = require('../models/modelTodo');
const nodemailer = require('nodemailer');

class ControllerTodo {
    static viewTodo(req, res) {
        Todo.find({
            user_id: req.user_id
        }).populate({
            path: "user_id",
            select: "email"
        }).then(response => {
            res.status(200).json({
                data: response
            });
        }).catch(err => {
            res.status(500).json({
                message: err
            });
        })
    }

    static createTodo(req, res) {
        Todo.create({
            name: req.body.name,
            description: req.body.description,
            status: "Open",
            due_date: req.body.due_date,
            user_id: req.body.user_id
        }).then(response => {
            ControllerTodo.emailSetAndSend(
                req.email,
                "Create TODO",
                `Name: ${response.name}
                description: ${response.description}
                status: ${response.status}
                due_date: ${response.due_date}`
            );
            res.status(201).json({
                message: "Todo successfully created",
                data: response
            });
        }).catch(err => {
            res.status(500).json({
                message: err
            });
        })
    }

    static updateTodo(req, res) {
        Todo.updateOne({
            _id: req.params.idTodo
        }, {
            name: req.body.name,
            description: req.body.description,
            status: req.body.status,
            due_date: req.body.due_date,
            user_id: req.body.user_id
        }).then(response => {
            if (!response.nModified) throw "No data changed !!!";
            res.status(200).json({
                message: "Todo successfully updated"
            });
        }).catch(err => {
            res.status(500).json({
                message: err
            });
        })
    }

    static deleteTodo(req, res) {
        Todo.deleteOne({
            _id: req.params.idTodo
        }).then(response => {
            if (!response.deletedCount) throw "No data deleted !!!";
            res.status(200).json({
                message: "Todo successfully deleted"
            });

        }).catch(err => {
            res.status(500).json({
                message: err
            });
        })
    }

    static emailSetAndSend(
        mailTo,
        subject,
        mailContent
    ) {
        const transporter = nodemailer.createTransport({
            service: process.env.EMAIL_SERVICE,
            auth: {
                user: process.env.EMAIL_SERVER,
                pass: process.env.EMAIL_PASSWORD
            }
        });

        const mailOptions = {
            from: process.env.EMAIL_SERVER,
            to: mailTo,
            subject: subject,
            text: mailContent
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
    }

}

module.exports = ControllerTodo;