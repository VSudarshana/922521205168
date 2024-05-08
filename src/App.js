import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import ProductDetailsPage  from "./components/ProductDetailsPage ";


function App() {
  return (
    <Router>
      <div>
        <nav className="flex gap-5 justify-end p-6 items-center bg-slate-800 text-white">
          <Link to="/">Home</Link>
          <Link to="/product/:productId">Products Details</Link>

        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:productId" element={<ProductDetailsPage />} />
        </Routes>
      </div>
    </Router>
  );
}

function Home() {
  return (
    <>
     <h3 className="text-center font-bold text-3xl mt-16 text-red-400">WELCOME TO OUR E-COMMERCE PAGE</h3>
    </>
  );
}

export default App;
