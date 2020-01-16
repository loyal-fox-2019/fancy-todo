const jwt = require('jsonwebtoken');
const User = require('../models/user');

function generateTokenGoogle(req,res,next)
{
    //console.log("user try login")
    User.findOne({username: req.body.username})
    .then((user) => {
        if(!user)
        {
            User.create({
                username: req.body.username,
                login_type: "google"
            })
            .then((user) => {            
                res.status(201).send({
                    token: jwt.sign({
                        id: user._id,
                        username: user.username
                    },process.env.JWT_SECRET)
                })
            })
            .catch((err) => {
                console.log(err)
                res.status(400).json({
                    msg: "invalid request"
                })
            });
        }
        else
        {            
            res.status(201).send({
                token: jwt.sign({
                    id: user._id,
                    username: user.username
                },process.env.JWT_SECRET)
            })
        }
    })
    .catch(()=> {
        res.status(400).json({
            error: "Wrong username/password"
        });
    });

}

module.exports = generateTokenGoogle;