import React from 'react';

const DeckCard = ({ deck }: { deck: any }) => {
  return (
    <div className="border p-4 rounded shadow">
      <h2 className="text-xl font-bold">{deck.name}</h2>
      <p>Comandante: {deck.commander}</p>
      <p>Total de Cartas: {deck.cards.length}</p>
    </div>
  );
};

export default DeckCard;
