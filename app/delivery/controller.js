const { subject } = require("@casl/ability");
const DeliveryAddress = require("./model");
const { policyFor } = require("../../utils");

const index = async (req, res, next) => {
  try {
    let { skip = 0, limit = 10 } = req.query;
    let count = await DeliveryAddress.find({
      user: req.user._id,
    }).countDocument();
    const address = await DeliveryAddress.find({ user: req.user._id })
      .skip(parseInt(skip))
      .limit(parseInt(limit))
      .sort("-createdAt");
    res.status(200).json({
      data: address,
      count,
    });
  } catch (err) {
    if (err && err.name === "validationError") {
      return res.json({
        error: 1,
        message: err.message,
        fields: err.errors,
      });
    }
    next(err);
  }
};

const store = async (req, res, next) => {
  try {
    let payload = req.body;
    let user = req.user;
    console.log(payload);
    console.log(user);
    let address = new DeliveryAddress({ ...payload, user: user._id });
    console.log(address);
    await address.save();
    return res.status(201).json(address);
  } catch (err) {
    if (err && err.name === "validationError") {
      return res.json({
        error: 1,
        message: err.message,
        fields: err.errors,
      });
    }
    next(err);
  }
};

const update = async (req, res, next) => {
  try {
    let { _id, ...payload } = req.body;
    const address = await DeliveryAddress.findById(req.params.id);
    let subjectAddress = subject("DeliveryAddress", {
      ...address,
      user_id: address.user,
    });
    let policy = policyFor(req.user);
    if (!policy.can("update", subjectAddress)) {
      return res.json({
        error: 1,
        message: "You are not allowed to modify this resource",
      });
    }
    address = await DeliveryAddress.findByIdAndUpdate(req.params.id, payload, {
      new: true,
    });
    res.status(201).json(address);
  } catch (error) {
    if (err && err.name === "validationError") {
      return res.json({
        error: 1,
        message: err.message,
        fields: err.errors,
      });
    }
    next(error);
  }
};

const destroy = async (req, res, next) => {
  try {
    const address = await DeliveryAddress.findById(req.params.id);
    let subjectAddress = subject("DeliveryAddress", {
      ...address,
      user_id: address.user,
    });
    let policy = policyFor(req.user);
    if (!policy.can("delete", subjectAddress)) {
      return res.json({
        error: 1,
        message: "You are not allowed to modify this resource",
      });
    }
    address = await DeliveryAddress.findByIdAndDelete(req.params.id);
    res.status(200).json(address);
  } catch (error) {
    if (err && err.name === "validationError") {
      return res.json({
        error: 1,
        message: err.message,
        fields: err.errors,
      });
    }
    next(error);
  }
};

module.exports = {
  store,
  index,
  update,
  destroy,
};
