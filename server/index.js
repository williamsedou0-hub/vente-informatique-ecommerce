const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const productRoutes = require("./routes/products");
const categoryRoutes = require("./routes/categories");

app.use("/api", productRoutes);
app.use("/api", categoryRoutes);

app.listen(5000, () => console.log("Serveur lancé sur le port 5000"));