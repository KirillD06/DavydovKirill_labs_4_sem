const express = require("express");
const stocksController = require("../controllers/stocksController");

const router = express.Router();

router.get("/", stocksController.getAllStocks);
router.post("/", stocksController.createStock);
router.put("/:id", stocksController.replaceStock);
router.get("/:id", stocksController.getStockById);
router.patch("/:id", stocksController.updateStock);
router.delete("/:id", stocksController.deleteStock);

module.exports = router;
