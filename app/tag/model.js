const mongoose = require("mongoose");

const categoryTag = mongoose.Schema({
  nama: {
    type: String,
    maxlength: [20, "Panjang miximal nama kategori 20 karakter"],
    minlength: [3, "Panjang manimal nama kategori 3 karakter "],
    required: [true, "kategori harus di isi"],
  },
});

module.exports = mongoose.model("Tag", categoryTag);
