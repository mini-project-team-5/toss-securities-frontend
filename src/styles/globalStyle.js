import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  :root {
    font-family: 'Toss Product Sans', 'Tossface', -apple-system, BlinkMacSystemFont, 'Bazier Square', 'Noto Sans KR', 'Segoe UI', Apple SD Gothic Neo, Roboto, 'Noto Sans KR', 'Helvetica Neue', Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';
    -webkit-font-smoothing: antialiased;
    word-break: keep-all;
    overflow-wrap: break-word;
  }

  body {
    margin: 0;
    padding: 0;
    min-width: 320px;
    min-height: 100vh;
    background-color: #fff;
    color:rgba(0, 12, 30, 0.8);
      line-height: 1.45;
  }

  /* 다크 모드 */
  @media (prefers-color-scheme: dark) {
    body {
      background-color: #17171c;
      color: #e4e4e5;
    }
  }
`;

export default GlobalStyle;
