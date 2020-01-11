const uniqueValidator = require('mongoose-unique-validator')
const { hash } = require('../helpers/bcrypt')
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Nama harus diisi'],
        minlength: [4, 'Nama minimal 4 huruf'],
        maxlength: [10, 'Nama maksimal 10 huruf'],
        unique: true,
        validate: {
            validator: function (v) {
                return User.findOne({ name: v })
                    .then((user) => { if (user) return false })
            },
            message: "Name has been used"
        }
    },
    email: {
        type: String,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Email tidak valid'],
        required: [true, 'email harus diisi'],
        unique: true,
        validate: {
            validator: function (v) {
                return User.findOne({ email: v })
                    .then((user) => { if (user) return false })
            },
            message: "Email has benn used"
        }
    },
    password: {
        type: String,
        required: [true, 'Password harus diisi']
    },
    invitation: [{ type: Schema.Types.ObjectId, ref: 'Project' }]
})

UserSchema.plugin(uniqueValidator, { message: '{PATH} sudah terpakai, Silahkan login menggunakan {PATH} tersebut.' })

UserSchema.pre('save', function (next) {
    let regex = /[\!\@\#\$\%\^\&\*\)\(\+\=\.\<\>\{\}\[\]\:\;\'\"\|\~\`\_\-]/g
    if (this.name.match(regex)) next({ status: 400, msg: 'nama tidak boleh mengandung special character' })

    this.password = hash(this.password)
    next()
})

const User = mongoose.model('User', UserSchema)

module.exports = User