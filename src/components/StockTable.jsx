import { useCallback } from 'react';
import styled from 'styled-components';
import CartButton from './CartButton';
import { useNavigate } from 'react-router-dom';
//import axiosInstance from '../utils/axiosInstance';
import useAuth from '../hooks/useAuth';

const StockTable = ({ datas }) => {
  const navigate = useNavigate();
  const { user, addedItems, addToWishlist, removeFromWishlist } = useAuth();
  //const [addedItems, setAddedItems] = useState([]);

  // const checkLogin = useCallback(
  //   () => !!sessionStorage.getItem('authToken'),
  //   [],
  // );

  const checkLogin = useCallback(() => !!user, [user]);

  // const getWishList = useCallback(async () => {
  //   try {
  //     const response = await axiosInstance.get('/api/wishlist');
  //     setAddedItems(response.data.map((item) => item.stock.code));
  //   } catch (error) {
  //     console.error('위시리스트 가져오기 실패:', error);
  //   }
  // }, []);

  // useEffect(() => {
  //   getWishList();
  // }, [getWishList]);

  const handleClickWish = async (stock, e) => {
    e.stopPropagation();

    if (!checkLogin()) {
      alert('로그인이 필요합니다!');
      window.location.href = '/login';
      return;
    }

  //   try {
  //     if (addedItems.includes(stock.code)) {
  //       await axiosInstance.delete(`/api/wishlist/${stock.code}`);
  //       setAddedItems((prev) => prev.filter((code) => code !== stock.code));
  //     } else {
  //       await axiosInstance.post('/api/wishlist', { stock });
  //       setAddedItems((prev) => [...prev, stock.code]);
  //     }
  //   } catch (error) {
  //     console.error('위시리스트 업데이트 실패:', error);
  //   }
  // };

    if (addedItems.includes(stock.code)) {
      removeFromWishlist(stock);
    } else {
      addToWishlist(stock);
    }
  };

  const isItemAdded = (stockCode) => {
    return addedItems.includes(stockCode);
  };

  const handleNavigate = useCallback(
    (code) => {
      navigate(`/stock/${code}`);
    },
    [navigate],
  );

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
                onClick={() => handleNavigate(stock.code)}
              >
                <CartCell>
                  <CartButton
                    onClick={(e) => handleClickWish(stock, e)}
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
    &:hover {
      background-color: rgba(116, 116, 116, 0.2);
    }
  }
  tbody tr:nth-child(odd) {
    background-color: rgba(245, 245, 245, 0.03);
    &:hover {
      background-color: rgba(116, 116, 116, 0.2);
    }
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
