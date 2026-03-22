import { useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import NavBar from '../components/NavBar';

// 从环境变量读取 PayPal Client ID（沙箱/正式由 VITE_PAYPAL_MODE 控制）
const PAYPAL_CLIENT_ID = import.meta.env.VITE_PAYPAL_CLIENT_ID || '';

function PayPalButton({ plan, userId, onSuccess }) {
  const containerRef = useRef(null);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!PAYPAL_CLIENT_ID) {
      setError('PayPal Client ID 未配置，请检查 .env 文件');
      return;
    }
    // 防止重复加载同一个 client-id 的 SDK
    if (window.paypal) { setLoaded(true); return; }
    const existingScript = document.querySelector('script[data-paypal-sdk]');
    if (existingScript) {
      existingScript.addEventListener('load', () => setLoaded(true));
      return;
    }
    const script = document.createElement('script');
    script.src = `https://www.paypal.com/sdk/js?client-id=${PAYPAL_CLIENT_ID}&currency=USD`;
    script.setAttribute('data-paypal-sdk', 'true');
    script.onload = () => setLoaded(true);
    script.onerror = () => setError('PayPal SDK 加载失败，请检查网络或 Client ID');
    document.body.appendChild(script);
  }, []);

  useEffect(() => {
    if (!loaded || !containerRef.current) return;
    containerRef.current.innerHTML = '';
    window.paypal.Buttons({
      createOrder: async () => {
        const res = await fetch('/api/payment/create', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ type: plan.id, userId }),
        });
        const data = await res.json();
        if (!data.orderId) throw new Error(data.error || '创建订单失败');
        return data.orderId;
      },
      onApprove: async (data) => {
        const res = await fetch('/api/payment/capture', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ orderId: data.orderID }),
        });
        const result = await res.json();
        if (result.success) onSuccess(plan);
        else setError('支付确认失败，请联系客服');
      },
      onError: (err) => {
        console.error('PayPal error:', err);
        setError('PayPal 支付出错，请刷新后重试');
      },
      style: { layout: 'vertical', color: 'gold', shape: 'rect', label: 'pay', height: 40 },
    }).render(containerRef.current);
  }, [loaded, plan, userId]);

  if (error) return (
    <div className="mt-3 p-3 bg-red-500/20 border border-red-400/50 rounded-lg text-red-300 text-sm">{error}</div>
  );

  return <div ref={containerRef} className="mt-3" />;
}

export default function Pricing() {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();
  const user = JSON.parse(localStorage.getItem('user') || 'null');
  const [activePlan, setActivePlan] = useState(null);
  const [success, setSuccess] = useState(null);

  // 检测是否从次数不足跳转过来
  const noCredits = new URLSearchParams(location.search).get('reason') === 'no_credits';

  const plans = [
    {
      id: 'once',
      name: t('pricing.plans.once.name'),
      price: '$1.9',
      amount: '1.90',
      credits: t('pricing.plans.once.credits'),
      color: 'from-gray-400 to-gray-600',
      features: t('pricing.plans.once.features', { returnObjects: true }),
      badge: null,
    },
    {
      id: 'pro',
      name: t('pricing.plans.pro.name'),
      price: '$9.9',
      amount: '9.90',
      sub: t('pricing.plans.pro.sub'),
      credits: t('pricing.plans.pro.credits'),
      color: 'from-yellow-400 to-cyan-400',
      features: t('pricing.plans.pro.features', { returnObjects: true }),
      badge: t('pricing.badge.popular'),
    },
    {
      id: 'unlimited',
      name: t('pricing.plans.unlimited.name'),
      price: '$19.9',
      amount: '19.90',
      sub: t('pricing.plans.unlimited.sub'),
      credits: t('pricing.plans.unlimited.credits'),
      color: 'from-purple-400 to-pink-400',
      features: t('pricing.plans.unlimited.features', { returnObjects: true }),
      badge: t('pricing.badge.value'),
    },
  ];

  const faqs = t('pricing.faqs', { returnObjects: true });

  const handleSuccess = (plan) => {
    setSuccess(plan.name);
    setActivePlan(null);
    const u = JSON.parse(localStorage.getItem('user') || '{}');
    localStorage.setItem('user', JSON.stringify({ ...u, credits: (u.credits || 0) + (plan.id === 'unlimited' ? 9999 : plan.id === 'pro' ? 30 : 1) }));
  };

  return (
    <div className="min-h-screen p-4 pt-20">
      <NavBar />
      <div className="max-w-4xl mx-auto">

        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-3 bg-gradient-to-r from-yellow-400 to-cyan-400 bg-clip-text text-transparent">{t('pricing.title')}</h1>
          <p className="text-gray-300">{t('pricing.subtitle')}</p>
        </motion.div>

        {/* 次数不足提示横幅 */}
        {noCredits && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 p-5 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-400/50 rounded-2xl text-center"
          >
            <div className="text-3xl mb-2">✨</div>
            <p className="text-lg font-bold text-yellow-300 mb-1">{t('pricing.noCreditsTitle')}</p>
            <p className="text-sm text-white/70">{t('pricing.noCreditsDesc')}</p>
          </motion.div>
        )}

        {success && (
          <div className="mb-6 p-4 bg-green-500/20 border border-green-400/50 rounded-xl text-center text-green-300">
            {t('pricing.successMsg', { name: success })}
          </div>
        )}

        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {plans.map((plan, i) => (
            <motion.div key={plan.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
              className={`relative bg-white/10 backdrop-blur-lg rounded-2xl p-6 border ${plan.badge ? 'border-yellow-400/50' : 'border-white/10'}`}>
              {plan.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-yellow-400 to-cyan-400 text-black text-xs font-bold rounded-full">{plan.badge}</div>
              )}
              <h2 className="text-xl font-bold mb-2">{plan.name}</h2>
              <div className="mb-1">
                <span className={`text-4xl font-bold bg-gradient-to-r ${plan.color} bg-clip-text text-transparent`}>{plan.price}</span>
                {plan.sub && <span className="text-gray-400 text-sm">{plan.sub}</span>}
              </div>
              <p className="text-gray-300 text-sm mb-4">{t('pricing.usages')} <strong className="text-white">{plan.credits}</strong></p>
              <ul className="space-y-2 mb-6">
                {Array.isArray(plan.features) && plan.features.map((f, j) => (
                  <li key={j} className="flex items-center gap-2 text-sm text-gray-200"><span className="text-green-400">✓</span> {f}</li>
                ))}
              </ul>
              {user ? (
                activePlan?.id === plan.id
                  ? <PayPalButton plan={plan} userId={user.id} onSuccess={handleSuccess} />
                  : <button onClick={() => setActivePlan(plan)} className={`w-full py-3 bg-gradient-to-r ${plan.color} text-black font-bold rounded-xl hover:scale-105 transition`}>{t('pricing.buyNow')}</button>
              ) : (
                <button onClick={() => navigate('/login')} className={`w-full py-3 bg-gradient-to-r ${plan.color} text-black font-bold rounded-xl hover:scale-105 transition`}>{t('pricing.loginToBuy')}</button>
              )}
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
          <h2 className="text-2xl font-bold text-center mb-8">{t('pricing.faqTitle')}</h2>
          <div className="space-y-4">
            {Array.isArray(faqs) && faqs.map((faq, i) => (
              <div key={i} className="bg-white/10 backdrop-blur-lg rounded-xl p-5 border border-white/10">
                <h3 className="font-semibold mb-2 text-yellow-300">Q: {faq.q}</h3>
                <p className="text-gray-300 text-sm leading-relaxed">A: {faq.a}</p>
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </div>
  );
}
