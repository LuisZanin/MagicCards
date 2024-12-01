import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

interface Deck {
  _id: string;
  deckName: string;
  Commander: string;
  card: string[];
}

const Dashboard = () => {
  const [decks, setDecks] = useState<Deck[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      navigate('/');
      return;
    }

    const fetchDecks = async () => {
      try {
        const response = await axios.get('http://localhost:3000/card/my-decks', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setDecks(response.data);
      } catch (error) {
        console.error('Erro ao buscar decks:', error);
      }
    };

    fetchDecks();
  }, [navigate]);

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
          <ul>
            {decks.map((deck) => (
              <li key={deck._id} className="mb-4 p-4 bg-gray-800 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-2">Nome do Deck: {deck.deckName}</h2>
                <h3 className="text-lg font-medium mb-2">Comandante: {deck.Commander}</h3>
                <p>Número de cartas: {deck.card ? deck.card.length : 0}</p>
                {deck.card && deck.card.length > 0 && (
                  <ul className="list-disc list-inside ml-4 mt-2">
                    {deck.card.map((card, index) => (
                      <li key={index} className="text-gray-300">{card}</li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-400">Nenhum deck encontrado. Crie um novo deck para começar!</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;