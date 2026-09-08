import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import ordersRouter from "./routes/orders.js";
import paymentRouter from "./routes/payment.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "API TechStore en ligne 🚀" });
});

app.use("/api/orders", ordersRouter);
app.use("/api/payment", paymentRouter);

const PORT = process.env.PORT || 5000;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`✅ Serveur backend démarré sur http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("❌ Impossible de se connecter à MongoDB :", error.message);
    process.exit(1);
  });