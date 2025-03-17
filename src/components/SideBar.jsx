import React, { useState } from "react";
import styled from "styled-components";
import like1 from "../assets/like1.png";
import like2 from "../assets/like2.png"; 
import Stock1 from "../assets/stock1.png"; 
import Stock2 from "../assets/stock2.png"; 
import Recent1 from "../assets/calendar1.png"; 
import Recent2 from "../assets/calendar2.png";
import Live1 from "../assets/fire1.png"; 
import Live2 from "../assets/fire2.png"; 
import WishListPage from "../pages/WishListPage";

const SideBar = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [hoveredButton, setHoveredButton] = useState(null);

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <Container>
      <SidebarButton
        onMouseEnter={() => setHoveredButton("invest")}
        onMouseLeave={() => setHoveredButton(null)}
      >
        <IconWrapper isHovered={hoveredButton === "invest"}>
          <StyledIcon src={hoveredButton === "invest" ? Stock2 : Stock1} />
        </IconWrapper>
        <span>내 투자</span>
      </SidebarButton>

      <SidebarButton
        onClick={toggleSidebar}
        onMouseEnter={() => setHoveredButton("heart")}
        onMouseLeave={() => setHoveredButton(null)}
      >
        <IconWrapper isHovered={isExpanded || hoveredButton === "heart"}>
          <StyledIcon src={isExpanded || hoveredButton === "heart" ? like2 : like1} />
        </IconWrapper>
        <span>관심</span>
      </SidebarButton>

      <SidebarButton
        onMouseEnter={() => setHoveredButton("recent")}
        onMouseLeave={() => setHoveredButton(null)}
      >
        <IconWrapper isHovered={hoveredButton === "recent"}>
          <StyledIcon src={hoveredButton === "recent" ? Recent2 : Recent1} />
        </IconWrapper>
        <span>최근 본</span>
      </SidebarButton>

      <Divider />

      <SidebarButton
        onMouseEnter={() => setHoveredButton("live")}
        onMouseLeave={() => setHoveredButton(null)}
      >
        <IconWrapper isHovered={hoveredButton === "live"}>
          <StyledIcon src={hoveredButton === "live" ? Live2 : Live1} />
        </IconWrapper>
        <span>실시간</span>
      </SidebarButton>

      <WishListPage isOpen={isExpanded} />
    </Container>
  );
};

export default SideBar;

// 스타일 컴포넌트
const Container = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  width: 80px;
  height: 100vh;
  background: #f8f9fa;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 1000;
  border-left: 1px solid #ddd;
  padding-top: 20px;
`;

const SidebarButton = styled.button`
  background: transparent;
  border: none;
  outline: none;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 7px;
  width: 100%;
  transition: background 0.2s ease-in-out;

  &:hover img {
    transform: scale(1.1);
  }

  &:focus {
    outline: none;
  }

  span {
    margin-top: 8px;
    font-size: 13px;
    color: black;
  }
`;

const IconWrapper = styled.div`
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  background: ${(props) => (props.isHovered ? "lightgray" : "transparent")};
  transition: background 0.2s ease-in-out;
`;

const StyledIcon = styled.img`
  width: 25px;
  height: 25px;
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: scale(1.1);
  }
`;

const Divider = styled.div`
  width: 50%;
  height: 1px;
  background: #ccc;
  margin: 10px 0;
`;
