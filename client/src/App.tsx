import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import CartPage from './pages/CartPage'
import CheckoutPage from './pages/CheckoutPage'
import OrderConfirmationPage from './pages/OrderConfirmationPage'

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/confirmation" element={<OrderConfirmationPage />} />
      </Routes>
    </>
  )
}

export default App