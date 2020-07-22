const express = require("express");
const router = express.Router();

router.get("/", function (req, res) {
  res.send("👀🤷‍♂️");
});
router.use("/proxy", require("./proxy.js"));

module.exports = router;
