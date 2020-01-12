const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;

const hashPassword = require("../helpers/hashPassword");

const userSchema = new Schema({    
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    login_type: {
        type: String
    }
});

userSchema.pre('save',function(next) {
    this.password = hashPassword(this.password);
    User.countDocuments({
        username: this.username,
        _id: {
            $ne: this._id
        }
    },function(err,count) {
        if(!err)
        {
            if(count != 0)
            {
                next(new Error("username not available"));
            }
            else
            {
                next();
            }
        }
        else
        {
            next(new Error());
        }
    })
})

const User = mongoose.model("User",userSchema);

module.exports = User;