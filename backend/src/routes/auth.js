import { Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const router = Router();

const users = []; // esempio in memoria — poi potrai usare un DB

router.post("/register", async (req, res) => {
  const { email, password } = req.body;
  if (users.find(u => u.email === email))
    return res.status(400).json({ error: "User already exists" });
  const hash = await bcrypt.hash(password, 10);
  users.push({ email, password: hash });
  res.status(201).json({ message: "User registered" });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email);
  if (!user) return res.status(400).json({ error: "Invalid credentials" });
  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(400).json({ error: "Invalid credentials" });
  const token = jwt.sign({ email }, process.env.JWT_SECRET || "secret", { expiresIn: "1h" });
  res.json({ token });
});

export default router;
