const Product = require("../models/Product");

// @route  GET /api/admin/products
// @access Admin
async function getProducts(req, res) {
  try {
    const { search } = req.query;
    const filter = search ? { name: { $regex: search, $options: "i" } } : {};
    const products = await Product.find(filter).sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
}

// @route  GET /api/admin/products/:id
// @access Admin
async function getProductById(req, res) {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Produit introuvable" });
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
}

// @route  POST /api/admin/products
// @access Admin
async function createProduct(req, res) {
  try {
    const { name, category, price, stock, img, description } = req.body;

    if (!name || !category || price == null) {
      return res.status(400).json({ message: "Nom, catégorie et prix sont requis" });
    }

    const product = await Product.create({
      name,
      category,
      price,
      stock: stock ?? 0,
      img,
      description,
    });

    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
}

// @route  PUT /api/admin/products/:id
// @access Admin
async function updateProduct(req, res) {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Produit introuvable" });

    const { name, category, price, stock, img, description } = req.body;

    if (name !== undefined) product.name = name;
    if (category !== undefined) product.category = category;
    if (price !== undefined) product.price = price;
    if (stock !== undefined) product.stock = stock;
    if (img !== undefined) product.img = img;
    if (description !== undefined) product.description = description;

    const updated = await product.save();
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
}

// @route  PATCH /api/admin/products/:id/stock
// @access Admin
async function updateStock(req, res) {
  try {
    const { stock } = req.body;
    if (stock == null || stock < 0) {
      return res.status(400).json({ message: "Valeur de stock invalide" });
    }

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { stock },
      { new: true }
    );

    if (!product) return res.status(404).json({ message: "Produit introuvable" });
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
}

// @route  DELETE /api/admin/products/:id
// @access Admin
async function deleteProduct(req, res) {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: "Produit introuvable" });
    res.json({ message: "Produit supprimé" });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
}

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  updateStock,
  deleteProduct,
};