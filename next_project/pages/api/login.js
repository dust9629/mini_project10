import { connectDB } from "../../util/database";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { serialize } from "cookie";

export default async (req, res) => {
  if (req.method === "POST") {
    const { email, password } = req.body;
    let client;

    try {
      // Connect to the database and destructure client and db from the result
      const { client: dbClient, db } = await connectDB();
      client = dbClient; // Assign the dbClient to client for proper closure in the finally block

      // Find the user by email
      const user = await db.collection("users").findOne({ email });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
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
        "your_jwt_secret",
        {
          expiresIn: "1h",
        }
      );

      // Serialize the token into a cookie
      const serialized = serialize("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development", // Use secure cookies if not in development
        maxAge: 3600, // 1 hour in seconds
        path: "/", // Cookie valid for all paths
      });

      // Set the cookie in the response header
      res.setHeader("Set-Cookie", serialized);
      res.status(200).json({ token, userId: user._id, userRole: user.role });
    } catch (error) {
      console.error("Error during login:", error);
      res.status(500).json({ message: "Internal server error" });
    } finally {
      // Ensure the database client is closed
      if (client) {
        client.close();
      }
    }
  } else {
    // Respond with method not allowed if not a POST request
    res.setHeader("Allow", ["POST"]);
    res.status(405).end("Method Not Allowed");
  }
};
