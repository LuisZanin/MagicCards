import React, { useState } from 'react';
import axios from 'axios';

const ImportDeck = () => {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleImportDeck = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      alert('Por favor, selecione um arquivo JSON.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('http://localhost:3000/decks/import', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Deck importado com sucesso:', response.data);
    } catch (error) {
      console.error('Erro ao importar o deck:', error);
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <h2 className="text-4xl font-bold mb-6 text-orange-500">Importar um Deck</h2>
      <form onSubmit={handleImportDeck} className="bg-black p-8 rounded-lg shadow-md">
        <div className="mb-4">
          <label className="block text-sm font-semibold text-orange-500 mb-2" htmlFor="file">
            Importar Arquivo JSON
          </label>
          <input
            id="file"
            type="file"
            accept=".json"
            className="w-full px-4 py-2 border border-gray-600 rounded-lg text-gray-300 bg-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-500"
            onChange={handleFileChange}
          />
        </div>
        <button
          type="submit"
          className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
        >
          Importar Deck
        </button>
      </form>
    </div>
  );
};

export default ImportDeck;
