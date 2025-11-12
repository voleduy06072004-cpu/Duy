import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const found = users.find(
      (u) => u.email === email && u.password === password
    );
    if (found) {
      localStorage.setItem('currentUser', JSON.stringify(found));
      alert('Đăng nhập thành công!');
      navigate('/');
    } else {
      alert('Sai email hoặc mật khẩu!');
    }
  };

  return (
    <div className="auth-container">
      <h2>Đăng nhập</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Mật khẩu"
          value={password}
          required
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Đăng nhập</button>
      </form>
      <p>Chưa có tài khoản? <a href="/register">Đăng ký</a></p>
    </div>
  );
}
