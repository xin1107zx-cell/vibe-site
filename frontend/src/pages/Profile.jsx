import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

export default function Profile() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const user = JSON.parse(localStorage.getItem('user') || 'null');

  if (!user) {
    navigate('/login');
    return null;
  }

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-white/10 backdrop-blur-lg rounded-2xl p-8"
      >
        <div className="text-center mb-8">
          {user.avatar ? (
            <img src={user.avatar} alt="avatar" className="w-20 h-20 rounded-full mx-auto mb-4" />
          ) : (
            <div className="w-20 h-20 rounded-full bg-gradient-to-r from-yellow-400 to-cyan-400 mx-auto mb-4 flex items-center justify-center text-3xl font-bold text-black">
              {user.name?.charAt(0) || '?'}
            </div>
          )}
          <h2 className="text-2xl font-bold">{user.name}</h2>
          <p className="text-gray-300 text-sm mt-1">{user.email}</p>
        </div>

        <div className="space-y-3">
          <button
            onClick={() => navigate('/test')}
            className="w-full py-3 bg-gradient-to-r from-yellow-400 to-cyan-400 text-black font-bold rounded-lg hover:scale-105 transition"
          >
            {t('profile.startTest')}
          </button>
          <button
            onClick={() => navigate('/history')}
            className="w-full py-3 bg-white/20 rounded-lg hover:bg-white/30 transition"
          >
            {t('profile.history')}
          </button>
          <button
            onClick={handleLogout}
            className="w-full py-3 bg-red-500/30 rounded-lg hover:bg-red-500/50 transition"
          >
            {t('profile.logout')}
          </button>
        </div>
      </motion.div>
    </div>
  );
}
