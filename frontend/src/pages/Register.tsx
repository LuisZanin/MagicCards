import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/users', { email, password, name });
      console.log('Registro bem-sucedido:', response.data);
    } catch (error) {
      console.error('Erro no registro:', error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleSubmit} className="w-96 bg-gray-100 p-4 rounded shadow">
        <h2 className="text-xl font-bold mb-4">Registrar</h2>
        <input
          type="text"
          placeholder="Nome"
          className="w-full p-2 mb-4 border rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 mb-4 border rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Senha"
          className="w-full p-2 mb-4 border rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="bg-blue-500 text-white w-full p-2 rounded mb-4">Registrar</button>

        <p className="text-center">
          Já tem uma conta?{' '}
          <Link to="/" className="text-blue-500 underline">
            Fazer login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
