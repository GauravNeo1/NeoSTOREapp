const mongoose = require('mongoose');
const proSchema = new mongoose.Schema({
  product_name: {
    type: String,
    required: true,
  },
  product_image: {
    type: String,
    required: true,
  },
  product_desc: {
    type: String,
    required: true,
  },
  product_rating: {
    type: Array,
    "default": []
  },
  product_producer: {
    type: String,
    required: true,
  },
  product_cost: {
    type: Number,
    required: true,
  },
  product_stock: {
    type: Number,
    required: true,
  },
  product_dimension: {
    type: String,
    required: true,
  },
  product_material: {
    type: String,
    required: true,
  },
  product_subimages: {
    type: Array,
    "default": []
  },
  color_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Color"
  },
  category_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category"
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

proSchema.index({
  product_name:'text',
  product_desc:'text'
},{
  weights:{
    product_name:5,
    product_desc:1
  }
})
module.exports = mongoose.model('Product', proSchema);

