import { connectDB } from "../../util/database";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { serialize } from "cookie";

export default async (req, res) => {
  if (req.method === "POST") {
    const { email, password } = req.body;
    let client;

    try {
      const { client: dbClient, db } = await connectDB();
      client = dbClient;

      // email로 유저 찾기
      const user = await db.collection("users").findOne({ email });
      if (!user) {
        return res.status(404).json({ message: "유저를 찾을 수 없습니다." });
      }

      // Check if the provided password matches the stored hash
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      // Create a JWT token
      const token = jwt.sign(
        {
          userId: user._id,
          role: user.role,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "1h",
        }
      );

      // Serialize the token into a cookie
      const serialized = serialize("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development",
        maxAge: 3600,
        path: "/",
      });

      // Set the cookie in the response header
      res.setHeader("Set-Cookie", serialized);
      res.status(200).json({ token, userId: user._id, userRole: user.role });
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
