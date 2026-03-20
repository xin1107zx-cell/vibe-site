import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import NavBar from '../components/NavBar';

export default function History() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [readings, setReadings] = useState([]);

  useEffect(() => {
    const deviceId = localStorage.getItem('deviceId');
    if (deviceId) {
      axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/readings?deviceId=${deviceId}`)
        .then(res => setReadings(res.data));
    }
  }, []);

  const typeLabel = (type) => {
    const map = { love: t('test.love'), friendship: t('test.friendship'), career: t('test.career') };
    return map[type] || type;
  };

  return (
    <div className="min-h-screen p-8 pt-20">
      <NavBar />
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">{t('history.title')}</h1>
        {readings.length === 0 && (
          <p className="text-gray-400 text-center py-12">{t('history.empty')}</p>
        )}
        <div className="space-y-4">
          {readings.map(reading => (
            <div
              key={reading.id}
              onClick={() => navigate(`/result/${reading.id}`)}
              className="bg-white/10 backdrop-blur-lg rounded-xl p-6 cursor-pointer hover:bg-white/20 transition"
            >
              <div className="flex justify-between items-start mb-2">
                <span className="text-lg font-bold">{typeLabel(reading.testType)}</span>
                <span className="text-sm text-gray-400">
                  {new Date(reading.createdAt).toLocaleDateString()}
                </span>
              </div>
              <p className="text-gray-300 line-clamp-2">{reading.reportContent}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
