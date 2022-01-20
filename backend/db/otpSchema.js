const mongoose = require('mongoose');
const otpSchema = new mongoose.Schema({
  
    email: {
        type: String,
        required: true,
        unique:true
    },
    code: {
        type: String,
        required: true
    },
    expirein: {
        type: Number,
        required: true
    },
   

})
module.exports = mongoose.model('Otp',otpSchema);


