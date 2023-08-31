const { police_check } = require("../../middlewares");

const router = require("express").Router();
const cartController = require("./controller");

router.put("/carts", police_check("update", "Cart"), cartController.update);
router.get("/carts", police_check("read", "Cart"), cartController.index);

module.exports = router;
