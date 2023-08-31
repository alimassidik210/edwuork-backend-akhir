const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      minlength: [3, "panjang minimal 3 karakter"],
      required: [true, "Nama Makanan harus diisi"],
    },
    description: {
      type: String,
      maxlength: [100, "Panjang Deskripsi Maximal 1000 Karakter"],
    },
    price: {
      type: Number,
      default: 0,
    },
    image_url: {
      type: String,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
    tags: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tag",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
