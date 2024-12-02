import React, { useEffect, useState } from 'react';
import axiosInstance from '../services/axiosInstance';
import DeckCard from './DeckCard';
import rabbitMQService from '../services/rabbitmq.service';

const DeckList = () => {
  const [decks, setDecks] = useState<any[]>([]);

  useEffect(() => {
    const fetchDecks = async () => {
      try {
        const response = await axiosInstance.get('/card/my-decks');
        setDecks(response.data);
      } catch (error) {
        console.error('Erro ao buscar decks:', error);
      }
    };

    fetchDecks();

    rabbitMQService.connect();
    rabbitMQService.on('deck_created', (newDeck) => {
      setDecks((prevDecks) => [...prevDecks, newDeck]);
    });

    return () => {
      rabbitMQService.disconnect();
    };
  }, []);


  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {decks.map((deck) => (
        <DeckCard key={deck._id} deck={deck} />
      ))}
    </div>
  );
};

export default DeckList;