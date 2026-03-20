import express from 'express';
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient();

const PLANS = {
  once:      { credits: 1,    amount: 1.9,  label: '单次购买' },
  pro:       { credits: 30,   amount: 9.9,  label: 'Pro月订阅' },
  unlimited: { credits: 9999, amount: 19.9, label: 'Unlimited月订阅' },
};

const PAYPAL_API = process.env.PAYPAL_MODE === 'live'
  ? 'https://api-m.paypal.com'
  : 'https://api-m.sandbox.paypal.com';

async function getPayPalToken() {
  const res = await fetch(`${PAYPAL_API}/v1/oauth2/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + Buffer.from(
        `${process.env.PAYPAL_CLIENT_ID}:${process.env.PAYPAL_SECRET}`
      ).toString('base64'),
    },
    body: 'grant_type=client_credentials',
  });
  const data = await res.json();
  return data.access_token;
}

// 创建 PayPal 订单
router.post('/create', async (req, res) => {
  const { type, userId } = req.body;
  const plan = PLANS[type];
  if (!plan) return res.status(400).json({ error: '无效的套餐类型' });

  try {
    const token = await getPayPalToken();
    const ppRes = await fetch(`${PAYPAL_API}/v2/checkout/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
      body: JSON.stringify({
        intent: 'CAPTURE',
        purchase_units: [{
          amount: { currency_code: 'USD', value: plan.amount.toFixed(2) },
          description: plan.label,
        }],
        application_context: {
          return_url: `${process.env.SITE_URL}/payment/success`,
          cancel_url: `${process.env.SITE_URL}/pricing`,
        }
      }),
    });
    const ppOrder = await ppRes.json();

    // 保存订单到数据库
    await prisma.order.create({
      data: { userId, type, amount: plan.amount, paypalOrderId: ppOrder.id, status: 'pending' }
    });

    res.json({ orderId: ppOrder.id, approveUrl: ppOrder.links.find(l => l.rel === 'approve')?.href });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: '创建订单失败' });
  }
});

// PayPal 支付成功回调
router.post('/capture', async (req, res) => {
  const { orderId } = req.body;
  try {
    const token = await getPayPalToken();
    const ppRes = await fetch(`${PAYPAL_API}/v2/checkout/orders/${orderId}/capture`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
    });
    const ppData = await ppRes.json();

    if (ppData.status === 'COMPLETED') {
      const order = await prisma.order.findFirst({ where: { paypalOrderId: orderId } });
      if (order) {
        const plan = PLANS[order.type];
        const isSubscription = order.type !== 'once';
        await prisma.order.update({ where: { id: order.id }, data: { status: 'paid' } });
        await prisma.user.update({
          where: { id: order.userId },
          data: {
            credits: { increment: plan.credits },
            plan: isSubscription ? order.type : undefined,
            planExpireAt: isSubscription ? new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) : undefined,
          }
        });
      }
      res.json({ success: true });
    } else {
      res.status(400).json({ error: '支付未完成' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: '支付确认失败' });
  }
});

// 获取用户次数
router.get('/credits/:userId', async (req, res) => {
  const user = await prisma.user.findUnique({ where: { id: req.params.userId } });
  if (!user) return res.status(404).json({ error: '用户不存在' });
  res.json({ credits: user.credits, plan: user.plan });
});

export default router;
