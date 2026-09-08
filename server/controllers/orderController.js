const Order = require("../models/Order");

const VALID_STATUSES = ["en_attente", "expediee", "livree"];

// @route  GET /api/admin/orders
// @access Admin
async function getOrders(req, res) {
  try {
    const { status, search } = req.query;
    const filter = {};

    if (status && VALID_STATUSES.includes(status)) {
      filter.status = status;
    }

    let query = Order.find(filter).populate("user", "name email").sort({ createdAt: -1 });
    let orders = await query;

    if (search) {
      const s = search.toLowerCase();
      orders = orders.filter(
        (o) =>
          o.user?.name?.toLowerCase().includes(s) ||
          o._id.toString().toLowerCase().includes(s)
      );
    }

    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
}

// @route  GET /api/admin/orders/:id
// @access Admin
async function getOrderById(req, res) {
  try {
    const order = await Order.findById(req.params.id).populate("user", "name email");
    if (!order) return res.status(404).json({ message: "Commande introuvable" });
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
}

// @route  PATCH /api/admin/orders/:id/status
// @access Admin
async function updateOrderStatus(req, res) {
  try {
    const { status } = req.body;

    if (!VALID_STATUSES.includes(status)) {
      return res.status(400).json({
        message: `Statut invalide. Valeurs acceptées : ${VALID_STATUSES.join(", ")}`,
      });
    }

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    ).populate("user", "name email");

    if (!order) return res.status(404).json({ message: "Commande introuvable" });
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
}

module.exports = { getOrders, getOrderById, updateOrderStatus };