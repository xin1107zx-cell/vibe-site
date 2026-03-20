import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import axios from 'axios';
import NavBar from '../components/NavBar';

function parseReport(content) {
  if (!content) return [];
  const sections = [];
  const parts = content.split(/\n###\s+/);
  
  const titleMatch = parts[0].match(/##\s+(.+)/);
  if (titleMatch) sections.push({ type: 'title', content: titleMatch[1].trim() });

  parts.slice(1).forEach(part => {
    const lines = part.trim().split('\n');
    const heading = lines[0].trim();
    const body = lines.slice(1).join('\n').trim();
    sections.push({ type: 'section', heading, body });
  });

  return sections;
}

function renderBody(text) {
  return text.split('\n').map((line, i) => {
    if (!line.trim()) return null;
    const parts = line.split(/\*\*(.+?)\*\*/g);
    return (
      <p key={i} className="mb-2 leading-relaxed text-gray-200">
        {parts.map((p, j) => j % 2 === 1 ? <strong key={j} className="text-white font-semibold">{p}</strong> : p)}
      </p>
    );
  });
}

const sectionIcons = ['🌟', '🔯', '🩸', '🃏', '💡'];

export default function Result() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [reading, setReading] = useState(null);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/readings?deviceId=${localStorage.getItem('deviceId')}`)
      .then(res => {
        const found = res.data.find(r => r.id === id);
        setReading(found);
      });
  }, [id]);

  if (!reading) return (
    <div className="min-h-screen flex items-center justify-center">
      <motion.div animate={{ rotate: 360 }} transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }} className="text-5xl">🔮</motion.div>
    </div>
  );

  const sections = parseReport(reading.reportContent);

  return (
    <div className="min-h-screen p-4 pt-20 md:p-8 md:pt-24">
      <NavBar />
      <div className="max-w-2xl mx-auto">

        {sections[0]?.type === 'title' && (
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
            <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-yellow-400 to-cyan-400 bg-clip-text text-transparent leading-tight">
              {sections[0].content}
            </h1>
          </motion.div>
        )}

        <div className="space-y-4">
          {sections.filter(s => s.type === 'section').map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15 }}
              className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/10"
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="text-2xl">{sectionIcons[i] || '✨'}</span>
                <h2 className="text-lg font-bold text-yellow-300">{s.heading}</h2>
              </div>
              <div className="text-sm md:text-base">
                {renderBody(s.body)}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }} className="flex gap-4 mt-8">
          <button
            onClick={() => navigate('/test')}
            className="flex-1 py-3 bg-gradient-to-r from-yellow-400 to-cyan-400 text-black font-bold rounded-xl hover:scale-105 transition"
          >
            {t('result.retest')}
          </button>
          <button
            onClick={() => navigate('/history')}
            className="flex-1 py-3 bg-white/20 rounded-xl hover:bg-white/30 transition"
          >
            {t('result.history')}
          </button>
        </motion.div>

      </div>
    </div>
  );
}
