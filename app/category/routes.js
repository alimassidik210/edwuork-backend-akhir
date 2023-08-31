const router = require("express").Router();
const categoryController = require("./controller");
const { police_check } = require("../../middlewares");

router.get("/category", categoryController.index);
router.get(
  "/category/:id",
  police_check("create", "Category"),
  categoryController.view
);
router.post("/category", categoryController.store);
router.put(
  "/category/:id",
  police_check("update", "Category"),
  categoryController.update
);
router.delete(
  "/category/:id",
  police_check("delete", "Category"),
  categoryController.destroy
);

module.exports = router;
