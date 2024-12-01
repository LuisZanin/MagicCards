import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Register from './pages/Register';
import CreateDeck from './pages/CreateDeck';
import ImportDeck from './pages/ImportDeck';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/create-deck" element={<CreateDeck />} />
      <Route path="/import-deck" element={<ImportDeck />} />
    </Routes>
  );
};

export default App;
