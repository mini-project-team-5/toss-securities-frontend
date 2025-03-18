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
  const [isChecked, setIsChecked] = useState({
    all: false,
    service: false,
    policy: false,
    privacy: false,
  });
  const [formComplete, setFormComplete] = useState(false);

  // 입력 필드 완성 여부 확인
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

  // 생년월일 앞 6자리 입력 처리
  const handleBirthDateChange = (e) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 6);
    console.log("생년월일 입력:", value);
    setBirthDate(value);
  };

  // 주민번호 뒷자리 첫 숫자 입력 처리
  const handleGenderDigitChange = (e) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 1);
    console.log("성별 숫자 입력:", value);
    setGenderDigit(value);
  };

  // 휴대폰 번호 입력 처리 (000 0000 0000 형식으로 포맷팅)
  const handlePhoneNumberChange = (e) => {
    const value = e.target.value.replace(/\D/g, "");
    console.log("휴대폰 번호 입력 (원본):", value);
    
    // 포맷팅: 000 0000 0000 형식
    let formattedValue = "";
    if (value.length > 0) {
      // 첫 번째 부분 (통상 3자리)
      formattedValue = value.slice(0, 3);
      
      // 두 번째 부분 (통상 4자리)
      if (value.length > 3) {
        formattedValue += " " + value.slice(3, 7);
      }
      
      // 세 번째 부분 (통상 4자리)
      if (value.length > 7) {
        formattedValue += " " + value.slice(7, 11);
      }
    }
    
    console.log("휴대폰 번호 포맷팅:", formattedValue);
    setPhoneNumber(formattedValue);
  };

  // 필수 약관 동의 시 전체 선택
  const handleAllCheck = () => {
    const newState = !isChecked.all;
    setIsChecked({
      all: newState,
      service: newState,
      policy: newState,
      privacy: newState,
    });
  };

  // 개별 체크박스 선택 시 상태 업데이트
  const handleSingleCheck = (name) => {
    setIsChecked((prev) => {
      const newState = { ...prev, [name]: !prev[name] };
      newState.all = newState.service && newState.policy && newState.privacy;
      return newState;
    });
  };

  return (
    <SignupContainer>
      {/* 좌측 상단 로고 */}
      <Logo onClick={() => navigate("/")}>
        <img src={LogoImage} alt="토스증권 로고" />
      </Logo>

      {/* 우측 상단 닫기 버튼 */}
      <CloseButton onClick={() => navigate("/")}>
        <img src={CloseIcon} alt="닫기" />
      </CloseButton>

      {/* 제목 */}
      <Title>회원가입</Title>

      {/* 회원가입 폼 */}
      <SignupBox>
        <NameInput 
          type="text" 
          placeholder="이름" 
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <InputWrapper>
          <BirthDateInput
            type="text"
            placeholder="생년월일"
            value={birthDate}
            onChange={handleBirthDateChange}
          />
          <Hyphen>-</Hyphen>
          {/* MaskedInputWrapper 제거하고 각 요소를 분리 */}
          <GenderInput
            type="text"
            value={genderDigit}
            onChange={handleGenderDigitChange}
            maxLength="1"
          />
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

        <SignupButton disabled={!formComplete} onClick={() => alert("인증번호가 발송되었습니다.")}>
          인증번호 받기
        </SignupButton>

        <OtherLogin onClick={() => navigate("/login")}>토스 앱으로 로그인</OtherLogin>
      </SignupBox>

      <SignUp>
        아직 토스증권 회원이 아니신가요?{" "}
        <Underline onClick={() => navigate("/signup")}>가입하기</Underline>
      </SignUp>
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