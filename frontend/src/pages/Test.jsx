import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';

export default function Test() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    birthYear: '',
    birthMonth: '',
    birthDay: '',
    bloodType: '',
    testType: ''
  });
  const [tarotCards, setTarotCards] = useState([]);
  const [isDrawing, setIsDrawing] = useState(false);

  const handleSubmit = async () => {
    try {
      const user = JSON.parse(localStorage.getItem('user') || 'null');
      if (!user) {
        alert('请先登录');
        navigate('/login');
        return;
      }
      
      let deviceId = localStorage.getItem('deviceId');
      if (!deviceId) {
        deviceId = 'device_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
        localStorage.setItem('deviceId', deviceId);
      }
      
      const birthDate = `${formData.birthYear}-${String(formData.birthMonth).padStart(2, '0')}-${String(formData.birthDay).padStart(2, '0')}`;
      
      const response = await axios.post('http://170.106.104.250:3002/api/readings', {
        birthDate,
        bloodType: formData.bloodType,
        testType: formData.testType,
        tarotCards,
        deviceId,
        userId: user.id
      });
      navigate(`/result/${response.data.id}`);
    } catch (error) {
      console.error('提交失败:', error);
      alert('生成报告失败，请重试');
    }
  };

  const drawCards = async () => {
    setIsDrawing(true);
    const response = await axios.post('http://170.106.104.250:3002/api/tarot/draw');
    setTimeout(() => {
      setTarotCards(response.data);
      setIsDrawing(false);
      setStep(3);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white/10 backdrop-blur-lg rounded-2xl p-8">
        {step === 1 && (
          <div>
            <h2 className="text-2xl font-bold mb-6">{t('test.birthDate')}</h2>
            <div className="grid grid-cols-3 gap-2 mb-4">
              <select
                value={formData.birthYear || ''}
                onChange={(e) => setFormData({...formData, birthYear: e.target.value})}
                className="p-3 rounded-lg bg-white/20 text-white"
                style={{color: 'white'}}
              >
                <option value="" style={{color: 'black'}}>年</option>
                {Array.from({length: 80}, (_, i) => 2010 - i).map(year => (
                  <option key={year} value={year} style={{color: 'black'}}>{year}</option>
                ))}
              </select>
              <select
                value={formData.birthMonth || ''}
                onChange={(e) => setFormData({...formData, birthMonth: e.target.value})}
                className="p-3 rounded-lg bg-white/20 text-white"
                style={{color: 'white'}}
              >
                <option value="" style={{color: 'black'}}>月</option>
                {Array.from({length: 12}, (_, i) => i + 1).map(month => (
                  <option key={month} value={month} style={{color: 'black'}}>{month}</option>
                ))}
              </select>
              <select
                value={formData.birthDay || ''}
                onChange={(e) => setFormData({...formData, birthDay: e.target.value})}
                className="p-3 rounded-lg bg-white/20 text-white"
                style={{color: 'white'}}
              >
                <option value="" style={{color: 'black'}}>日</option>
                {Array.from({length: 31}, (_, i) => i + 1).map(day => (
                  <option key={day} value={day} style={{color: 'black'}}>{day}</option>
                ))}
              </select>
            </div>
            <select
              value={formData.bloodType}
              onChange={(e) => setFormData({...formData, bloodType: e.target.value})}
              className="w-full p-3 rounded-lg bg-white/20 text-white mb-4"
              style={{color: 'white'}}
            >
              <option value="" style={{color: 'black'}}>{t('test.bloodType')}</option>
              <option value="A" style={{color: 'black'}}>A</option>
              <option value="B" style={{color: 'black'}}>B</option>
              <option value="O" style={{color: 'black'}}>O</option>
              <option value="AB" style={{color: 'black'}}>AB</option>
            </select>
            <select
              value={formData.testType}
              onChange={(e) => setFormData({...formData, testType: e.target.value})}
              className="w-full p-3 rounded-lg bg-white/20 text-white mb-4"
              style={{color: 'white'}}
            >
              <option value="" style={{color: 'black'}}>{t('test.testType')}</option>
              <option value="love" style={{color: 'black'}}>{t('test.love')}</option>
              <option value="friendship" style={{color: 'black'}}>{t('test.friendship')}</option>
              <option value="career" style={{color: 'black'}}>{t('test.career')}</option>
            </select>
            <button
              onClick={() => setStep(2)}
              disabled={!formData.birthYear || !formData.birthMonth || !formData.birthDay || !formData.bloodType || !formData.testType}
              className="w-full py-3 bg-gradient-to-r from-yellow-400 to-cyan-400 text-black font-bold rounded-lg disabled:opacity-50"
            >
              {t('test.drawCards')}
            </button>
          </div>
        )}
        
        {step === 2 && (
          <div>
            <h2 className="text-2xl font-bold mb-6">抽取3张牌</h2>
            {isDrawing ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-8"
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                  className="text-6xl mb-4"
                >
                  🔮
                </motion.div>
                <p className="text-lg">正在为你抽取塔罗牌...</p>
              </motion.div>
            ) : (
              <button
                onClick={drawCards}
                className="w-full py-3 bg-gradient-to-r from-yellow-400 to-cyan-400 text-black font-bold rounded-lg"
              >
                抽牌
              </button>
            )}
          </div>
        )}
        
        {step === 3 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h2 className="text-2xl font-bold mb-6">你的塔罗牌</h2>
            <div className="space-y-2 mb-6">
              {tarotCards.map((card, index) => (
                <motion.div
                  key={card.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.2 }}
                  className="p-3 bg-white/20 rounded-lg"
                >
                  {card.name} - {card.nameEn}
                </motion.div>
              ))}
            </div>
            <button
              onClick={handleSubmit}
              className="w-full py-3 bg-gradient-to-r from-yellow-400 to-cyan-400 text-black font-bold rounded-lg"
            >
              {t('test.submit')}
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
