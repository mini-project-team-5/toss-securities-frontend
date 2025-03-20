import { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import like2 from "../assets/like2.png";
import axiosInstance from "../utils/axiosInstance";

const WishListPage = ({ isOpen }) => {
  const navigate = useNavigate();
  const { user, addedItems, removeFromWishlist } = useAuth();
  const [wishlistData, setWishlistData] = useState([]);

  useEffect(() => {
    const fetchWishlistData = async () => {
      try {
        const response = await axiosInstance.get("/api/wishlist");
        setWishlistData(response.data);
      } catch (error) {
        console.error("위시리스트 가져오기 실패:", error);
      }
    };

    if (user) {
      fetchWishlistData();
    }
  }, [user, addedItems]); // addedItems 변경될 때 UI 업데이트

  const checkLogin = useCallback(() => !!user, [user]);

  const handleClickWish = async (stock, e) => {
    e.stopPropagation();
    if (!checkLogin()) {
      alert("로그인이 필요합니다!");
      window.location.href = "/login";
      return;
    }
    removeFromWishlist(stock);
  };

  const handleNavigate = useCallback(
    (code) => {
      navigate(`/stock/${code}`);
    },
    [navigate]
  );

  return (
    <WishListPageContainer $isOpen={isOpen}>
      <Title>관심 종목</Title>
      <Divider />
      <MenuItem>관심 주식 TOP 10</MenuItem>
      <StyledH4>관심 그룹에 담아보세요</StyledH4>
      <StockList>
        {wishlistData.length === 0 ? (
          <EmptyMessage>관심 그룹이 없습니다.</EmptyMessage>
        ) : (
          wishlistData.map((stock) => {
            return (
              <StockItem key={stock.stock.code} onClick={() => handleNavigate(stock.stock.code)}>
                <StockInfo>
                  <StockName>{stock.stock.name}</StockName>
                </StockInfo>
                <StockPrice>{(stock.stock.price ?? 0).toLocaleString()}원</StockPrice>
                <HeartIcon onClick={(e) => handleClickWish(stock.stock, e)}>
                  <img src={like2} alt="heart" />
                </HeartIcon>
              </StockItem>
            );
          })
        )}
      </StockList>
    </WishListPageContainer>
  );
};

export default WishListPage;

// 스타일 컴포넌트
const WishListPageContainer = styled.div`
  position: fixed;
  top: 0;
  right: ${(props) => (props.$isOpen ? '80px' : '-350px')};
  width: 350px;
  height: 100vh;
  background: #f8f9fa;
  padding: 20px;
  font-weight: 700;
  display: flex;
  flex-direction: column;
  border-right: 1px solid #ddd;
  align-items: flex-start;
  z-index: 1000;
  opacity: ${(props) => (props.$isOpen ? '1' : '0')};
  transform: translateX(${(props) => (props.$isOpen ? '0' : '10px')});
  transition:
    right 0.2s ease-in-out,
    opacity 0.5s ease-in-out,
    transform 0.2s ease-in-out;
`;

const Title = styled.div`
  color: #3e3e41;
  font-size: 20px;
`;

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background: #ddd;
  margin: 30px 0;
`;

const MenuItem = styled.div`
  width: auto;
  padding-left: 0;
  margin-left: 0;
  text-align: left;
  font-size: 17px;
  cursor: pointer;
  color: #3e3e41;

  &:hover {
    background: #f1f1f1;
  }
`;

const StyledH4 = styled.h4`
  font-size: 16px;
  color: #838590;
  margin-top: 1px;
  font-weight: 500;
`;

const StockList = styled.div`
  width: 100%;
  margin-top: 10px;
`;

const StockItem = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 10px 0;
  gap: 10px;
`;

const StockInfo = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
`;

const StockName = styled.span`
  font-size: 16px;
  font-weight: 700;
  color: #3e3e41;
`;

const StockPriceWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;

const StockPriceChange = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  text-align: right;
  min-width: 90px;
`;

const StockPrice = styled.span`
  font-size: 16px;
  font-weight: 600;
  color: #3e3e41;
`;

const StockChange = styled.div`
  color: ${(props) =>
    props.$positive ? '#f04251' : props.$negative ? '#3485fa' : '#9e9ea4'};
`;

const HeartIcon = styled.div`
  width: 24px;
  height: 24px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 100%;
    height: 100%;
    transition: transform 0.2s ease-in-out;
  }

  &:hover img {
    transform: scale(1.1);
  }
`;

const EmptyMessage = styled.p`
  text-align: center;
  font-size: 14px;
  color: #888;
  margin-top: 20px;
`;