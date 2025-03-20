import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import CloseIcon from "../assets/close.png";
import LogoImage from "../assets/logo.png";


const SignupPage = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [genderDigit, setGenderDigit] = useState("");
  const [carrier, setCarrier] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [verificationCode, setVerificationCode] = useState("");

  const [isChecked, setIsChecked] = useState({
    all: false,
    service: false,
    policy: false,
    privacy: false,
  });

  const [formComplete, setFormComplete] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const isFormFilled = 
      name.trim() !== "" && 
      birthDate.length === 6 && 
      genderDigit.length === 1 &&
      carrier !== "" && 
      phoneNumber.replace(/\s/g, "").length >= 10 &&
      isChecked.all;
    
    setFormComplete(isFormFilled);
  }, [name, birthDate, genderDigit, carrier, phoneNumber, isChecked]);

  const handleBirthDateChange = (e) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 6);
    console.log("생년월일 입력:", value);
    setBirthDate(value);
  };

  const handleGenderDigitChange = (e) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 1);
    console.log("성별 숫자 입력:", value);
    setGenderDigit(value);
  };

  const handlePhoneNumberChange = (e) => {
    const value = e.target.value.replace(/\D/g, "");
    console.log("휴대폰 번호 입력 (원본):", value);
    
    let formattedValue = "";
    if (value.length > 0) {
      formattedValue = value.slice(0, 3);
      if (value.length > 3) formattedValue += " " + value.slice(3, 7);
      if (value.length > 7) formattedValue += " " + value.slice(7, 11);
    }
    
    console.log("휴대폰 번호 포맷팅:", formattedValue);
    setPhoneNumber(formattedValue);
  };

  const handleAllCheck = () => {
    const newState = !isChecked.all;
    setIsChecked({
      all: newState,
      service: newState,
      policy: newState,
      privacy: newState,
    });
  };

  const handleSingleCheck = (name) => {
    setIsChecked((prev) => {
      const newState = { ...prev, [name]: !prev[name] };
      newState.all = newState.service && newState.policy && newState.privacy;
      return newState;
    });
  };

  const handleRequestVerification = () => {
    fetch("http://localhost:8080/auth/send-verification", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phone_number: phoneNumber.replace(/\s/g, "") }),
    })
      .then((response) => response.text())
      .then((message) => {
        alert(message);
        setIsModalOpen(true);
      })
      .catch((error) => console.error("인증번호 요청 오류:", error));
  };

  const handleSignup = () => {
    const fullBirthDate = `${birthDate}${genderDigit}`;
    const requestData = {
      name,
      birth_date: fullBirthDate,
      phone_number: phoneNumber.replace(/\s/g, ""),
      carrier,
      verification_code: verificationCode,
    };

    console.log("📢 회원가입 요청 데이터:", requestData);

    fetch("http://localhost:8080/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestData),
    })
    .then(async (response) => {
      const text = await response.text();

      try {
        const jsonData = JSON.parse(text); 
        return { status: response.status, data: jsonData };
      } catch {
        return { status: response.status, data: text };
      }
    })
    .then(({ status, data }) => {
      console.log("🔹 서버 응답 상태 코드:", status);
      console.log("🔹 서버 응답 데이터:", data);

      if (status === 200 && data) {
        navigate("/login");
      } else if (status === 400) {
        alert(data?.message || "회원가입 실패! 입력 값을 확인해주세요.");
      } else {
        alert("회원가입에 실패했습니다. 나중에 다시 시도해주세요.");
      }
    })
    .catch((error) => {
      console.error("🚨 서버 오류:", error);
      alert("서버 오류 발생! 다시 시도해주세요.");
    });
};


  return (
    <SignupContainer>
      <Logo onClick={() => navigate("/")}>
        <img src={LogoImage} alt="토스증권 로고" />
      </Logo>

      <CloseButton onClick={() => navigate("/")}>
        <img src={CloseIcon} alt="닫기" />
      </CloseButton>

      <Title>회원가입</Title>

      <SignupBox>
      <NameInput type="text" placeholder="이름" value={name} onChange={(e) => setName(e.target.value)} />
        <InputWrapper>
          <BirthDateInput type="text" placeholder="생년월일" value={birthDate} onChange={handleBirthDateChange} />
          <Hyphen>-</Hyphen>
          <GenderInput type="text" value={genderDigit} onChange={handleGenderDigitChange} maxLength="1" />
          <MaskedText>●●●●●●</MaskedText>
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
            onChange={handlePhoneNumberChange}
          />
        </InputWrapper>

        {/* 약관 체크박스 */}
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
            id="agreeService"
            checked={isChecked.service}
            onChange={() => handleSingleCheck("service")}
          />
          <Label htmlFor="agreeService">휴대폰 본인확인 서비스 약관동의</Label>
        </CheckboxWrapper>

        <CheckboxWrapper>
          <CheckboxInput
            type="checkbox"
            id="agreePolicy"
            checked={isChecked.policy}
            onChange={() => handleSingleCheck("policy")}
          />
          <Label htmlFor="agreePolicy">준회원 이용약관</Label>
        </CheckboxWrapper>

        <CheckboxWrapper>
          <CheckboxInput
            type="checkbox"
            id="agreePrivacy"
            checked={isChecked.privacy}
            onChange={() => handleSingleCheck("privacy")}
          />
          <Label htmlFor="agreePrivacy">개인(신용)정보 수집이용 동의</Label>
        </CheckboxWrapper>

        <SignupButton disabled={!formComplete} onClick={handleRequestVerification}>
          인증번호 받기
        </SignupButton>

        <OtherLogin onClick={() => navigate("/login")}>토스 앱으로 로그인</OtherLogin>
      </SignupBox>
      <SignUp>
        아직 토스증권 회원이 아니신가요?{" "}
        <Underline onClick={() => navigate("/signup")}>가입하기</Underline>
      </SignUp>
        {/* 인증번호 입력 모달 */}
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
          <ModalButton onClick={handleSignup}>확인</ModalButton>
          </VerificationWrapper>
        </ModalContent>
      </ModalBackground>
    )}
    </SignupContainer>
  );
};

