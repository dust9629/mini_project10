import { connectDB } from "@/util/database";

export default async function handler(req, res) {
  // const client = await connectDB();
  const { db, client } = await connectDB();
  // try {
  //   const db = client.db("boodle");
  //   const products = await db.collection("products").find().toArray();
  //   res.status(200).json(products);
  // } catch (error) {
  //   console.error("Failed to fetch products", error);
  //   res.status(500).json({ message: "Failed to fetch products" });
  // } finally {
  //   await client.close();
  // }
  try {
    const products = await db.collection("products").find().toArray(); // 'products' 컬렉션 사용 확인
    res.status(200).json(products);
  } catch (error) {
    console.error("Failed to fetch products", error);
    res.status(500).json({ message: "Failed to fetch products" });
  } finally {
    await client.close(); // client.close()를 정확히 호출
  }
}
