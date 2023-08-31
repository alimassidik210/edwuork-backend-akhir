const CartItem = require("../cart-item/model");
const DeliveryAddress = require("../delivery/model");
const Order = require("../order/model");
const { Types } = require("mongoose");
const Orderitem = require("../order-item/model");

const store = async (req, res, next) => {
  try {
    let { delivery_fee, delivery_address } = req.body;
    let items = await CartItem.find({ user: req.user._id }).populate("product");
    if (!items) {
      return res.json({
        error: 1,
        message: `You're not create order because you have not items in cart`,
      });
    }
    let address = await DeliveryAddress.findById(delivery_address);
    let order = new Order({
      _id: new Types.ObjectId(),
      status: "waiting_payment",
      delivery_fee: delivery_fee,
      delivery_address: {
        provinsi: address.provinsi,
        kabupaten: address.kabupaten,
        kecamatan: address.kecamatan,
        kelurahan: address.kelurahan,
        detail: address.detail,
      },
      user: req.user._id,
    });
    let orderitems = await Orderitem.insertMany(
      items.map((item) => ({
        ...item,
        name: item.product.name,
        qty: parseInt(item.qty),
        price: parseInt(item.product.price),
        order: order._id,
        product: item.product._id,
      }))
    );
    orderitems.forEach((item) => order.order_items.push(item));
    order.save();
    await CartItem.deleteMany({ user: req.user._id });
    return res.status(201).json(order);
  } catch (error) {
    if (error && error.name === "ValidationError") {
      return res.json({
        error: 1,
        message: error.message,
        fields: error.errors,
      });
    }
    next(error);
  }
};

const index = async (req, res, next) => {
  try {
    let { skip = 0, limit = 10 } = req.query;
    let count = await Order.find({ user: req.user._id }).countDocuments();
    let orders = await Order.find({ user: req.user._id })
      .skip(parseInt(skip))
      .limit(parseInt(limit))
      .populate("order_items")
      .sort("-createdAt");
    return res.status(200).json({
      data: orders.map((order) => order.toJSON({ virtuals: true })),
      count,
    });
  } catch (error) {
    if (error && error.name === "ValidationError") {
      return res.status(400).json({
        error: 1,
        message: error.message,
        fields: error.errors,
      });
    }
    next(error);
  }
};

module.exports = {
  store,
  index,
};
