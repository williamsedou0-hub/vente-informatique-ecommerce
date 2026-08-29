const express = require("express");
const router = express.Router();
const products = require("../data/products.json");

router.get("/categories", (req, res) => {
  const categories = [...new Set(products.map((p) => p.category))];
  res.json(categories);
});

module.exports = router;