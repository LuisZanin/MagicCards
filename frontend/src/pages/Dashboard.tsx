import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../services/axiosInstance';

const Dashboard = () => {
  const [decks, setDecks] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Verificar se o usuário está autenticado
    const token = localStorage.getItem('authToken');
    if (!token) {
      navigate('/');
      return;
    }

    // Buscar decks
    const fetchDecks = async () => {
      try {
        const response = await axiosInstance.get('/decks');
        setDecks(response.data);
      } catch (error) {
        console.error('Erro ao buscar decks:', error);
      }
    };

    fetchDecks();
  }, [navigate]);

  // Função para navegar até a página de criação de um novo deck
  const handleCreateDeck = () => {
    navigate('/create-deck');
  };

  return (
    <div className="dashboard-container min-h-screen bg-gray-900 text-white p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <button
          onClick={handleCreateDeck}
          className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
        >
          Criar Novo Deck
        </button>
      </div>

      <div className="deck-list">
        {decks.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {decks.map((deck) => (
              <div key={deck.id} className="deck-card p-6 bg-gray-800 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4">{deck.name}</h2>
                <p>Número de cartas: {deck.cards.length}</p>
                {/* Botões ou funcionalidades adicionais para cada deck, como visualizar ou editar */}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-400">Nenhum deck encontrado. Crie um novo deck para começar!</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
