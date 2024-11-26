import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [backgroundImage, setBackgroundImage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

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
      const response = await axios.post('http://localhost:3001/auth/login', { username, password });
      const { access_token } = response.data;

      localStorage.setItem('authToken', access_token);

      navigate('/dashboard');
    } catch (error) {
      console.error('Erro no login:', error);
      setErrorMessage('Erro ao realizar login. Verifique suas credenciais.');
    }
  };

  return (
    <div className="login-container">
      <div className="left-section">
        <h2 className="text-4xl font-bold mb-6">Bem-vindo(a)</h2>
        
        <form onSubmit={handleSubmit}>
          <label className="block text-sm font-semibold mb-2" htmlFor="username">
            Nome de Usuário
          </label>
          <input
            id="username"
            type="text"
            placeholder="Digite seu nome de usuário"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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

          {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}

          <button type="submit">Entrar</button>
        </form>

        <p className="mt-4 text-gray-500">
          Não tem uma conta?{' '}
          <Link to="/register" className="link">
            Criar Conta
          </Link>
        </p>
      </div>

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
