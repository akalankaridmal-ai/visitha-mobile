import { Routes, Route, BrowserRouter } from 'react-router-dom';
import HomePage from './pages/HomePage';
import SearchPage from './pages/SearchPage';
import ProductDetails from './pages/ProductDetails';
import AdminDashboard from "./pages/Admin/AdminDashboard";
import CreateProduct from "./pages/Admin/CreateProduct";
import Products from "./pages/Admin/Products";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CartPage from "./pages/CartPage";
import CreateCategory from "./pages/Admin/CreateCategory";
import AdminOrders from "./pages/Admin/AdminOrders";

// Context Providers
import { AuthProvider } from "./context/auth";
import { SearchProvider } from "./context/search";
import { CartProvider } from "./context/cart";

function App() {
  return (
    <AuthProvider>
      <SearchProvider>
        <CartProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/product/:id" element={<ProductDetails />} />
              <Route path="/dashboard/admin" element={<AdminDashboard />} />
              <Route path="/dashboard/admin/create-product" element={<CreateProduct />} />
              <Route path="/dashboard/admin/products" element={<Products />} />
              
              {/* Register the missing route paths below */}
              <Route path="/dashboard/admin/create-category" element={<CreateCategory />} />
              <Route path="/dashboard/admin/orders" element={<AdminOrders />} />

              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/cart" element={<CartPage />} />
            </Routes>
          </BrowserRouter>
        </CartProvider>
      </SearchProvider>
    </AuthProvider>
  );
}

export default App;