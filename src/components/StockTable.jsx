import { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import CartButton from './CartButton';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const StockTable = ({ datas }) => {
  const navigate = useNavigate();
  const [addedItems, setAddedItems] = useState([]);

  const checkLogin = useCallback(
    () => !!sessionStorage.getItem('accessToken'),
    [],
  );

  const getWishList = useCallback(async () => {
    try {
      const response = await axios.get('/api/wishlist');
      setAddedItems(response.data.map((item) => item.stockCode));
    } catch (error) {
      console.error('위시리스트 가져오기 실패:', error);
    }
  }, []);

  useEffect(() => {
    getWishList();
  }, [getWishList]);

  const handleClickWish = async (stockCode, e) => {
    e.stopPropagation();

    if (!checkLogin()) {
      alert('로그인이 필요합니다!');
      window.location.href = '/login';
      return;
    }

    try {
      if (addedItems.includes(stockCode)) {
        await axios.delete(`/api/wishlist/${stockCode}`);
        setAddedItems((prev) => prev.filter((code) => code !== stockCode));
      } else {
        await axios.post('/api/wishlist', { stockCode });
        setAddedItems((prev) => [...prev, stockCode]);
      }
    } catch (error) {
      console.error('위시리스트 업데이트 실패:', error);
    }
  };

  const isItemAdded = (stockCode) => {
    return addedItems.includes(stockCode);
  };

  return (
    <TableContainer>
      <Table>
        <thead>
          <TableRow>
            <TableHead>종목</TableHead>
            <TableHead></TableHead>
            <TableHead></TableHead>
            <RightTableHead>현재가</RightTableHead>
            <RightTableHead>등락률</RightTableHead>
            <RightTableHead>거래량 많은 순</RightTableHead>
          </TableRow>
        </thead>
        <tbody>
          {datas.map((stock) => {
            const isPositive = stock.rate > 0;
            const isNegative = stock.rate < 0;
            const formattedRate =
              stock.rate === 0
                ? `0.0%`
                : isPositive
                  ? `+${stock.rate}%`
                  : `${stock.rate}%`;
            return (
              <TableRow
                key={stock.code}
                onClick={() => navigate(`/stock/${stock.code}`)}
              >
                <CartCell>
                  <CartButton
                    onClick={(e) => handleClickWish(stock.code, e)}
                    isAdded={isItemAdded(stock.code)}
                  />
                </CartCell>
                <TableCell>{stock.rank}</TableCell>
                <TableCell>{stock.name}</TableCell>
                <RightTableCell>
                  {stock.price.toLocaleString()}원
                </RightTableCell>
                <RateCell $positive={isPositive} $negative={isNegative}>
                  {formattedRate}
                </RateCell>
                <RightTableCell>{stock.volume}주</RightTableCell>
              </TableRow>
            );
          })}
        </tbody>
      </Table>
    </TableContainer>
  );
};

const TableContainer = styled.div``;
const Table = styled.table`
  width: 100%;
  border-collapse: collapse;

  tbody tr {
    cursor: pointer;
  }
  tbody tr:nth-child(odd) {
    background-color: rgba(245, 245, 245, 0.03);
  }
`;

const TableRow = styled.tr`
  td:first-child {
    border-top-left-radius: 8px;
    border-bottom-left-radius: 8px;
  }
  td:last-child {
    border-top-right-radius: 8px;
    border-bottom-right-radius: 8px;
  }
  th {
    color: #9e9ea4;
  }
`;
const TableHead = styled.th`
  text-align: left;
  padding-left: 8px;
  font-size: 14px;
`;
const RightTableHead = styled.th`
  text-align: right;
  padding-right: 8px;
  font-size: 14px;
`;
const TableCell = styled.td`
  padding: 12px 0;
  font-size: 15px;
`;

const RightTableCell = styled(TableCell)`
  text-align: right;
  padding-right: 8px;
`;

const RateCell = styled(RightTableCell)`
  color: ${(props) =>
    props.$positive ? '#f04251' : props.$negative ? '#3485fa' : '#9e9ea4'};
`;

const CartCell = styled(TableCell)`
  width: 35px;
  padding-left: 8px;
`;

export default StockTable;
