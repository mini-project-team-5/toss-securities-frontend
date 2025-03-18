import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";
import SearchIcon from "../assets/search.png";
import LogoImage from "../assets/logo.png";

const Header = ({ isWishlistOpen }) => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <HeaderContainer isWishlistOpen={isWishlistOpen}>
      <Logo onClick={() => navigate("/")}> <img src={LogoImage} alt="토스증권 로고" /></Logo>

      <NavMenu>
        <NavItem onClick={() => navigate("/")} active={location.pathname === "/"}>홈</NavItem>
        <NavItem>뉴스</NavItem>
        <NavItem>주식 골라보기</NavItem>
        <NavItem>내 계좌</NavItem>
      
        <SearchBar>
          <SearchImage src={SearchIcon} alt="검색 아이콘" />
          <SearchInput type="text" placeholder="/ 를 눌러 검색하세요" />
        </SearchBar>
      </NavMenu>

      <LoginButton isWishlistOpen={isWishlistOpen} onClick={() => navigate("/login")}>
        로그인
      </LoginButton>
    </HeaderContainer>
  );
};

export default Header;

// 스타일 컴포넌트
const HeaderContainer = styled.div`
  width: calc(100% - 200px);
  height: 80px;
  padding: 10px 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: white;
  position: fixed;
  top: 0;
  transition: right 0.3s ease-in-out;
  z-index: 1000;
`;

const Logo = styled.h1`
  cursor: pointer;

  img {
    width: 150px;
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
  color: ${({ active }) => (active ? "#3E3E41" : "#97999F")};  padding: 5px 10px;
  transition: color 0.2s ease-in-out;
  outline: none; 

  &:hover {
    color: #3E3E41;
  }

  &:focus {
    outline: none;
  }
`;

const SearchBar = styled.div`
  display: flex;
  align-items: center;
  background: #f1f3f5;
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
  color: #3E3E41;
  width: 100%;

  &::placeholder {
    color: #97999F;
  }
`;

const LoginButton = styled.button`
  background: #1A73E8;
  color: white;
  border: none;
  padding: 8px 15px;
  border-radius: 10px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  margin-right: ${({ isWishlistOpen }) => (isWishlistOpen ? "360px" : "0")};

  &:hover {
    background: #005ecb;
  }

  &:focus {
    outline: none;
  }
`;
