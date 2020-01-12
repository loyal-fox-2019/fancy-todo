const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user');

function generateToken(req,res)
{
    //console.log("user try login")
    User.findOne({username: req.body.username})
    .then((user) => {
        if(!user)
        {
            res.status(400).json({
                error: "Wrong username/password"
            });
        }
        else if(bcrypt.compareSync(req.body.password,user.password))
        {            
            res.status(201).send({
                token: jwt.sign({
                    id: user._id,
                    username: user.username
                },process.env.JWT_SECRET)
            })
        }
        else
        {
            res.status(400).json({
                error: "Wrong username/password"
            });
        }
    })
    .catch(()=> {
        res.status(400).json({
            error: "Wrong username/password"
        });
    });

}

module.exports = generateToken;