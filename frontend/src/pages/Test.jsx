import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Test() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    birthDate: '',
    bloodType: '',
    testType: ''
  });
  const [tarotCards, setTarotCards] = useState([]);

  const handleSubmit = async () => {
    try {
      const deviceId = localStorage.getItem('deviceId') || crypto.randomUUID();
      localStorage.setItem('deviceId', deviceId);
      
      const response = await axios.post('http://170.106.104.250:3002/api/readings', {
        ...formData,
        tarotCards,
        deviceId
      });
      navigate(`/result/${response.data.id}`);
    } catch (error) {
      console.error('提交失败:', error);
      alert('生成报告失败，请重试');
    }
  };

  const drawCards = async () => {
    const response = await axios.post('http://170.106.104.250:3002/api/tarot/draw');
    setTarotCards(response.data);
    setStep(3);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white/10 backdrop-blur-lg rounded-2xl p-8">
        {step === 1 && (
          <div>
            <h2 className="text-2xl font-bold mb-6">{t('test.birthDate')}</h2>
            <input
              type="date"
              value={formData.birthDate}
              onChange={(e) => setFormData({...formData, birthDate: e.target.value})}
              className="w-full p-3 rounded-lg bg-white/20 mb-4"
            />
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
              disabled={!formData.birthDate || !formData.bloodType || !formData.testType}
              className="w-full py-3 bg-gradient-to-r from-yellow-400 to-cyan-400 text-black font-bold rounded-lg disabled:opacity-50"
            >
              {t('test.drawCards')}
            </button>
          </div>
        )}
        
        {step === 2 && (
          <div>
            <h2 className="text-2xl font-bold mb-6">抽取3张牌</h2>
            <button
              onClick={drawCards}
              className="w-full py-3 bg-gradient-to-r from-yellow-400 to-cyan-400 text-black font-bold rounded-lg"
            >
              抽牌
            </button>
          </div>
        )}
        
        {step === 3 && (
          <div>
            <h2 className="text-2xl font-bold mb-6">你的塔罗牌</h2>
            <div className="space-y-2 mb-6">
              {tarotCards.map(card => (
                <div key={card.id} className="p-3 bg-white/20 rounded-lg">
                  {card.name} - {card.nameEn}
                </div>
              ))}
            </div>
            <button
              onClick={handleSubmit}
              className="w-full py-3 bg-gradient-to-r from-yellow-400 to-cyan-400 text-black font-bold rounded-lg"
            >
              {t('test.submit')}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
