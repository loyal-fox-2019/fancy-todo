const mongoose = require("mongoose");
mongoose.set('useUnifiedTopology', true);
const url = process.env.DB_URL;

mongoose.connect(url, {useNewUrlParser: true});

const User = require("../models/user");

const _ = require('underscore');

class UserController 
{
    static showAllUsers(req,res)
    {
        User.find((err,users) => {
            if(err)
            {
                res.status(400).json({
                    msg: "invalid request"
                })                
            }
            else
            {
                res.status(200).json(users);
            }
            
        });
    }

    static showUserById(req,res)
    {
        User.findById(req.params.id,function(err,user) {
            if(err)
            {
                res.status(400).json({
                    msg: "invalid request"
                })
            }
            else if(user)
            {
                res.status(200).json(user);
            }
            else
            {
                res.status(404).json({
                    msg: "not found"
                })
            }
        })

        
    }

    static addUser(req,res)
    {
        const data = _.pick(req.body,'username','password','login_type');
        
        User.create(data)
        .then((user) => {            
            res.status(201).json(user);
        })
        .catch((err) => {
            res.status(400).json({
                msg: "invalid request"
            })
        });
    }

    static updateUser(req,res) //only update password allowed
    {
        const data = _.pick(req.body,'password');

        User.findById(req.params.id,(err,user) => {
            if(err)
            {
                res.status(400).json({
                    msg: "invalid request"
                });
            }
            else if(user)
            {
                user.password = data.password;
                user.save((err,updated) => {
                    if(err)
                    {
                        res.status(400).json({
                            err: "invalid request"
                        })
                    }
                    else
                    {
                        res.status(201).json({
                            msg: "update success",
                            updated: updated
                        });
                    }
                })
            }
            else
            {
                res.status(404).json({
                    msg: "not found"
                });
            }
        })
        
        // User.findByIdAndUpdate(req.params.id,data,(err,user) => {
        //     if(err)
        //     {
        //         res.status(400).json({
        //             msg: "invalid request"
        //         })
        //     }
        //     else
        //     {
        //         res.status(201).json(user);
        //     }
        // });
    }

    static deleteUser(req,res)
    {
        User.findByIdAndDelete(req.params.id,(err) => {
            if(err)
            {
                res.status(400).json({
                    msg: "invalid request"
                })
            }
            else
            {
                res.status(201).json({
                    msg: "delete success"
                });
            }
        });
    }
}

module.exports = UserController;