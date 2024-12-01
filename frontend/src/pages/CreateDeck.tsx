import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CreateDeck = () => {
  const [deckName, setDeckName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      navigate('/');
    }
  }, [navigate]);

  const handleCreateDeck = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        throw new Error('Usuário não autenticado');
      }

      const response = await axios.post(
        'http://localhost:3000/card/create',
        {
          deckName: deckName,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      console.log('Deck criado com sucesso:', response.data);
      navigate('/dashboard');
    } catch (error) {
      console.error('Erro ao criar o deck:', error);
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <h2 className="text-4xl font-bold mb-6 text-orange-500">Criar um Novo Deck</h2>
      <form onSubmit={handleCreateDeck} className="bg-black p-8 rounded-lg shadow-md">
        <div className="mb-4">
          <label className="block text-sm font-semibold text-orange-500 mb-2" htmlFor="deckName">
            Nome do Deck
          </label>
          <input
            id="deckName"
            type="text"
            placeholder="Digite o nome do deck"
            className="w-full px-4 py-2 border border-gray-600 rounded-lg text-gray-300 bg-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-500"
            value={deckName}
            onChange={(e) => setDeckName(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
        >
          Criar Deck
        </button>
      </form>
    </div>
  );
};

export default CreateDeck;
