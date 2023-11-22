const router = require("express").Router();

router.use("/product", require("./product"));
router.use("/image", require("./imageData"));
router.use("/orders", require("./orders"));
router.use("/banner", require("./banner"));

module.exports = router;
