import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import SideBar from "./components/SideBar";
import WishListPage from "./pages/WishListPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";

function App() {
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route
          path="/*"
          element={
            <div style={{ display: "flex", width: "100%" }}>
              <SideBar isWishlistOpen={isWishlistOpen} setIsWishlistOpen={setIsWishlistOpen} />
              <div style={{ flex: 1 }}>
                <Header isWishlistOpen={isWishlistOpen} />
                <Routes>
                  <Route path="/" element={<Home />} />
                </Routes>
                <WishListPage isOpen={isWishlistOpen} />
              </div>
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
