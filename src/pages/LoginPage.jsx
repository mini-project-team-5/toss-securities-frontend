import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import CloseIcon from "../assets/close.png";
import LogoImage from "../assets/logo.png";
import useAuth from "../hooks/useAuth";

const LoginPage = () => {
  const navigate = useNavigate();
  const { login, user } = useAuth();
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [carrier, setCarrier] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [isChecked, setIsChecked] = useState({
    all: false,
    privacy: false,
    thirdParty: false,
  });

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const handleAllCheck = () => {
    const newState = !isChecked.all;
    setIsChecked({
      all: newState,
      privacy: newState,
      thirdParty: newState,
    });
  };

  const handleSingleCheck = (name) => {
    setIsChecked((prev) => {
      const newState = { ...prev, [name]: !prev[name] };
      newState.all = newState.privacy && newState.thirdParty;
      return newState;
    });
  };

  const handlePhoneNumber = (event) => {
    let value = event.target.value.replace(/\D/g, "");
    if (value.length > 3 && value.length <= 7) {
      value = value.replace(/(\d{3})(\d+)/, "$1 $2");
    } else if (value.length > 7) {
      value = value.replace(/(\d{3})(\d{4})(\d+)/, "$1 $2 $3");
    }
    setPhoneNumber(value);
  };

  const sendVerificationCode = async () => {
    try {
      const response = await fetch("http://localhost:8080/auth/send-verification", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone_number: phoneNumber.replace(/\s/g, "") }),
      });

      const result = await response.text();
      alert(result);
      setIsModalOpen(true);
    } catch (error) {
      console.error("인증번호 요청 오류:", error);
      alert("🚨 인증번호 요청 실패!");
    }
  };

  const verifyCode = async () => {
    try {
      const response = await fetch("http://localhost:8080/auth/verify-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phone_number: phoneNumber.replace(/\s/g, ""),
          verification_code: verificationCode,
        }),
      });

      const result = await response.text();
      if (result.includes("인증 성공")) {
        alert("✅ 인증이 완료되었습니다!");
        setIsVerified(true);
        setIsModalOpen(false);
      } else {
        alert(result);
      }
    } catch (error) {
      console.error("인증 확인 오류:", error);
      alert("🚨 인증 확인 실패!");
    }
  };

  const handleLogin = async () => {
    const requestData = {
      name,
      birth_date: birthDate,
      phone_number: phoneNumber.replace(/\s/g, ""),
    };

    console.log("로그인 요청 데이터:", requestData);

    try {
      const response = await fetch("http://localhost:8080/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(requestData),
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage);
      }

      const data = await response.json();
      console.log("로그인 응답:", data);

      if (data.token) {
        login(data.name, data.token);
        alert("로그인 성공!");
        navigate("/");
      } else {
        alert(data.message || "🚨 로그인 실패! 다시 시도해주세요.");
      }
    } catch (error) {
      console.error("로그인 오류:", error);
      alert("🚨 서버 오류! 잠시 후 다시 시도하세요.");
    }
  };
  

  return (
    <LoginContainer>
      <Logo onClick={() => navigate("/")}>
        <img src={LogoImage} alt="토스증권 로고" />
      </Logo>

      <CloseButton onClick={() => navigate("/")}>
        <img src={CloseIcon} alt="닫기" />
      </CloseButton>

      <Title>토스 앱으로 로그인</Title>

      <LoginBox>
        <TabContainer>
        <Tab $isActive={true}>휴대폰 번호로 로그인</Tab>
        <Tab $isActive={false}>QR코드로 로그인</Tab>
        </TabContainer>

        <InputWrapper>
        <Input type="text" placeholder="이름" value={name} onChange={(e) => setName(e.target.value)} />
          <Input
            type="text"
            placeholder="생년월일 6자리"
            inputMode="numeric"
            pattern="[0-9]*"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value.replace(/\D/g, "").slice(0, 6))}
          />
        </InputWrapper>

        <InputWrapper>
          <CarrierSelect value={carrier} onChange={(e) => setCarrier(e.target.value)}>
            <option value="">통신사</option>
            <option value="SKT">SKT</option>
            <option value="KT">KT</option>
            <option value="LG U+">LG U+</option>
            <option value="SKT 알뜰폰">SKT 알뜰폰</option>
            <option value="KT 알뜰폰">KT 알뜰폰</option>
            <option value="LG U+ 알뜰폰">LG U+ 알뜰폰</option>
          </CarrierSelect>
        <PhoneInput
          type="text"
          placeholder="휴대폰 번호"
          value={phoneNumber}
          onChange={handlePhoneNumber}
          maxLength="13"
        />
      </InputWrapper>
        <CheckboxWrapper>
          <CheckboxInput
            type="checkbox"
            id="agreeAll"
            checked={isChecked.all}
            onChange={handleAllCheck}
          />
          <Label htmlFor="agreeAll">필수 약관에 모두 동의</Label>
        </CheckboxWrapper>

        <CheckboxWrapper>
          <CheckboxInput
            type="checkbox"
            id="agreePrivacy"
            checked={isChecked.privacy}
            onChange={() => handleSingleCheck("privacy")}
          />
          <Label htmlFor="agreePrivacy">개인정보 수집·이용 동의(토스인증서 로그인)</Label>
        </CheckboxWrapper>

        <CheckboxWrapper>
          <CheckboxInput
            type="checkbox"
            id="agreeThirdParty"
            checked={isChecked.thirdParty}
            onChange={() => handleSingleCheck("thirdParty")}
          />
          <Label htmlFor="agreeThirdParty">개인정보 제3자 제공 동의(토스인증서 로그인)</Label>
        </CheckboxWrapper>

        <ActionButton 
          onClick={isVerified ? handleLogin : sendVerificationCode} 
          disabled={!isChecked.all || phoneNumber.length < 10}
        >
          {isVerified ? "로그인" : "인증번호 받기"}
        </ActionButton>

        <OtherLogin>토스 앱 없이 로그인하기</OtherLogin>
      </LoginBox>

      <SignUp>
        아직 토스증권 회원이 아닌가요? <Underline onClick={() => navigate('/signup')}>가입하기</Underline>
      </SignUp>

      {isModalOpen && (
        <ModalBackground>
          <ModalContent>
            <h3>인증번호 입력</h3>
            <VerificationWrapper>
              <VerificationInput
                type="text"
                placeholder="인증번호 입력"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
              />
              <ModalButton onClick={verifyCode}>확인</ModalButton>
            </VerificationWrapper>
          </ModalContent>
        </ModalBackground>
      )}
    </LoginContainer>
  );
};


