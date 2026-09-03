import { Order } from "../models/Order.js";

export async function createOrder(req, res) {
  try {
    const { items, shipping } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ error: "Le panier est vide." });
    }
    if (!shipping) {
      return res.status(400).json({ error: "Informations de livraison manquantes." });
    }

    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const order = await Order.create({ items, shipping, total, status: "confirmed" });

    res.status(201).json(order);
  } catch (error) {
    console.error("Erreur création commande :", error);
    res.status(500).json({ error: "Erreur serveur lors de la création de la commande." });
  }
}

export async function getOrderById(req, res) {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ error: "Commande introuvable." });
    }
    res.json(order);
  } catch (error) {
    console.error("Erreur récupération commande :", error);
    res.status(500).json({ error: "Erreur serveur." });
  }
}

export async function getAllOrders(req, res) {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    console.error("Erreur récupération commandes :", error);
    res.status(500).json({ error: "Erreur serveur." });
  }
}