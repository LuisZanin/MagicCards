import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DeckCard from './DeckCard';

const DeckList = () => {
  const [decks, setDecks] = useState<any[]>([]);

  useEffect(() => {
    const fetchDecks = async () => {
      try {
        const response = await axios.get('http://localhost:3000/decks');
        setDecks(response.data);
      } catch (error) {
        console.error('Erro ao buscar decks:', error);
      }
    };

    fetchDecks();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {decks.map((deck) => (
        <DeckCard key={deck.id} deck={deck} />
      ))}
    </div>
  );
};

export default DeckList;
