const mongoose = require('mongoose');
const orderSchema = new mongoose.Schema({
    customer_id: {
        type: mongoose.Schema.Types.ObjectId,
                ref: "Profile",
                required: true
    },
    delivery_address:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Address",
        required: true
    },
   
    orderItems: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product",
                required: true
            },
            quantity: { type: Number, default: 1 },
            total_productcost: { type: Number, required: true }
        }
    ],
    
    totalamount:{
        type: Number,
        required: true
    },
    paymentBy:{
        type: String,
        required: true
    },
    isDeliverd:{
        type: String,
        required: true
    },
   

}, {timestamps:true});
module.exports = mongoose.model('Order', orderSchema);