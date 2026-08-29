import { Routes, Route } from "react-router-dom";
import ProductListPage from "./pages/productlistpage";
import ProductDetailPage from "./pages/productdetailpage";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<ProductListPage />} />
      <Route path="/products/:id" element={<ProductDetailPage />} />
    </Routes>
  );
}

export default App;