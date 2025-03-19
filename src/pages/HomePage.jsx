import React, { useState } from 'react';
import styled from 'styled-components';
import Tab from '../components/Tab';
import { useTab } from '../hooks/useTab';
import StockTable from '../components/StockTable';
import TimeTab from '../components/TimeTab';

import { Pagination, Stack } from '@mui/material';

const tabList = [
  { label: '토스증권 거래대금', value: 'toss-price' },
  { label: '토스증권 거래량', value: 'toss-volume' },
  { label: '거래대금', value: 'price' },
  { label: '거래량', value: 'volume' },
  { label: '급상승', value: 'up' },
  { label: '급하락', value: 'down' },
  { label: '인기', value: 'popular' },
];

const stockList = [
  {
    code: '0123',
    rank: 1,
    name: 'KODEX 200선물인버스 2X',
    price: 2090,
    rate: -2.5,
    volume: 8621997,
  },
  {
    code: '0456',
    rank: 2,
    name: '삼성전자',
    price: 71500,
    rate: 1.2,
    volume: 3021500,
  },
  {
    code: '0789',
    rank: 3,
    name: 'SK하이닉스',
    price: 129000,
    rate: -0.8,
    volume: 1209400,
  },
  {
    code: '1011',
    rank: 4,
    name: 'LG에너지솔루션',
    price: 380000,
    rate: 0.5,
    volume: 890210,
  },
  {
    code: '1213',
    rank: 5,
    name: 'NAVER',
    price: 190500,
    rate: -1.0,
    volume: 772000,
  },
  {
    code: '1415',
    rank: 6,
    name: '카카오',
    price: 57500,
    rate: 2.3,
    volume: 654300,
  },
  {
    code: '1617',
    rank: 7,
    name: 'POSCO홀딩스',
    price: 542000,
    rate: 0.9,
    volume: 318700,
  },
  {
    code: '1819',
    rank: 8,
    name: '현대차',
    price: 230500,
    rate: -1.5,
    volume: 489000,
  },
  {
    code: '2021',
    rank: 9,
    name: '기아',
    price: 104500,
    rate: 1.8,
    volume: 495100,
  },
  {
    code: '2223',
    rank: 10,
    name: '셀트리온',
    price: 170200,
    rate: -0.4,
    volume: 265500,
  },
  {
    code: '2425',
    rank: 11,
    name: 'LG화학',
    price: 573000,
    rate: 0.7,
    volume: 147800,
  },
];

const ITEMS_PER_PAGE = 10;

const HomePage = () => {
  const { currentTab, setTab } = useTab('volume');
  const handleTabClick = (tab) => {
    setTab(tab);
  };
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const currentTime = `${hours}:${minutes}`;

  const [currentPage, setCurrentPage] = useState(1);
  //   const totalPages = Math.ceil(stockList.length / ITEMS_PER_PAGE);

  const currentData = stockList.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  const handlePageChange = (event, pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <HomePageContainer>
      <StockList>
        <TitleWrapper>
          <Title>실시간 차트</Title>
          <Time>오늘 {currentTime} 기준 </Time>
        </TitleWrapper>

        <Tab
          tabs={tabList}
          activeTab={currentTab}
          onTablClick={handleTabClick}
        />
        <TimeTab />
        <StockTable datas={currentData} />

        {/* 페이지네이션 */}
        <Stack
          spacing={2}
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            margin: '20px 0',
          }}
        >
          <Pagination
            page={currentPage}
            count={10}
            onChange={handlePageChange}
            sx={{
              '& .MuiPaginationItem-root': {
                color: '#6b7684',
              },
              '& .MuiPaginationItem-previousNext': {
                color: '#6b7684',
              },
              '& .MuiPaginationItem-root.Mui-selected': {
                backgroundColor: 'rgba(116, 116, 116, 0.2)',
                color: 'black',
              },
              '@media (prefers-color-scheme: dark)': {
                '& .MuiPaginationItem-root': {
                  color: '#9e9ea4',
                },
                '& .MuiPaginationItem-previousNext': {
                  color: '9e9ea4',
                },
                '& .MuiPaginationItem-root.Mui-selected': {
                  backgroundColor: 'rgba(116, 116, 116, 0.2)',
                  color: 'white',
                },
              },
            }}
          />
        </Stack>
      </StockList>
      {/* <VerticleLineWrapper>
        <div></div>
      </VerticleLineWrapper> */}
    </HomePageContainer>
  );
};

export default HomePage;

const HomePageContainer = styled.div`
  // max-width: 1200px;
  // margin: 0 auto;
  // padding-right: 80px;

  display: flex;
  justify-content: center;
  align-items: center;
  padding-left: 100px;
  padding-right: 180px;
`;
const StockList = styled.div`
  width: 100%;
  margin-top: 16px;
  flex-shrink: 0;
`;

const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
`;
const Title = styled.div`
  font-size: 20px;
  font-weight: bold;
  padding: 8px;
`;
const Time = styled.div`
  font-size: 14px;
  color: #9e9ea4;
`;

const VerticleLineWrapper = styled.div`
  margin: 0 50px;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  div {
    width: 1px;
    height: 100%;

    background: linear-gradient(
        to top,
        rgba(151, 170, 198, 0.2) 0%,
        rgba(116, 116, 116, 0.5) 50%,
        rgba(151, 170, 198, 0.2) 100%
      );
    }
  }
`;
