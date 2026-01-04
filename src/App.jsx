import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import SearchPage from './pages/SearchPage';
import PropertyPage from './pages/PropertyPage';
import './App.css'; // css styles

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <Router>
        <div className="App">
          <nav className="navbar">
            <h1>Estate Agent App</h1>
          </nav>
          <Routes>
            <Route path="/" element={<SearchPage />} />
            <Route path="/property/:id" element={<PropertyPage />} />
          </Routes>
        </div>
      </Router>
    </DndProvider>
  );
}

export default App;