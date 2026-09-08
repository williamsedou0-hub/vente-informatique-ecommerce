import mongoose from "mongoose";

export async function connectDB() {
  const uri = process.env.MONGO_URI;

  if (!uri) {
    throw new Error("La variable MONGO_URI est manquante dans le fichier .env.");
  }

  await mongoose.connect(uri);
  console.log("MongoDB connecté ✅");
}
