import express from "express";
import prisma from "../prismaClient.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const products = await prisma.product.findMany();
    return res.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
