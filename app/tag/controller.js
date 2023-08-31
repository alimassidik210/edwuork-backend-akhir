const config = require("../config");
const Tag = require("./model");

const index = async (req, res, next) => {
  try {
    const result = await Tag.find();
    res.json({
      status: "success",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const view = async (req, res, next) => {
  try {
    const result = await Tag.findById(req.params.id);
    res.json({
      status: "success",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const store = async (req, res, next) => {
  try {
    const result = await Tag.create(req.body);
    res.json({
      status: "success",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const result = await Tag.findByIdUpdate(req.params.id, req.body);
    res.json({
      status: "success",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const destroy = async (req, res, next) => {
  try {
    const result = await Tag.findByIdRemove(req.params.id);
    res.json({
      status: "deleted",
      data: result,
    });
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
