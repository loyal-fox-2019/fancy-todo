const Usermodel = require('../models/usermodel')
const Bcrypt = require('../helper/hashpassword')
const jwt = require('jsonwebtoken')
const {OAuth2Client} = require('google-auth-library')

class User{
    static googlesignin(req,res,next){
        let temporary = null
        const client = new OAuth2Client(process.env.GOOGLE);
        async function verify() {
        const ticket = await client.verifyIdToken({
        idToken: req.body.idtoken,
        audience: process.env.GOOGLE,
        });
        const payload = ticket.getPayload();
        const userid = payload['sub'];
        temporary = payload
        
        return payload
        }
        verify()
        .then((data)=>{
            return Usermodel.findOne({
                email: data.email
            })
        })
        .then((data)=>{
            if(data === null){
                return Usermodel.create({
                    first_name: temporary.given_name,
                    last_name: temporary.family_name,
                    email: temporary.email,
                    password: process.env.GENPASSWORD
                })
            }
            return data
        })
        .then((data)=>{
            const payload = {userid: data._id}
            let token = jwt.sign(payload, process.env.SECRET)
            res.status(200).json({token})
        })
        .catch((err)=>{
            next()
        });
    }
    static signup(req,res,next){
        Usermodel.create(req.body)
        .then((data)=>{
            res.status(201).json(data)
        })
        .catch((err)=>{
            next()
        })
    }

    static signin(req, res, next){
        let userid = null
        Usermodel.findOne({
            email: req.body.email
        })
        .then((data)=>{
            if(data === null){
                res.status(400).json({message: 'Wrong email/password'})
            }else{
                userid = data['_id']
                return Bcrypt.compare(req.body.password, data.password)
            }
        })
        .then((status)=>{
            if(status){
                let token = jwt.sign({userid}, 'secret')
                res.json({token})
            } else {
                res.status(400).json({message: 'Wrong email/password'})
            }
        })
        .catch((err)=>{
            next()
        })
    }

}


module.exports = User