const User = require("../models/User");
const Order = require("../models/Order");

// @route  GET /api/admin/users
// @access Admin
async function getUsers(req, res) {
  try {
    const { search } = req.query;
    const filter = { role: "client" };
    if (search) filter.name = { $regex: search, $options: "i" };

    const users = await User.find(filter).sort({ createdAt: -1 });

    // Ajoute le nombre de commandes de chaque utilisateur
    const usersWithOrderCount = await Promise.all(
      users.map(async (u) => {
        const orderCount = await Order.countDocuments({ user: u._id });
        return { ...u.toObject(), orders: orderCount };
      })
    );

    res.json(usersWithOrderCount);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
}

// @route  PATCH /api/admin/users/:id/block
// @access Admin
async function toggleBlockUser(req, res) {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "Utilisateur introuvable" });

    if (user.role === "admin") {
      return res.status(400).json({ message: "Impossible de bloquer un administrateur" });
    }

    user.status = user.status === "actif" ? "bloque" : "actif";
    await user.save();

    res.json({ _id: user._id, status: user.status });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
}

// @route  DELETE /api/admin/users/:id
// @access Admin
async function deleteUser(req, res) {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "Utilisateur introuvable" });

    if (user.role === "admin") {
      return res.status(400).json({ message: "Impossible de supprimer un administrateur" });
    }

    await user.deleteOne();
    res.json({ message: "Utilisateur supprimé" });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
}

module.exports = { getUsers, toggleBlockUser, deleteUser };