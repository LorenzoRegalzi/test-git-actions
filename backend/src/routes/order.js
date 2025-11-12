// server/routes/orders.ts
import express from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

router.post("/", async (req, res) => {
  try {
    const { userId, items } = req.body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: "Invalid order data" });
    }

    // Calcolo totale usando i prezzi reali dei prodotti dal DB
    let totalAmount = 0;
    const orderItemsData = [];

    

    for (const item of items) {
      const product = await prisma.product.findUnique({
        where: { id: item.productId },
      });

      if (!product) {
        return res.status(400).json({ error: `Product not found: ${item.id}` });
      }

      const price = product.price; // assume Decimal
      totalAmount += Number(price) * item.quantity;

      orderItemsData.push({
        productId: product.id,
        quantity: item.quantity,
        price: price,
      });
    }

    // Creazione ordine con i rispettivi items
    const order = await prisma.order.create({
      data: {
        userId: userId || null,
        totalAmount: totalAmount,
        items: {
          create: orderItemsData,
        },
      },
      include: { items: true },
    });

    res.json({ id: order.id, totalAmount: order.totalAmount, items: order.items });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
