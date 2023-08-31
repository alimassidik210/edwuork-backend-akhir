const router = require("express").Router();
const tagController = require("./controller");
const { police_check } = require("../../middlewares");

router.get("/tag", tagController.index);
router.get("/tag/:id", tagController.view);
router.post("/tag", police_check("create", "Tag"), tagController.store);
router.put("/tag/:id", police_check("update", "Tag"), tagController.update);
router.delete("/tag", police_check("delete", "Tag"), tagController.destroy);

module.exports = router;
