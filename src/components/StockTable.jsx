import { useEffect, useState } from 'react';
import styled from 'styled-components';
import CartButton from './CartButton';

const StockTable = ({ datas }) => {
  const [addedItems, setAddedItems] = useState([]);

  // 로그인 여부 확인
  const checkLogin = () => {
    return true; // 임시로 true 설정
  };

  // 장바구니 상태 불러오기
  useEffect(() => {
    const savedItems = JSON.parse(localStorage.getItem('addedItems')) || []; // 임시로 로컬스토리지, 실제는 api 통신
    setAddedItems(savedItems);
  }, []);

  const handleAddtoCart = (stock) => {
    try {
      if (!checkLogin()) {
        alert('로그인이 필요합니다!');
        window.location.href = '/login';
        return;
      }

      // 장바구니 추가 api 호출 로직 추가
      // ...

      const newAddedItems = [...addedItems, stock.rank];
      setAddedItems(newAddedItems);
      alert('장바구니 추가 완료');
    } catch (error) {
      console.log('장바구니 추가 실패: ', error);
    }
  };

  const isItemAdded = (stockRank) => {
    return addedItems.includes(stockRank);
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
              <TableRow key={stock.rank}>
                <CartCell>
                  <CartButton
                    onClick={() => handleAddtoCart(stock)}
                    isAdded={isItemAdded(stock.rank)}
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
