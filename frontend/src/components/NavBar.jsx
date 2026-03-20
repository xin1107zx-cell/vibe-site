import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function NavBar() {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const user = JSON.parse(localStorage.getItem('user') || 'null');

  const toggleLang = () => {
    i18n.changeLanguage(i18n.language === 'zh' ? 'en' : 'zh');
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-4 py-3 bg-black/20 backdrop-blur-sm">
      <button
        onClick={() => navigate('/')}
        className="text-lg font-bold bg-gradient-to-r from-yellow-400 to-cyan-400 bg-clip-text text-transparent"
      >
        🔮 VibeMirror
      </button>
      <div className="flex items-center gap-2">
        {/* 语言切换 */}
        <button
          onClick={toggleLang}
          className="px-2 py-1 text-xs bg-white/10 rounded-md hover:bg-white/20 transition text-white/80"
        >
          {i18n.language === 'zh' ? 'EN' : '中'}
        </button>
        <button
          onClick={() => navigate(user ? '/profile' : '/login')}
          className="flex items-center gap-2 px-3 py-1.5 bg-white/10 rounded-lg hover:bg-white/20 transition text-sm"
        >
          {user ? (
            <>
              {user.avatar
                ? <img src={user.avatar} className="w-6 h-6 rounded-full" alt="avatar" />
                : <span className="w-6 h-6 rounded-full bg-gradient-to-r from-yellow-400 to-cyan-400 flex items-center justify-center text-xs font-bold text-black">{user.name?.charAt(0)}</span>
              }
              <span>{user.name}</span>
            </>
          ) : (
            <span>{t('nav.login')}</span>
          )}
        </button>
      </div>
    </div>
  );
}
