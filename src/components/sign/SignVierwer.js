import React, { useState } from "react";
import Banks from "./Banks";
import {
  Label,
  InputContainer,
  Input,
  Form,
  BankContainer,
  AccountContainer,
  AccountInput,
  Button,
  ButtonContainer,
  CheckContainer,
} from "./SignStyle";
import { signData } from "../../../src/services/sign/signData";
import { useNavigate } from "react-router-dom";
import { idState } from "../../state";
import { useRecoilState } from "recoil";
import axios from "axios";

const SignViewer = () => {
  const navigate = useNavigate();
  const [uId, setuId] = useRecoilState(idState); // for recoil

  const [inputs, setInputs] = useState({
    id: "",
    // 여기에 인증번호 추가
    check: "",
    name: "",
    pw: "",
    account: "",
  });
  const { id, check, name, pw, account } = inputs;

  const onChange = (e) => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      ["bank"]: bank, // bank정보 추가
      [name]: value,
    });
  };

  const [bank, setBank] = useState("");
  const [pwCheck, setPwCheck] = useState("");
  const [pwError, setPwError] = useState(false);
  const [phoneCheck, setPhoneCheck] = useState(""); //인증번호
  const [phoneError, setPhoneError] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    // 비밀번호와 비밀번호 체크가 다를 경우를 검증
    if (check !== phoneCheck) {
      return setPhoneError(true);
    }

    if (pw !== pwCheck) {
      return setPwError(true);
    }
    console.log(inputs);

    signData(inputs).then((result) => {
      setuId(result); // for recoil
      // console.log("uId", uId);
      alert("회원가입이 완료되었습니다.");
      navigate("/neighbor");
    });
  };

  const onChangePwChk = (e) => {
    //비밀번호 입력 시 password 를 검증하는 함수
    setPwError(e.target.value !== pw);
    setPwCheck(e.target.value);
  };

  const onChangePhone = (e) => {
    setInputs({
      ...inputs,
      check: e.target.value,
    });

    console.log(e.target.value);
    console.log(phoneCheck);
    if (e.target.value != phoneCheck) setPhoneError(true);
    else setPhoneError(false);
  };

  const getCheck = async (props) => {
    await axios
      .get(`http://3.39.125.17/signup/certification?phoneNumber=${props}`)
      .then((data) => {
        console.log(data.data);
        setPhoneCheck(data.data); //phoneCheck 설정
      });
  };

  const onPhoneCheck = (e) => {
    console.log(id);
    getCheck(id); //인증번호 받음
  };

  return (
    <Form>
      <form onSubmit={onSubmit}>
        <InputContainer>
          <Label>휴대폰번호</Label>
          <Input name="id" value={id} required onChange={onChange} />
        </InputContainer>
        <CheckContainer>
          <button onClick={onPhoneCheck}>인증</button>
          <input
            name="check"
            value={check}
            required
            onChange={onChangePhone}
            autoComplete="off"
          ></input>
          {phoneError && (
            <div style={{ color: "red", marginTop: "0.5rem" }}>
              인증번호가 일치하지 않습니다.
            </div>
          )}
        </CheckContainer>

        <InputContainer>
          <Label>닉네임</Label>
          <Input name="name" value={name} required onChange={onChange} />
        </InputContainer>
        <InputContainer>
          <Label>비밀번호</Label>
          <Input
            name="pw"
            type="password"
            value={pw}
            required
            onChange={onChange}
            autoComplete="off"
          />
        </InputContainer>
        <InputContainer>
          <Label>비밀번호 체크</Label>
          <Input
            type="password"
            value={pwCheck}
            required
            onChange={onChangePwChk}
            autoComplete="off"
          />
          {pwError && (
            <div style={{ color: "red", marginTop: "0.5rem" }}>
              비밀번호가 일치하지 않습니다.
            </div>
          )}
        </InputContainer>
        <BankContainer>
          <Banks setBank={setBank} />
          <AccountContainer>
            <label>계좌번호</label>
            <br />
            <AccountInput
              name="account"
              value={account}
              required
              onChange={onChange}
            />
          </AccountContainer>
        </BankContainer>
        <ButtonContainer>
          <Button type="submit">가입하기</Button>
        </ButtonContainer>
      </form>
    </Form>
  );
};
export default SignViewer;
