
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import ProductList from './pages/ProductList';
import ProductPage from './pages/ProductPage';
import CartPage from './pages/CartPage';
import  Header  from './components/Navbar';
import Footer from './components/Footer';
import './App.css'

const App = () => {
  return (
    <div className="App">
      <CartProvider>
        <Router>
          <Header />
          <div className="main-content">
            <Routes>
              <Route path="/" element={<ProductList />} />
              <Route path="/product/:productId" element={<ProductPage />} />
              <Route path="/cart" element={<CartPage />} />
            </Routes>
          </div>
          <Footer />
        </Router>
      </CartProvider>
    </div>
  );
};

export default App;

