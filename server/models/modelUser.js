const {Schema, model, models} = require('mongoose');
const {createBCryptHash} = require('../helpers/bCrypt');

const userSchema = new Schema(
    {
        email: {
            type: String,
            required: true,
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
            required: true,
            minlength: 8,
            maxlength: 30
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