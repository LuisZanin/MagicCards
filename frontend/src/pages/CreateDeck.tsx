import React, { useState } from 'react';
import axios from 'axios';

interface Card {
  id: string;
  name: string;
}

const CreateDeck = () => {
  const [deckName, setDeckName] = useState('');
  const [cards, setCards] = useState<Card[]>([]);
  const [selectedCards, setSelectedCards] = useState<Card[]>([]);

  const handleCreateDeck = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/decks', {
        name: deckName,
        cards: selectedCards,
      });
      console.log('Deck criado com sucesso:', response.data);
    } catch (error) {
      console.error('Erro ao criar o deck:', error);
    }
  };

  const fetchCards = async () => {
    try {
      const response = await axios.get('http://localhost:3000/cards'); 
      setCards(response.data);
    } catch (error) {
      console.error('Erro ao buscar cartas:', error);
    }
  };

  const handleCardSelect = (card: Card) => {
    setSelectedCards([...selectedCards, card]);
  };

  React.useEffect(() => {
    fetchCards();
  }, []);

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
        <div className="mb-4">
          <label className="block text-sm font-semibold text-orange-500 mb-2">
            Selecione Cartas
          </label>
          <div className="cards-container overflow-y-scroll max-h-80 border border-gray-600 p-4">
            {cards.map((card) => (
              <div key={card.id} className="card-item flex items-center mb-2">
                <span className="text-gray-300 mr-4">{card.name}</span>
                <button
                  type="button"
                  className="bg-orange-500 hover:bg-orange-600 text-white py-1 px-2 rounded transition duration-300"
                  onClick={() => handleCardSelect(card)}
                >
                  Selecionar
                </button>
              </div>
            ))}
          </div>
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