export default LoginPage;

// 스타일 컴포넌트
const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  height: 100vh;
  width: 100vw;
  background: linear-gradient(to bottom, rgb(202, 229, 253), #ffffff);
  position: relative;
  padding-top: 100px;
`;

const Logo = styled.div`
  position: absolute;
  top: 0;
  left: 17px;
  cursor: pointer;

  img {
    width: 170px;
    height: auto;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 25px;
  background: none;
  border: none;
  cursor: pointer;

  img {
    width: 24px;
    height: 24px;
  }
`;

const Title = styled.h2`
  font-size: 33px;
  color: #3e3e41;
  margin-bottom: 40px;
`;

const LoginBox = styled.div`
  background: white;
  padding: 25px;
  border-radius: 20px;
  width:360px;
  height: 410px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  transform: translateY(-20px);
`;

const TabContainer = styled.div`
  display: flex;
  width: 100%;
  margin-bottom: 20px;
`;

const Tab = styled.div`
  flex: 1;
  padding: 12px;
  font-size: 16px;
  font-weight: bold;
  text-align: center;
  cursor: ${({ $isActive }) => ($isActive ? "pointer" : "default")}; 
  color: ${({ $isActive }) => ($isActive ? "#3E3E41" : "#97999F")}; 
  background: ${({ $isActive }) => ($isActive ? "#f1f3f5" : "transparent")}; 
  border-radius: 50px;
  transition: background 0.2s ease-in-out;
`;


const InputWrapper = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
  margin-top: 10px;
  width: 100%;
`;

const Input = styled.input`
  width: 50%;
  padding: 13px;
  border: 1px solid #ddd;
  border-radius: 15px;
  font-size: 16px;
  font-weight: bold;

  &[type="text"]:nth-of-type(2) {
    ime-mode: disabled;
  }
    
  &:focus {
    outline: none;
    border-color: #1a73e8;
  }  
`;

const CarrierSelect = styled.select`
  width: 50%;
  padding: 13px;
  border: 1px solid #ddd;
  border-radius: 15px;
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 10px;
  color: #3e3e41;
  cursor: pointer;
  &:focus {
    outline: none;
    border-color: #1a73e8;
  }
`;

const PhoneInput = styled.input`
  width: 50%; // Adjusted from 0.4 to take remaining space
  padding: 13px;
  border: 1px solid #ddd;
  border-radius: 15px;
  font-size: 15px;
  font-weight: bold;
  margin-bottom: 10px;
  margin-left: 5px;
  color: #3e3e41;
  &:focus {
    outline: none;
    border-color: #1a73e8;
  }
`;

const CheckboxWrapper = styled.label`
  display: flex;
  align-items: center;
  margin: 3px 0;
  cursor: pointer;
  width: 100%;
`;

const CheckboxInput = styled.input`
  margin-right: 7px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  `;

const Label = styled.span`
  font-size: 12px;
  color: #3e3e41;
`;

const ActionButton = styled.button`
  width: 100%;
  padding: 12px;
  margin-top: 14px;
  background: ${({ disabled }) => (disabled ? "#ccc" : "#1a73e8")};
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 14px;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};

  &:hover {
    background: ${({ disabled }) => (disabled ? "#ccc" : "#005ecb")};
  }
`;

const OtherLogin = styled.p`
  font-size: 12px;
  text-decoration: underline;
  color:rgb(100, 100, 104);
  margin-top: 25px;
  cursor: pointer;

  border-top: 1px solid #ddd;
  padding-top: 20px;
  width: 100%; 
  text-align: center;
`;

const SignUp = styled.p`
  font-size: 13px;
  color: #97999f;
  margin-top: 20px;
  font-weight: bold;
`;

const Underline = styled.span`
  text-decoration: underline;
  color: #1a73e8;
  font-weight: bold;
  cursor: pointer;
`;

const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background: white;
  padding: 30px;
  border-radius: 10px;
  text-align: center;
  width: 300px;
`;

const VerificationWrapper = styled.div`
  display: flex;
  align-items: stretch;
  width: 100%;
`;

const ModalButton = styled.button`
  width: 80px;
  height: 40px;
  background: #1a73e8;
  color: white;
  border: none;
  cursor: pointer;

  &:hover {
    background: #005ecb;
  }
`;

const VerificationInput = styled.input`
  flex: 1;
  padding: 12px;
  border: 1px solid #ddd;
`;