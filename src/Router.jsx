import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import SideBar from './components/SideBar';
import WishListPage from './pages/WishListPage';
import Header from './components/Header';
import useAuth from "./hooks/useAuth";

const Router = () => {
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const { user, logout } = useAuth();

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <div style={{ display: 'flex' }}>
              <SideBar
                isWishlistOpen={isWishlistOpen}
                setIsWishlistOpen={setIsWishlistOpen}
              />
              <div
                style={{
                  flex: 1,
                  marginRight: isWishlistOpen ? '360px' : '0',
                  transition: 'margin-right 0.3s ease-in-out',
                }}
              >
                <Header user={user} logout={logout} />
                <HomePage />
              </div>
            </div>
          }
        />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
