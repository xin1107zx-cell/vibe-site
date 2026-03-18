import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();

  useEffect(() => {
    // Google OAuth 初始化
    window.google?.accounts.id.initialize({
      client_id: '685986878598-15s935783q96d7v7fdl4g2ar6451qgvo.apps.googleusercontent.com',
      callback: handleCredentialResponse
    });
    
    window.google?.accounts.id.renderButton(
      document.getElementById('googleSignIn'),
      { theme: 'filled_blue', size: 'large', text: 'signin_with' }
    );
  }, []);

  const handleCredentialResponse = async (response) => {
    try {
      // 发送 token 到后端验证
      const res = await fetch('http://170.106.104.250:3002/api/auth/google', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: response.credential })
      });
      const data = await res.json();
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      navigate('/test');
    } catch (error) {
      console.error('登录失败:', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 text-center">
        <h2 className="text-2xl font-bold mb-6">登录以使用服务</h2>
        <div id="googleSignIn" className="mb-4"></div>
      </div>
    </div>
  );
}
