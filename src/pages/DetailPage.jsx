import React, { useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import UserIcon from '../assets/im-icon.png';

const DetailPage = () => {
  const { code } = useParams();
  const [value, setValue] = useState();
  const textareaRef = useRef(null);

  const handleInput = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'; // 초기 높이를 auto로 설정하여 content 크기에 맞게 변경
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`; // 실제 내용에 맞는 높이로 설정
    }
  };

  return (
    <DetailContainer>
      <StockDetailWrapper>
        <StockInfo>
          <StockNameInfo>
            <StockName>서울보증보험</StockName>
            <StockCode>{code}</StockCode>
          </StockNameInfo>
          <StockPriceInfo>
            <StockPrice>37,600원</StockPrice>
            <StockContents>어제보다</StockContents>
            <StockRate>+5,850원(17.7%)</StockRate>
          </StockPriceInfo>
        </StockInfo>
        <IconContainer>
          <IconButton>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              className="line-icon"
            >
              <path
                fill="#B0B8C1"
                d="M10.58 13.294a2.355 2.355 0 11-4.71 0h4.71zm-7.738-6.81a5.384 5.384 0 015.742-5.372c2.86.186 5.025 2.69 5.025 5.557v2.728l.916 1.586a.686.686 0 01-.594 1.03H2.52a.686.686 0 01-.594-1.03l.916-1.586V6.484z"
                fillRule="evenodd"
              ></path>
            </svg>
          </IconButton>
          <IconButton>
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path
                d="m10.904 21.288c.666.44 1.525.44 2.19 0 2.115-1.396 6.72-4.733 8.704-8.467 2.615-4.926-.456-9.839-4.516-9.839-2.314 0-3.706 1.209-4.476 2.248-.324.445-.947.544-1.393.22-.085-.061-.159-.136-.22-.22-.77-1.039-2.162-2.248-4.476-2.248-4.06 0-7.131 4.913-4.515 9.839 1.982 3.734 6.589 7.071 8.702 8.467"
                fill="#b0b8c1"
                fillRule="evenodd"
              ></path>
            </svg>
          </IconButton>
        </IconContainer>
      </StockDetailWrapper>

      <StockCommunityWrapper>
        <StockCommunity>
          <CommunityTitle>서울보증보험 커뮤니티</CommunityTitle>
          <PostingWrapper>
            <UserImageWrapper>
              <img src={UserIcon} alt="user" />
            </UserImageWrapper>
            <Posting>
              <textarea
                placeholder="의견을 남겨보세요"
                ref={textareaRef}
                value={value}
                onInput={handleInput}
                onChange={(e) => setValue(e.target.value)}
              />
              <button>등록</button>
            </Posting>
          </PostingWrapper>
        </StockCommunity>
        <Line></Line>
        <StockCommentWrapper>
          <CommentImageWrapper>
            <img src={UserIcon} alt="user" />
            <div>주주</div>
          </CommentImageWrapper>
          <CommentUserWrapper>
            <Nickname>노웅박스</Nickname>
            <div>흔들림 없는 편안함 ~</div>
          </CommentUserWrapper>
        </StockCommentWrapper>
      </StockCommunityWrapper>
    </DetailContainer>
  );
};

const DetailContainer = styled.div`
  padding: 20px 0 20px 20px;
  padding-right: 100px;
  display: flex;
  flex-direction: column;
`;

const StockDetailWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 20px;
`;

const StockInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const StockNameInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;

const StockName = styled.span`
  font-size: 15px;
  font-weight: bold;
`;

const StockCode = styled.span`
  font-size: 15px;
  font-weight: 600;
  color: #7e7e87;
`;

const StockPriceInfo = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;

const StockPrice = styled.span`
  font-size: 20px;
  font-weight: bold;
`;

const StockContents = styled.span`
  font-size: 14px;
`;

const StockRate = styled.span`
  font-size: 14px;
`;

const IconContainer = styled.div`
  display: flex;
  gap: 10px;
`;

const IconButton = styled.button`
  width: 33px;
  height: 33px;
  display: flex;
  justify-contents: center;
  align-items: center;
  border: none;
  border-radius: 10px;
  background-color: rgba(116, 116, 116, 0.2);
  cursor: pointer;

  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }
`;

const StockCommunityWrapper = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  flex: 1;
  background-color: rgba(245, 245, 245, 0.03);
  border-radius: 20px;
  padding: 20px;
`;

const StockCommunity = styled.div`
  display: flex;
  flex-direction: column;
`;

const CommunityTitle = styled.h2`
  font-size: 18px;
  font-weight: bold;
  padding: 8px;
  margin: 0;
`;

const PostingWrapper = styled.div`
  display: flex;
  gap: 15px;
`;

const UserImageWrapper = styled.div`
  width: 33px;
  height: 33px;
  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }
`;

const Posting = styled.form`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: flex-end;
  gap: 10px;

  textarea {
    width: 100%;
    min-height: 200px;
    max-height: 500px;
    padding: 16px;
    border-radius: 10px;
    background-color: rgba(116, 116, 116, 0.2);
    border: none;
    resize: none;
    box-sizing: border-box;

    @media (prefers-color-scheme: dark) {
      color: white;
    }
  }

  button {
    bottom: 10px;
    right: 10px;
    padding: 6px 12px;
    background-color: #3485fa;
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
  }
`;

const StockCommentWrapper = styled.div`
  display: flex;
  gap: 20px;
`;

const CommentImageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
  width: 33px;

  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }

  div {
    font-size: 12px;
    font-weight: 600;
  }
`;

const CommentUserWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  font-size: 15px;
`;
const Nickname = styled.div`
  font-weight: bold;
`;

const Line = styled.div`
  width: 100%;
  outline: 0.5px solid;
  margin: 20px 0;
`;

export default DetailPage;
