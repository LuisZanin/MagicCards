import React from 'react';
import DeckList from '../components/DeckList';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();

  const handleCreateDeck = () => {
    navigate('/create-deck');
  };

  const handleImportDeck = () => {
    navigate('/import-deck');
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Bem-vindo ao Dashboard</h1>
      
      <div className="flex justify-between mb-4">
        <button
          onClick={handleCreateDeck}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Criar Novo Deck
        </button>

        <button
          onClick={handleImportDeck}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Importar Deck
        </button>
      </div>

      <DeckList />
    </div>
  );
};

export default Dashboard;
