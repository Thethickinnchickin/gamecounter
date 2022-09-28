const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

const UserSchema = new Schema({
    username: String,
    password: { type: String, required: true},
})


UserSchema.pre('save', function(next) {
    let user = this;
    if (this.isModified('password') || this.isNew) {
        bcrypt.genSalt(10, function(err, salt) {
            if (err) {
                return next(err)
            }
            bcrypt.hash(user.password, salt, null, function(err, hash) {
                if (err) {
                    return next(err)
                }

                user.password = hash;
                next();
            })
        })

    } else {
        return next();
    }
})

//Comparing inputted login password with users password for authentication
//returns boolean
//true if password matches 
//false if password doesn't match 
UserSchema.methods.comparePassword = function(password, next) {
    let user = this;
    return bcrypt.compareSync(password, user.password)
}

module.exports = mongoose.model("User", UserSchema);