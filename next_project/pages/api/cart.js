// next_project/pages/api/cart.js
import { connectDB } from "./../../util/database";
import jwt from "jsonwebtoken";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Unauthorized access" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { db } = await connectDB();
    const cartItems = await db
      .collection("cart")
      .find({ userId: decoded.userId })
      .toArray();

    if (!cartItems) {
      return res.status(404).json({ message: "카트에 담긴 상품이 없습니다." });
    }

    res.status(200).json({ cartItems });
  } catch (error) {
    console.error("Error retrieving cart items:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
