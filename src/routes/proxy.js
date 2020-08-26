const express = require("express");
const router = express.Router();
const proxy = require("../controllers/proxy");
/**
 * /api/proxy/:
 */
router.get("/search", proxy.search);
router.get("/latest", proxy.latest);
router.get("/detail/:id", proxy.detail);
router.get("/episode/:id", proxy.episode);
router.get("/episodes/:id", proxy.episodes);

module.exports = router;
