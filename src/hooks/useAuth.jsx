import { useState, useEffect, useCallback } from "react";
import axiosInstance from "../utils/axiosInstance";

const isTokenValid = (token) => {
  if (!token) return false;
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.exp * 1000 > Date.now();
  } catch (error) {
    console.error("토큰 검증 실패:", error);
    return false;
  }
};

const useAuth = () => {
  const [user, setUser] = useState(null);
  const [addedItems, setAddedItems] = useState([]);

  // 위시리스트 가져오기 함수
  const fetchWishlist = useCallback(async () => {
    if (!user) return;
    try {
      const response = await axiosInstance.get("/api/wishlist");
      setAddedItems(response.data.map((item) => item.stock.code));
    } catch (error) {
      console.error("위시리스트 가져오기 실패:", error);
    }
  }, [user]);

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

  useEffect(() => {
    if (user) {
      fetchWishlist();
    }
  }, [user, fetchWishlist]);

  const addToWishlist = async (stock) => {
    if (!user) {
      alert("로그인이 필요합니다!");
      window.location.href = "/login";
      return;
    }
    try {
      await axiosInstance.post("/api/wishlist", { stock });
      setAddedItems((prev) => [...prev, stock.code]);
      await fetchWishlist(); // 위시리스트 최신화
    } catch (error) {
      console.error("위시리스트 추가 실패:", error);
    }
  };

  const removeFromWishlist = async (stock) => {
    if (!user) {
      alert("로그인이 필요합니다!");
      window.location.href = "/login";
      return;
    }
    try {
      await axiosInstance.delete(`/api/wishlist/${stock.code}`);
      setAddedItems((prev) => prev.filter((code) => code !== stock.code));
      await fetchWishlist(); // 위시리스트 최신화
    } catch (error) {
      console.error("위시리스트 삭제 실패:", error);
    }
  };

  const login = (name, token) => {
    if (!isTokenValid(token)) {
      console.error("유효하지 않은 토큰. 로그인 실패");
      return;
    }

    sessionStorage.setItem("authToken", token);
    sessionStorage.setItem("userName", name);
    setUser({ name, token });

    fetchWishlist();
  };

  const logout = () => {
    console.log("로그아웃 처리됨");
    sessionStorage.removeItem("authToken");
    sessionStorage.removeItem("userName");
    setUser(null);
    setAddedItems([]);
    window.location.href = "/login";
  };

  return { user, addedItems, addToWishlist, removeFromWishlist, login, logout };
};

export default useAuth;
