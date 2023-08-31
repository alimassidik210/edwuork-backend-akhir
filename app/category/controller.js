const config = require("../config");
const Category = require("./model");

const index = async (req, res, next) => {
  try {
    const result = await Category.find();
    res.send(result);
  } catch (error) {
    next(error);
  }
};

const view = async (req, res, next) => {
  try {
    const result = await Category.findById(req.params.id);
    res.send(result);
  } catch (error) {
    next(error);
  }
};

const store = async (req, res, next) => {
  try {
    const result = await Category.create(req.body);
    res.send(result);
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const result = await Category.findByIdUpdate(req.params.id, req.body);
    res.send(result);
  } catch (error) {
    next(error);
  }
};

const destroy = async (req, res, next) => {
  try {
    const result = await Category.findByIdRemove(req.params.id);
    res.send(result);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  index,
  view,
  store,
  update,
  destroy,
};
