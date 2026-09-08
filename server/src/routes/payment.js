import { Router } from "express";
import Stripe from "stripe";

const router = Router();

const FCFA_TO_EUR = 655;

router.post("/create-checkout-session", async (req, res) => {
  try {
    // Stripe est créé ICI, au moment de la requête, pas au chargement du fichier
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

    const { items } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ error: "Panier vide." });
    }

    const line_items = items.map((item) => ({
      price_data: {
        currency: "eur",
        product_data: { name: item.name },
        unit_amount: Math.round((item.price / FCFA_TO_EUR) * 100),
      },
      quantity: item.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items,
      mode: "payment",
      success_url: `${process.env.CLIENT_URL}/confirmation?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.CLIENT_URL}/checkout`,
    });

    res.json({ url: session.url });
  } catch (error) {
    console.error("Erreur Stripe :", error);
    res.status(500).json({ error: "Erreur lors de la création de la session de paiement." });
  }
});

export default router;