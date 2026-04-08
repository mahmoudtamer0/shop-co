import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from './pages/home/home'
import Products from './pages/home/products'
import ProductDetails from './components/productDetails/ProductDetails'
import ProductDetailsPage from './pages/home/ProductDetailsPage'
import Cart from './components/cart/Cart'
import CartPage from './pages/home/cartPage'
import Login from './pages/home/login'
import AuthSuccess from './pages/home/AuthSeccess'
import ProtectedRoute from './ProtectedRoute'
import Register from './pages/register/Register'
import Otp from './pages/verify-otp/VerifyOtp'
import ProtectOtpRoute from './ProtectOtpRoute'
function App() {


  return (
    <>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/auth/success" element={<AuthSuccess />} />


          <Route path="/verify-otp" element={
            <ProtectOtpRoute>
              <Otp />
            </ProtectOtpRoute>
          } />

          <Route
            path="/"
            element={
              <Home />
            }
          />

          <Route
            path="/products"
            element={
              <Products />
            }
          />

          <Route
            path="/products/:prodId"
            element={
              <ProductDetailsPage />
            }
          />

          <Route
            path="/cart"
            element={
              <CartPage />
            }
          />
        </Routes>
      </Router >

    </>
  )
}

export default App
