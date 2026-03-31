import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Test from './pages/Test';
import Result from './pages/Result';
import History from './pages/History';
import Profile from './pages/Profile';
// ===== 付费功能已禁用 =====
// import Pricing from './pages/Pricing';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/test" element={<Test />} />
        <Route path="/result/:id" element={<Result />} />
        <Route path="/history" element={<History />} />
        <Route path="/profile" element={<Profile />} />
        {/* ===== 付费功能已禁用 ===== */}
        {/* <Route path="/pricing" element={<Pricing />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
