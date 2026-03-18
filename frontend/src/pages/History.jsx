import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function History() {
  const navigate = useNavigate();
  const [readings, setReadings] = useState([]);

  useEffect(() => {
    const deviceId = localStorage.getItem('deviceId');
    if (deviceId) {
      axios.get(`http://170.106.104.250:3002/api/readings?deviceId=${deviceId}`)
        .then(res => setReadings(res.data));
    }
  }, []);

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">测试历史</h1>
        <div className="space-y-4">
          {readings.map(reading => (
            <div
              key={reading.id}
              onClick={() => navigate(`/result/${reading.id}`)}
              className="bg-white/10 backdrop-blur-lg rounded-xl p-6 cursor-pointer hover:bg-white/20 transition"
            >
              <div className="flex justify-between items-start mb-2">
                <span className="text-lg font-bold">{reading.testType}</span>
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
