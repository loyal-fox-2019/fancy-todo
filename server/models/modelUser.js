const {Schema, model, models} = require('mongoose');
const {createBCryptHash} = require('../helpers/bCrypt');

const userSchema = new Schema(
    {
        // userName: {
        //     type: String,
        //     validate: {
        //         validator: function (userName) {
        //             return models.User.findOne({
        //                 userName: userName
        //             }).then(result => {
        //                 return !result;
        //             })
        //         },
        //         message: "username has been registered !!!"
        //     }
        // },
        email: {
            type: String,
            validate: [{
                validator: function (email) {
                    const emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
                    return emailRegex.test(email);
                },
                message: "is not a valid email!!!"
            }, {
                validator: function (email) {
                    return models.User.findOne({
                        email: email
                    }).then(result => {
                        return !result;
                    })
                },
                message: "email has been registered !!!"
            }]
        },
        password: {
            type: String,
            required: true
        },
        role: String
    }
);

userSchema.pre("save", function(next){
    this.password = createBCryptHash(this.password);
    next();
});

const User = model('User', userSchema);

module.exports = {
    User
};