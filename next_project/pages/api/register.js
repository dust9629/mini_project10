import { connectDB } from "../../util/database";
import bcrypt from "bcryptjs";

export default async (req, res) => {
  if (req.method === "POST") {
    const { email, password, name, phoneNumber, address, zoneCode } = req.body;
    try {
      const { client, db } = await connectDB(); // client와 db를 구조 분해 할당

      const existingUser = await db.collection("users").findOne({ email });
      if (existingUser) {
        client.close();
        return res.status(409).json({ message: "이미 사용중인 이메일입니다." });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await db.collection("users").insertOne({
        email,
        password: hashedPassword,
        name,
        phoneNumber,
        address,
        zoneCode,
      });

      client.close();
      res.status(201).json({
        message: "회원가입이 완료되었습니다.",
        userId: user.insertedId,
      });
    } catch (error) {
      console.error("회원가입 실패 : ", error);
      client?.close();
      res
        .status(500)
        .json({ message: "Internal server error", error: error.toString() });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};
