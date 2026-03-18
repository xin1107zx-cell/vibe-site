import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Result() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [reading, setReading] = useState(null);

  useEffect(() => {
    axios.get(`http://170.106.104.250:3002/api/readings?deviceId=${localStorage.getItem('deviceId')}`)
      .then(res => {
        const found = res.data.find(r => r.id === id);
        setReading(found);
      });
  }, [id]);

  if (!reading) return <div className="min-h-screen flex items-center justify-center">加载中...</div>;

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-2xl mx-auto bg-white/10 backdrop-blur-lg rounded-2xl p-8">
        <h1 className="text-3xl font-bold mb-6">你的测试结果</h1>
        <div className="mb-6">
          <p className="text-lg leading-relaxed">{reading.reportContent}</p>
        </div>
        <div className="flex gap-4">
          <button
            onClick={() => navigate('/test')}
            className="px-6 py-3 bg-gradient-to-r from-yellow-400 to-cyan-400 text-black font-bold rounded-lg"
          >
            再测一次
          </button>
          <button
            onClick={() => navigate('/history')}
            className="px-6 py-3 bg-white/20 rounded-lg"
          >
            查看历史
          </button>
        </div>
      </div>
    </div>
  );
}
