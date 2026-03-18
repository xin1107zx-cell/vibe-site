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
    const deviceId = localStorage.getItem('deviceId') || crypto.randomUUID();
    localStorage.setItem('deviceId', deviceId);
    
    const response = await axios.post('http://localhost:3001/api/readings', {
      ...formData,
      tarotCards,
      deviceId
    });
    navigate(`/result/${response.data.id}`);
  };

  const drawCards = async () => {
    const response = await axios.post('http://localhost:3001/api/tarot/draw');
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
              className="w-full p-3 rounded-lg bg-white/20 mb-4"
            >
              <option value="">{t('test.bloodType')}</option>
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="O">O</option>
              <option value="AB">AB</option>
            </select>
            <select
              value={formData.testType}
              onChange={(e) => setFormData({...formData, testType: e.target.value})}
              className="w-full p-3 rounded-lg bg-white/20 mb-4"
            >
              <option value="">{t('test.testType')}</option>
              <option value="love">{t('test.love')}</option>
              <option value="friendship">{t('test.friendship')}</option>
              <option value="career">{t('test.career')}</option>
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
