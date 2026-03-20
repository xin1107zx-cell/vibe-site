import express from 'express';
import { PrismaClient } from '@prisma/client';
import { generateReport } from '../services/report.js';
import { generateReportEn } from '../services/report-en.js';

const router = express.Router();
const prisma = new PrismaClient();

// Create reading
router.post('/', async (req, res) => {
  try {
    const { birthDate, bloodType, testType, tarotCards, deviceId, userId, language } = req.body;

    // 检查次数
    if (userId) {
      const user = await prisma.user.findUnique({ where: { id: userId } });
      if (!user) return res.status(404).json({ error: '用户不存在' });
      if (user.credits <= 0) return res.status(403).json({ error: 'NO_CREDITS', message: '次数已用完，请购买更多次数' });
      await prisma.user.update({ where: { id: userId }, data: { credits: { decrement: 1 } } });
    }

    const reportFn = language === 'en' ? generateReportEn : generateReport;
    const reportContent = reportFn({ birthDate, bloodType, testType, tarotCards });
    const reading = await prisma.reading.create({
      data: {
        userId,
        deviceId,
        birthDate: new Date(birthDate),
        bloodType,
        testType,
        tarotCards: JSON.stringify(tarotCards),
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
