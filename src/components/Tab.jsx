import React from 'react';
import styled from 'styled-components';

const Tab = ({ tabs, activeTab, onTablClick }) => {
  return (
    <TabContainer>
      <TabHeadWrapper>
        <TabHead>
          {tabs.map((tab) => (
            <TabButton
              key={tab.value}
              $isActive={activeTab === tab.value}
              onClick={() => onTablClick(tab.value)}
            >
              {tab.label}
            </TabButton>
          ))}
        </TabHead>
        <Checkbox>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="15"
            height="15"
            viewBox="0 0 40 40"
            className=""
          >
            <path
              d="M40 20c0 11-9 20-20 20S0 31 0 20 9 0 20 0s20 9 20 20"
              fillRule="evenodd"
              clipRule="evenodd"
              fill="#3182f6"
            ></path>
            <path
              fill="none"
              stroke="#fff"
              strokeWidth="3.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M11.8 19.4l6.2 6.2 10.2-10.1"
            ></path>
          </svg>
          <span>투자위험 주식 숨기기</span>
        </Checkbox>
      </TabHeadWrapper>
    </TabContainer>
  );
};

const TabContainer = styled.div`
  margin-top: 8px;
  padding: 0 8px;
`;
const TabHeadWrapper = styled.div`
  display: flex;
  justify-content: space-between;

  border-bottom: 1px solid rgba(116, 116, 116, 0.5);

  label {
    font-size: 14px;
  }
`;

const TabHead = styled.div`
  display: flex;
  gap: 15px;
  font-size: 15px;
`;
const TabButton = styled.button`
  all: unset;
  cursor: pointer;
  padding: 8px 0;
  border-bottom: ${(props) => (props.$isActive ? '1px solid white' : 'none')};
`;

const Checkbox = styled.button`
  all: unset;
  cursor: pointer;
  font-size: 14px;
  color: #449bff;
  display: flex;
  align-items: center;
  gap: 5px;

  svg {
    border-radius: 50%;
    background-color: #449bff;
  }
`;

export default Tab;
