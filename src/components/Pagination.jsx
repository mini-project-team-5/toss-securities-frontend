// import React from 'react';
// import styled from 'styled-components';

// const Pagination = ({ totalPages, currentPage, onPageChange }) => {
//   const pageNumbers = [];

//   // 페이지 번호 배열 생성 (현재 페이지를 기준으로 앞뒤로 몇 개의 페이지를 보여줄지 설정)
//   for (let i = 1; i <= totalPages; i++) {
//     pageNumbers.push(i);
//   }

//   const handleClick = (pageNumber) => {
//     if (pageNumber >= 1 && pageNumber <= totalPages) {
//       onPageChange(pageNumber);
//     }
//   };

//   const renderPageNumbers = () => {
//     const range = 3; // 현재 페이지를 기준으로 앞뒤 3개의 페이지를 보여주기

//     // 페이지 번호가 연속적으로 보이도록 하기 위해 "..."과 "이전", "다음" 버튼을 처리
//     if (totalPages <= 5) {
//       return pageNumbers.map((num) => (
//         <PageButton
//           key={num}
//           $isActive={num === currentPage}
//           onClick={() => handleClick(num)}
//         >
//           {num}
//         </PageButton>
//       ));
//     }

//     if (currentPage <= range) {
//       // 첫 번째 그룹
//       return [
//         ...[...pageNumbers.slice(0, 5)].map((num) => (
//           <PageButton
//             key={num}
//             $isActive={num === currentPage}
//             onClick={() => handleClick(num)}
//           >
//             {num}
//           </PageButton>
//         )),
//         <Dot key="dots">...</Dot>,
//         <PageButton
//           key={totalPages}
//           $isActive={totalPages === currentPage}
//           onClick={() => handleClick(totalPages)}
//         >
//           {totalPages}
//         </PageButton>,
//       ];
//     }

//     if (currentPage >= totalPages - range) {
//       // 마지막 그룹
//       return [
//         <PageButton
//           key={1}
//           $isActive={1 === currentPage}
//           onClick={() => handleClick(1)}
//         >
//           {1}
//         </PageButton>,
//         <Dot key="dots">...</Dot>,
//         ...[...pageNumbers.slice(totalPages - 5)].map((num) => (
//           <PageButton
//             key={num}
//             $isActive={num === currentPage}
//             onClick={() => handleClick(num)}
//           >
//             {num}
//           </PageButton>
//         )),
//       ];
//     }

//     // 중앙 부분
//     return [
//       <PageButton
//         key={1}
//         $isActive={1 === currentPage}
//         onClick={() => handleClick(1)}
//       >
//         {1}
//       </PageButton>,
//       <Dot key="dots">...</Dot>,
//       ...[
//         ...pageNumbers.slice(currentPage - range - 1, currentPage + range),
//       ].map((num) => (
//         <PageButton
//           key={num}
//           $isActive={num === currentPage}
//           onClick={() => handleClick(num)}
//         >
//           {num}
//         </PageButton>
//       )),
//       <Dot key="dots2">...</Dot>,
//       <PageButton
//         key={totalPages}
//         $isActive={totalPages === currentPage}
//         onClick={() => handleClick(totalPages)}
//       >
//         {totalPages}
//       </PageButton>,
//     ];
//   };

//   return (
//     <PaginationContainer>
//       {/* "이전" 버튼 */}
//       <PageButton
//         onClick={() => handleClick(currentPage - 1)}
//         disabled={currentPage === 1}
//       >
//         &lt;
//       </PageButton>

//       {renderPageNumbers()}

//       {/* "다음" 버튼 */}
//       <PageButton
//         onClick={() => handleClick(currentPage + 1)}
//         disabled={currentPage === totalPages}
//       >
//         &gt;
//       </PageButton>
//     </PaginationContainer>
//   );
// };

// const PaginationContainer = styled.div`
//   display: flex;
//   justify-content: center;
//   gap: 8px;
//   margin-top: 20px;
// `;

// const PageButton = styled.button`
//   padding: 8px 16px;
//   border-radius: 4px;
//   border: 1px solid #ddd;
//   background-color: ${(props) => (props.$isActive ? '#3182f6' : '#f0f0f0')};
//   color: ${(props) => (props.$isActive ? '#fff' : '#000')};
//   cursor: pointer;
//   &:disabled {
//     cursor: not-allowed;
//     background-color: #e0e0e0;
//   }
//   &:hover {
//     background-color: ${(props) => (props.$isActive ? '#3182f6' : '#ddd')};
//   }
// `;

// const Dot = styled.span`
//   padding: 8px 16px;
//   font-size: 16px;
//   color: #888;
// `;

// export default Pagination;
