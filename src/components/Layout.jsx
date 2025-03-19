import { Outlet } from 'react-router-dom';
import SideBar from './SideBar';
import Header from './Header';
import { useState } from 'react';

const Layout = () => {
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);

  return (
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
        <Header isWishlistOpen={isWishlistOpen} />
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
