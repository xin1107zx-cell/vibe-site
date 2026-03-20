import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient();

// Google Login
router.post('/google', async (req, res) => {
  try {
    const { token } = req.body;
    const payload = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
    
    let user = await prisma.user.findUnique({ where: { email: payload.email } });
    if (!user) {
      user = await prisma.user.create({
        data: {
          email: payload.email,
          name: payload.name || payload.email,
          avatar: payload.picture || null,
          credits: 3,
          plan: 'free'
        }
      });
    } else if (user.credits === null || user.credits === undefined) {
      // 旧用户补充 credits
      user = await prisma.user.update({
        where: { id: user.id },
        data: { credits: 3, plan: 'free', name: payload.name || user.name, avatar: payload.picture || user.avatar }
      });
    }
    
    const jwtToken = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);
    res.json({ token: jwtToken, user: { id: user.id, email: user.email, name: user.name, avatar: user.avatar, credits: user.credits, plan: user.plan } });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Register
router.post('/register', async (req, res) => {
  try {
    const { email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { email, password: hashedPassword }
    });
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);
    res.json({ token, user: { id: user.id, email: user.email } });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || !await bcrypt.compare(password, user.password)) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);
    res.json({ token, user: { id: user.id, email: user.email } });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default router;
