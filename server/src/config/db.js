import mongoose from "mongoose";

export async function connectDB() {
  const uri = process.env.MONGO_URI;

  if (!uri) {
    throw new Error(
      "MONGO_URI manquant. Vérifiez que le fichier .env existe et contient MONGO_URI."
    );
  }

  await mongoose.connect(uri);
  console.log("✅ Connecté à MongoDB");
}