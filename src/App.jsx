import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import Shop from './Pages/Shop';
import About from './Pages/About';
import Store from './Pages/Store';
import Gallery from './Pages/Gallery';
import Contact from './Pages/Contact';
import ProductDetails from './Pages/ProductDetails';
import Cart from './Pages/Cart';
import NotFound from './Pages/NotFound';
import BackToTop from './components/BackToTop';

// Admin imports (inside Pages with capital P)
import Login from './Pages/admin/Login';
import Layout from './Pages/admin/Layout';
import Products from './Pages/admin/Products';
import AddProduct from './Pages/admin/AddProduct';
import EditProduct from './Pages/admin/EditProduct';

function App() {
  return (
    <BrowserRouter>
      <BackToTop />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/about" element={<About />} />
        <Route path="/stores" element={<Store />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/cart" element={<Cart />} />
        
        {/* Admin Routes */}
        <Route path="/admin/login" element={<Login />} />
        <Route path="/admin" element={<Layout />}>
          <Route path="products" element={<Products />} />
          <Route path="products/add" element={<AddProduct />} />
          <Route path="products/edit/:id" element={<EditProduct />} />
        </Route>
        
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
