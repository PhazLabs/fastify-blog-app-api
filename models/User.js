import mongoose from "mongoose";

var validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

const { Schema } = mongoose;

const UserSchema = new Schema({
    username: String,
    firstName: String,
    lastName: String,
    email: {
        type: String,
        required: 'Email address is required',
        validate: [validateEmail, 'Please fill a valid email address'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    password: String,
    role: {
        type: String,
        default: 'user'
    }
})

const User = mongoose.model('User', UserSchema)

export default User