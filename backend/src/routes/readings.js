import express from 'express';
import { PrismaClient } from '@prisma/client';
import { generateReport } from '../services/report.js';

const router = express.Router();
const prisma = new PrismaClient();

// Create reading
router.post('/', async (req, res) => {
  try {
    const { birthDate, bloodType, testType, tarotCards, deviceId, userId } = req.body;
    const reportContent = generateReport({ birthDate, bloodType, testType, tarotCards });
    
    const reading = await prisma.reading.create({
      data: {
        userId,
        deviceId,
        birthDate: new Date(birthDate),
        bloodType,
        testType,
        tarotCards,
        reportContent
      }
    });
    res.json(reading);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get readings
router.get('/', async (req, res) => {
  try {
    const { userId, deviceId } = req.query;
    const readings = await prisma.reading.findMany({
      where: { OR: [{ userId }, { deviceId }] },
      orderBy: { createdAt: 'desc' }
    });
    res.json(readings);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default router;
