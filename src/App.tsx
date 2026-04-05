import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from './pages/home/home'
import Products from './pages/home/products'
import ProductDetails from './components/productDetails/ProductDetails'
import ProductDetailsPage from './pages/home/ProductDetailsPage'
function App() {


  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:prodId" element={<ProductDetailsPage />} />
        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App
