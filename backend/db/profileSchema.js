const mongoose = require('mongoose');
const profileSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true,
    },
    last_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique:true
    },
    gender: {
        type: String,
        required: true
    },
    dob: {
        type: String,
        required: true
    },
    profile_image: {
        type: String
    },
    password: {
        type: String,
        required: true
    }

})
module.exports = mongoose.model('Profile', profileSchema);


