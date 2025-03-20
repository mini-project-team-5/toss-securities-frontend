import { useState, useEffect } from "react";

const isTokenValid = (token) => {
  if (!token) return false; // 토큰이 없으면 유효하지 않음

  try {
    const payload = JSON.parse(atob(token.split(".")[1])); // JWT Payload 디코딩
    const exp = payload.exp * 1000; // 만료 시간 (초 단위 → 밀리초 변환)
    return exp > Date.now(); // 현재 시간보다 크면 유효한 토큰
  } catch (error) {
    console.error("토큰 검증 실패:", error);
    return false;
  }
};

const useAuth = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = sessionStorage.getItem("authToken");
    const userName = sessionStorage.getItem("userName");

    if (token && userName) {
      if (isTokenValid(token)) {
        setUser({ name: userName, token });
      } else {
        console.warn("토큰이 만료되었습니다. 자동 로그아웃 실행");
        logout();
      }
    }
  }, []);

  const login = (name, token) => {
    if (!isTokenValid(token)) {
      console.error("유효하지 않은 토큰. 로그인 실패");
      return;
    }

    sessionStorage.setItem("authToken", token);
    sessionStorage.setItem("userName", name);
    setUser({ name, token });
  };

  const logout = () => {
    console.log("로그아웃 처리됨");
    sessionStorage.removeItem("authToken");
    sessionStorage.removeItem("userName");
    setUser(null);
    window.location.href = "/login";
  };

  return { user, login, logout };
};

export default useAuth;
