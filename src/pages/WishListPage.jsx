import React, { useState } from 'react';
import styled from 'styled-components';
import like1 from '../assets/like1.png';
import like2 from '../assets/like2.png';

const mockData = [
  {
    id: 1,
    name: '셀렉티스(ADR)',
    price: '2,700원',
    change: '+827원 (44.1%)',
    liked: true,
  },
  {
    id: 2,
    name: '디지털 앨라이',
    price: '140원',
    change: '+25원 (22.1%)',
    liked: false,
  },
  {
    id: 3,
    name: '메디룸 헬스케어',
    price: '1,323원',
    change: '+423원 (47.0%)',
    liked: true,
  },
];

const WishListPage = ({ isOpen }) => {
  const [stocks, setStocks] = useState(mockData);

  const toggleLike = (id) => {
    setStocks((prevStocks) =>
      prevStocks.map((stock) =>
        stock.id === id ? { ...stock, liked: !stock.liked } : stock,
      ),
    );
  };

  return (
    <WishListPageContainer $isOpen={isOpen}>
      <Title>관심 종목</Title>
      <Divider />
      <MenuItem>관심 주식 TOP 10</MenuItem>
      <StyledH4>관심 그룹에 담아보세요</StyledH4>
      <StockList>
        {stocks.map((stock) => (
          <StockItem key={stock.id}>
            <StockInfo>
              <StockName>{stock.name}</StockName>
            </StockInfo>
            <StockPriceChange>
              <StockPrice>{stock.price}</StockPrice>
              <StockChange $change={stock.change}>{stock.change}</StockChange>
            </StockPriceChange>
            <HeartIcon onClick={() => toggleLike(stock.id)}>
              <img src={stock.liked ? like2 : like1} alt="heart" />
            </HeartIcon>
          </StockItem>
        ))}
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

const StockChange = styled.span`
  font-size: 14px;
  color: ${(props) => (props.$change.includes('+') ? 'red' : 'blue')};
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
