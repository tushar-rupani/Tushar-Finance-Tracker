import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Form from './pages/Form/Form';
function App() {
  return (
    <Router>
      <Routes>
        <Route path='/form' element={<Form />}/>
        <Route path='/form/:id' element={<Form />}/>
      </Routes>
    </Router>
  );
}

export default App;
