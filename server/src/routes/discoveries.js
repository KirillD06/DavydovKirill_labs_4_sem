const express = require("express");
const controller = require("../controllers/discoveriesController");

const router = express.Router();

router.get("/", controller.getAllDiscoveries);
router.post("/", controller.createDiscovery);
router.get("/:id", controller.getDiscoveryById);
router.patch("/:id", controller.patchDiscovery);
router.put("/:id", controller.putDiscovery);
router.delete("/:id", controller.deleteDiscovery);

module.exports = router;