export default SignupPage;

// 스타일 컴포넌트
const SignupContainer = styled.div`
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
  margin-bottom: 20px;
`;

const SignupBox = styled.div`
  background: white;
  padding: 20px;
  border-radius: 20px;
  width: 370px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

const NameInput = styled.input`
  width: 90%;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 15px;
  font-size: 15px;
  font-weight: bold;
  margin-bottom: 10px;
  color: #3e3e41;
  &:focus {
    outline: none;
    border-color: #1a73e8;
  }
`;

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 10px;
  width: 100%;
`;

const BirthDateInput = styled.input`
  width: 40%;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 15px;
  font-size: 15px;
  font-weight: bold;
  color: #3e3e41;
  &:focus {
    outline: none;
    border-color: #1a73e8;
  }
`;

const GenderInput = styled.input`
  width: 30px;
  padding: 15px;
  border: none;
  border: 1px solid #ddd;
  border-radius: 15px;
  text-align: center;
  font-size: 16px;
  font-weight: bold;
  color: #3e3e41;
  &:focus {
    outline: none;
    border-color: #1a73e8;
  }
`;

const CarrierSelect = styled.select`
  width: 50%;
  padding: 15px;
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
  padding: 15px;
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

const Hyphen = styled.span`
  font-size: 18px;
  font-weight: bold;
  padding: 0;
  margin-bottom: 10px;
  color: #3e3e41;
`;

const MaskedText = styled.div`
  font-size: 16px;
  color: #3e3e41;
  margin-bottom: 10px;
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

const Label = styled.label`
  font-size: 12px;
  color: #3e3e41;
  cursor: pointer;
`;

const SignupButton = styled.button`
  width: 100%;
  padding: 11px;
  background: #1a73e8;
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  margin-top: 20px;
  transition: background 0.2s ease-in-out;
  opacity: ${({ disabled }) => (disabled ? "0.5" : "1")};
  pointer-events: ${({ disabled }) => (disabled ? "none" : "auto")};
  &:hover {
    background: #005ecb;
  }

  &:focus {
    outline: none;
  }
`;

const OtherLogin = styled.p`
  font-size: 12px;
  text-decoration: underline;
  color: rgb(100, 100, 104);
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
  cursor: pointer;
  color: #1a73e8;
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
  //margin-top: 10px;
  width: 90px; /* 버튼 크기 고정 */
  height: 40px;
  background: #1a73e8;
  color: white;
  border: none;
  //border-radius: 0 10px 10px 0;
  cursor: pointer;
  transition: background 0.2s ease-in-out;

  &:hover {
    background: #005ecb;
  }

`;

const VerificationInput = styled.input`
  padding: 12px;
  flex: 1;
  //margin-top: 10px;
  border: 1px solid #ddd;
  &:focus {
    outline: none;
    border-color: #1a73e8;
  }
`;