import { Form } from './Pages/Form/Form';
import { Home } from './Pages/Home/Home';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { List } from './Pages/List/List';
import { Individual } from './Pages/List/Individual';
function App() {
  
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path='/add' element={<Form />} />
          <Route path='/show' element={<List />} />
          <Route path='/transaction/:id' element={<Individual />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
