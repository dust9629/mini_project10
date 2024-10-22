import { connectDB } from "./../../../util/database";
import { ObjectId } from "mongodb";
import jwt from "jsonwebtoken";

function generateOrderNumber() {
  const date = new Date();
  const components = [
    date.getFullYear(),
    date.getMonth() + 1, // 월은 0부터 시작하므로 1을 추가합니다.
    date.getDate(),
    date.getHours(),
    date.getMinutes(),
    date.getSeconds(),
    date.getMilliseconds(),
  ];
  const orderIdPart = components
    .map((component) => component.toString().padStart(2, "0"))
    .join("");
  return (
    "ORD-" +
    orderIdPart +
    Math.floor(Math.random() * 1000)
      .toString()
      .padStart(3, "0")
  );
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Authentication token is missing" });
  }

  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({ message: "Invalid token" });
    }
    console.error("Token verification error:", error);
    return res.status(500).json({ message: "Failed to verify token", error });
  }

  if (!decoded || !decoded.userId) {
    return res.status(401).json({ message: "Invalid token" });
  }

  const { items } = req.body;
  const { db } = await connectDB();
  const orderNumber = generateOrderNumber(); // 주문 번호 생성 로직

  try {
    const order = await db.collection("orders").insertOne({
      userId: new ObjectId(decoded.userId),
      items: items.map((item) => ({
        productId: new ObjectId(item.productId),
        quantity: item.quantity,
      })),
      orderNumber,
      orderDate: new Date(),
    });

    res.status(201).json({ success: true, orderNumber });
  } catch (error) {
    console.error("Error processing order:", error);
    res.status(500).json({ message: "Failed to process order", error });
  }
}
