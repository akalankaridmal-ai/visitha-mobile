import { Routes, Route, BrowserRouter } from 'react-router-dom';
import HomePage from './pages/HomePage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        {/* You can easily add more routes here later, like:
            <Route path="/product/:slug" element={<ProductDetails />} /> 
        */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;