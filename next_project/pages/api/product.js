import { connectDB } from "@/util/database";

export default async function handler(req, res) {
  const client = await connectDB();
  try {
    const db = client.db("boodle");
    const products = await db.collection("product").find().toArray();
    res.status(200).json(products);
  } catch (error) {
    console.error("Failed to fetch products", error);
    res.status(500).json({ message: "Failed to fetch products" });
  } finally {
    await client.close();
  }
}
