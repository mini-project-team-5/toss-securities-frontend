import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import SearchIcon from '../assets/search.png';
import LightModeLogo from '../assets/light-mode-logo.png';
import DarkModeLogo from '../assets/dark-mode-logo.png';

const Header = ({ isWishlistOpen }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setIsDarkMode(mediaQuery.matches);

    const handleChange = (e) => {
      setIsDarkMode(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);

    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);

  return (
    <HeaderContainer $isDarkMode={isDarkMode}>
      <Logo onClick={() => navigate('/')}>
        <img
          src={isDarkMode ? DarkModeLogo : LightModeLogo}
          alt="토스증권 로고"
        />
      </Logo>

      <NavMenu>
        <NavItem
          onClick={() => navigate('/')}
          $active={location.pathname === '/'}
        >
          홈
        </NavItem>
        <NavItem>뉴스</NavItem>
        <NavItem>주식 골라보기</NavItem>
        <NavItem>내 계좌</NavItem>

        <SearchBar>
          <SearchImage src={SearchIcon} alt="검색 아이콘" />
          <SearchInput type="text" placeholder="/ 를 눌러 검색하세요" />
        </SearchBar>
      </NavMenu>

      <LoginButton
        isWishlistOpen={isWishlistOpen}
        onClick={() => navigate('/login')}
      >
        로그인
      </LoginButton>
    </HeaderContainer>
  );
};

export default Header;

// 스타일 컴포넌트
const HeaderContainer = styled.div`
  background-color: ${(props) => (props.$isDarkMode ? '#17171c' : '#fff')};
  width: calc(100% - 200px);
  height: 80px;
  padding: 10px 0;
  padding-left: 25px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: 0;
  transition: right 0.3s ease-in-out;
  z-index: 1000;
`;

const Logo = styled.h1`
  cursor: pointer;

  img {
    width: 78px;
    height: auto;
  }
`;

const NavMenu = styled.div`
  display: flex;
  align-items: center;
  gap: 30px;
  flex: 1;
  justify-content: center;
`;

const NavItem = styled.button`
  background: none;
  border: none;
  font-size: 16px;
  font-weight: 550;
  cursor: pointer;
  color: ${(props) => (props.$active ? 'inherit' : '#97999F')};
  padding: 5px 10px;
  transition: color 0.2s ease-in-out;
  outline: none;

  &:hover {
    color: #3e3e41;
  }

  &:focus {
    outline: none;
  }
`;

const SearchBar = styled.div`
  display: flex;
  align-items: center;
  background: rgba(116, 116, 116, 0.2);
  border-radius: 30px;
  padding: 15px 15px;
  gap: 15px;
  min-width: 160px;
`;

const SearchImage = styled.img`
  width: 18px;
  height: 18px;
`;

const SearchInput = styled.input`
  border: none;
  background: none;
  outline: none;
  font-size: 16px;
  font-weight: 600;
  color: #3e3e41;
  width: 100%;

  &::placeholder {
    color: #97999f;
  }
`;

const LoginButton = styled.button`
  background: #1a73e8;
  color: white;
  border: none;
  padding: 8px 15px;
  border-radius: 10px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease-in-out;

  &:hover {
    background: #005ecb;
  }

  &:focus {
    outline: none;
  }
`;
