const products = require("../data/products.json");

exports.getAllProducts = (req, res) => {
  const { category, brand, minPrice, maxPrice, search } = req.query;
  let result = [...products];

  if (category) result = result.filter((p) => p.category === category);
  if (brand) result = result.filter((p) => p.brand === brand);
  if (minPrice) result = result.filter((p) => p.price >= Number(minPrice));
  if (maxPrice) result = result.filter((p) => p.price <= Number(maxPrice));
  if (search) result = result.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()));

  res.json(result);
};

exports.getProductById = (req, res) => {
  const product = products.find((p) => p.id === req.params.id);
  if (!product) return res.status(404).json({ message: "Produit introuvable" });
  res.json(product);
};