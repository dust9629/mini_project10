import { connectDB } from "../../util/database";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { serialize } from "cookie";

export default async (req, res) => {
  if (req.method === "POST") {
    const { email, password } = req.body;
    let client; // 여기로 옮김

    try {
      const { client: dbClient, db } = await connectDB();
      client = dbClient;

      const user = await db.collection("users").findOne({ email });
      if (!user) {
        client.close();
        return res.status(404).json({ message: "User not found" });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        client.close();
        return res.status(401).json({ message: "Invalid credentials" });
      }

      const token = jwt.sign({ userId: user._id }, "your_jwt_secret", {
        expiresIn: "1h",
      });

      const serialized = serialize("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development",
        maxAge: 60 * 60 * 1, // 1 hour
        path: "/",
      });

      res.setHeader("Set-Cookie", serialized);
      res.status(200).json({ token, userId: user._id });
    } catch (error) {
      console.error("Error during login:", error);
      res.status(500).json({ message: "Internal server error" });
    } finally {
      if (client) {
        client.close();
      }
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end("Method Not Allowed");
  }
};
