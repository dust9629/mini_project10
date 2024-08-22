import { connectDB } from "@/util/database";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { brand, prd_name, prd_price, categories, gift_type } = req.body;
    const client = await connectDB();
    const db = client.db("boodle");

    try {
      const result = await db.collection("product").insertOne({
        brand,
        prd_name,
        prd_price,
        categories,
        gift_type,
      });
      res.status(200).json({ message: "Product added successfully", result });
    } catch (error) {
      console.error("Failed to add product", error);
      res.status(500).json({ message: "Failed to add product" });
    } finally {
      await client.close();
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
