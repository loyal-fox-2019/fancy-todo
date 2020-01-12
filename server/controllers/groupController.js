const Group = require('../models/group')
const User = require('../models/user')

class groupController {
    static create( req,res,next ) {
        Group.create({
            members : [req.decoded.id],
            name : req.body.name,
            creator : req.decoded.id,
            todos : []
        })
            .then(group => res.status(201).json(group))
            .catch(next)
    }

    static getCreatorGroup( req,res,next ) {
        Group.find({members : req.decoded.id})
            .populate('members')
            .populate('todos')
            .then(groups => res.status(200).json(groups))
            .catch(next)
    }

    static getOneGroup( req,res,next ) {
        Group.findOne({_id:req.params.id})
        .populate('members')
        .populate('creator')
        .populate('todos')
         .then( group => res.status(200).json(group))
         .catch( next )
    }

    // static addMember( req,res,next ) {
    //     if(req.body.id === req.decoded.id) {
    //         next({ name: 400, message: `You're the owner of this group.` })
    //     } else {
    //         if(req.body.id === '' || !req.body.id){
    //             next({ name: 400, message: `Please input valid user id.` })
    //         } else {
    //             Group.updateOne({_id:req.query.id},{
    //                 $push : { members:req.body.id }
    //             })
    //             .then(result => res.status(201).json(result))
    //             .catch(next)
    //         }
    //     }
    // }
    
    static deleteGroup( req,res,next ) {
        Group.deleteOne({_id:req.query.id})
            .then(result => res.status(201).json(result))
            .catch(next)
    }

    static sendInvitation ( req,res,next ) {
        User.updateOne({ email: req.body.email },{
            $push : { invitation: req.body.groupId }
        })
            .then( result => res.status(201).json(result) )
            .catch( next )
    }
}

module.exports = groupController