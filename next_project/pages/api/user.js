import { connectDB } from "../../util/database";
import { ObjectId } from "mongodb"; // ObjectId를 import합니다.
import jwt from "jsonwebtoken";

export default async (req, res) => {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    const decoded = jwt.verify(token, "your_jwt_secret");
    const userId = decoded.userId;

    const { client, db } = await connectDB();
    const user = await db
      .collection("users")
      .findOne({ _id: new ObjectId(userId) }); // userId를 ObjectId로 변환합니다.

    if (!user) {
      client.close();
      return res.status(404).json({ message: "User not found" });
    }

    client.close();
    res.status(200).json({ name: user.name, email: user.email });
  } catch (error) {
    console.error("Error fetching user data:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
