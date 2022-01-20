const mongoose = require('mongoose');
const addSchema = new mongoose.Schema({
  customer_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Profile",
    required: true
  },
  address: {
    type: String,
    required: true
  },
  pincode: {
    type: Number,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  state: {
    type: String,
    required: true
  },
  country: {
    type: String,
    required: true
  },
  isdeliveryaddress: {
    type: String
  },
  created_at: {
    type: Date,
    default: Date.now
  }

})
module.exports = mongoose.model('Address', addSchema);



