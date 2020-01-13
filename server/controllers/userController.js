const User = require('../models/user')
const { generateToken } = require('../helpers/jwt')
const { checkPassword } = require('../helpers/bcrypt')
const { OAuth2Client } = require('google-auth-library');
const Group = require('../models/group')
let payload

class userController {
    static register(req,res,next) {
        User.create({
            name:req.body.name,
            email:req.body.email,
            password:req.body.password,
            todos:[]
        })
            .then(user=>{
                let token = generateToken({id:user._id})
                res.status(201).json({ user,token })
            })
            .catch(next)
    }
    
    static login(req,res,next) {
        User.findOne({ email: req.body.email })
            .populate('invitation')
            .then(user=>{
                if(user) {
                    if(checkPassword( req.body.password, user.password )) {
                        let token = generateToken({ id:user._id })
                        res.status(201).json({ user,token })
                    } else {
                        throw { name:400, message:`wrong password` }
                    }
                } else {
                    throw { name:404, message:`user with email ${req.body.email} not found.` }
                }
            })
            .catch(next)
    }

    static googleSignIn ( req,res,next ) {
        const client = new OAuth2Client(process.env.CLIENT_ID);
        client.verifyIdToken({
            idToken: req.body.token,
            audience: process.env.CLIENT_ID
        })
        .then( ticket => {
            payload = ticket.getPayload()
            return User.findOne({email: payload.email})
                    .populate('invitation')
        })
        .then( user => {
            if(user) return user
            else {
                User.create({
                    name: payload.name,
                    email: payload.email,
                    password: process.env.DEFAULT_PASSWORD
                })
            }
        })
        .then( user => {
            let token = generateToken({id:user._id})
            res.status(201).json({user,token})
        })
        .catch( next )
    }

    static handleInvitation ( req,res,next ) {
        if(req.query.accept == '1') {
            User.updateOne({_id:req.decoded.id},{
                $pull: { invitation: req.body.groupId }
            })
            .then( result => {
                return Group.updateOne({_id:req.body.groupId},{
                    $push: { members: req.decoded.id }
                })
            })
            .then( result => {
                res.status(201).json(result)
            })
        } else {
            User.updateOne({_id:req.decoded.id},{
                $pull: { invitation: req.body.groupId }
            })
            .then( result => {
                res.status(201).json(result)
            })
        }
    }
}

module.exports = userController