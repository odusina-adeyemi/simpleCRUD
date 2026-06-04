const mongoose = require("mongoose");
const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Product name is required"],
      unique: true,
      trim: true,
    },
    quantity: {
      type: Number,
      required: [true, "Product quantity is required"],
      default: 0,
    },
    price: {
      type: Number,
      required: [true, "Product price is required"],
      default: 0,
    },

    image: {
      type: String,
      require: true,
      default:
        "https://agrimart.in/index.php/home/vendor_profile/get_slider/",
    },
  },
  {
    timestamps: true, 
  },
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;