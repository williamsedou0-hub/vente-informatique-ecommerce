const Product = require("../models/Product");
const Order = require("../models/Order");
const User = require("../models/User");

// @route  GET /api/admin/dashboard
// @access Admin
async function getDashboardStats(req, res) {
  try {
    const [products, orders, users] = await Promise.all([
      Product.find(),
      Order.find(),
      User.find({ role: "client" }),
    ]);

    const lowStockCount = products.filter((p) => p.stock <= 5).length;
    const revenue = orders.reduce((sum, o) => sum + o.total, 0);
    const pendingOrders = orders.filter((o) => o.status === "en_attente").length;
    const activeUsers = users.filter((u) => u.status === "actif").length;

    const ordersByStatus = {
      en_attente: orders.filter((o) => o.status === "en_attente").length,
      expediee: orders.filter((o) => o.status === "expediee").length,
      livree: orders.filter((o) => o.status === "livree").length,
    };

    res.json({
      products: { total: products.length, lowStock: lowStockCount },
      orders: { total: orders.length, pending: pendingOrders, byStatus: ordersByStatus },
      users: { total: users.length, active: activeUsers },
      revenue,
    });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
}

module.exports = { getDashboardStats };