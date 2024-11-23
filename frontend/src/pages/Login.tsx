import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [backgroundImage, setBackgroundImage] = useState('');

  useEffect(() => {

    const images = [
      '1314053.jpg',
      '1290838.jpg',
      '1302423.jpg',
      '1315735.jpg',
      '1303446.jpg'
    ];

    const randomImage = images[Math.floor(Math.random() * images.length)];
    setBackgroundImage(`/images/${randomImage}`);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/auth/login', { email, password });
      console.log('Login bem-sucedido:', response.data);
    } catch (error) {
      console.error('Erro no login:', error);
    }
  };

  return (
    <div className="login-container">
      {/* Seção Esquerda */}
      <div className="left-section">
        <h2 className="text-4xl font-bold mb-6">Bem-vindo(a)</h2>
        
        <form onSubmit={handleSubmit}>
          <label className="block text-sm font-semibold mb-2" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="Digite seu email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label className="block text-sm font-semibold mb-2" htmlFor="password">
            Senha
          </label>
          <input
            id="password"
            type="password"
            placeholder="Digite sua senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit">Entrar</button>
        </form>

        <p className="mt-4 text-gray-500">
          Não tem uma conta?{' '}
          <Link to="/register" className="link">
            Criar Conta
          </Link>
        </p>
      </div>

      {/* Seção Direita */}
      <div className="right-section" style={{ backgroundImage: `url(${backgroundImage})` }}>
        <img
          src="/images/Magic-The-Gathering-Logo.png"
          alt="Magic The Gathering Logo"
          className="logo-overlay"
        />
      </div>
    </div>
  );
};

export default Login;
