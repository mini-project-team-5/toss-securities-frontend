import React, { useState } from 'react';
import styled from 'styled-components';

const tabList = [
  { label: '실시간', value: 'real-time' },
  { label: '1일', value: 'one-day' },
  { label: '1개월', value: 'one-month' },
  { label: '3개월', value: 'three-month' },
  { label: '6개월', value: 'six-month' },
  { label: '1년', value: 'one-year' },
];

const TimeTab = () => {
  const [activeTab, setActiveTab] = useState('real-time');

  return (
    <TabContainer>
      <TabHead>
        {tabList.map((tab) => (
          <TabButton
            key={tab.value}
            onClick={() => setActiveTab(tab.value)}
            $isActive={activeTab === tab.value}
          >
            {tab.label}
          </TabButton>
        ))}
      </TabHead>
    </TabContainer>
  );
};

const TabContainer = styled.div`
  margin: 8px 0;
  display: flex;
  justify-content: space-between;
`;

const TabHead = styled.div`
  display: flex;
  gap: 5px;
  font-size: 14px;
`;

const TabButton = styled.button`
  all: unset;
  cursor: pointer;
  padding: 8px 12px;
  border-radius: 40px;
  background-color: ${(props) =>
    props.$isActive ? 'rgba(116, 116, 116, 0.2)' : 'transparent'};
  transition: background-color 0.2s;
`;

export default TimeTab;
