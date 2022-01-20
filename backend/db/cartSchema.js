const mongoose = require('mongoose');
const cartSchema = new mongoose.Schema({
    customer_id: {
        type: mongoose.Schema.Types.ObjectId,
                ref: "Profile",
                required: true
    },
    cartItems: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product",
                required: true
            },
            quantity: { type: Number, default: 1 },
            total_productcost: { type: Number, required: true }
        }
    ]
}, {timestamps:true});
module.exports = mongoose.model('Cart', cartSchema);