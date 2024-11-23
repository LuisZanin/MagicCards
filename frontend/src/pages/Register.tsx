import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('As senhas não coincidem!');
      return;
    }
    try {
      const response = await axios.post('http://localhost:3000/auth/register', { name, email, password });
      console.log('Registro bem-sucedido:', response.data);
    } catch (error) {
      console.error('Erro no registro:', error);
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-4xl flex items-center justify-center min-h-screen">
      
      <form onSubmit={handleSubmit} className="bg-black p-16 rounded-lg shadow-lg w-full">
        <div className="mb-4">
          <label className="block text-sm font-semibold text-orange-500 mb-2" htmlFor="name">
            Nome
          </label>
          <input
            id="name"
            type="text"
            placeholder="Digite seu nome"
            className="w-full px-4 py-2 border border-gray-600 rounded-lg text-gray-300 bg-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-500"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-semibold text-orange-500 mb-2" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="Digite seu email"
            className="w-full px-4 py-2 border border-gray-600 rounded-lg text-gray-300 bg-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-semibold text-orange-500 mb-2" htmlFor="password">
            Senha
          </label>
          <input
            id="password"
            type="password"
            placeholder="Digite sua senha"
            className="w-full px-4 py-2 border border-gray-600 rounded-lg text-gray-300 bg-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <label className="block text-sm font-semibold text-orange-500 mb-2" htmlFor="confirmPassword">
            Confirme sua Senha
          </label>
          <input
            id="confirmPassword"
            type="password"
            placeholder="Confirme sua senha"
            className="w-full px-4 py-2 border border-gray-600 rounded-lg text-gray-300 bg-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-500"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
        >
          Registrar
        </button>
        <p className="mt-4 text-center text-gray-500">
          Já tem uma conta?{' '}
          <Link to="/" className="text-orange-500 hover:underline">
            Entrar
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
