import React from "react";
import styled from "styled-components";

const Home = () => {
  return (
    <HomeContainer>
      <h1>홈 화면</h1>
    </HomeContainer>
  );
};

export default Home;

// 스타일 컴포넌트
const HomeContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 20px;
`;
