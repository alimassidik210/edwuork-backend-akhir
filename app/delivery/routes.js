const router = require("express").Router();
const { police_check } = require("../../middlewares");
const addressController = require("./controller");

router.delete("/address/:id", addressController.destroy);
router.post(
  "/address",
  police_check("create", "DeliveryAddress"),
  addressController.store
);
router.put("/address", addressController.update);
router.get(
  "/address",
  police_check("view", "DeliveryAddress"),
  addressController.index
);

module.exports = router;
