import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Home() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <button 
        onClick={() => i18n.changeLanguage(i18n.language === 'zh' ? 'en' : 'zh')}
        className="absolute top-4 right-4 px-4 py-2 bg-white/10 rounded-lg hover:bg-white/20"
      >
        {i18n.language === 'zh' ? 'EN' : '中文'}
      </button>
      
      <button
        onClick={() => navigate('/login')}
        className="absolute top-4 left-4 px-4 py-2 bg-white/10 rounded-lg hover:bg-white/20"
      >
        登录
      </button>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-yellow-400 to-cyan-400 bg-clip-text text-transparent">
          {t('home.title')}
        </h1>
        <p className="text-xl mb-8 text-gray-300">{t('home.subtitle')}</p>
        <button
          onClick={() => navigate('/test')}
          className="px-8 py-4 bg-gradient-to-r from-yellow-400 to-cyan-400 text-black font-bold rounded-lg hover:scale-105 transition"
        >
          {t('home.start')}
        </button>
      </motion.div>
    </div>
  );
}
