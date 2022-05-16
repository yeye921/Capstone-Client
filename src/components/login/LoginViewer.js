import { React, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MainButton from "../common/MainButton";
import {
  Input,
  InputContainer,
  ButtonContainer1,
  ButtonContainer2,
} from "./LoginStyle";
import { loginData } from "../../services/login/loginData";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import {
  idState,
  addrState,
  roadAddrState,
  xState,
  yState,
  bankState,
  accountState,
  nameState,
  pointState,
} from "../../state";

const LoginViewer = () => {
  // recoil에 저장할 변수들..
  const [uId, setuId] = useRecoilState(idState);
  const [addr, setAddr] = useRecoilState(addrState);
  const [roadAddr, setRoadAddr] = useRecoilState(roadAddrState);
  const [x, setX] = useRecoilState(xState);
  const [y, setY] = useRecoilState(yState);
  const [bank, setBank] = useRecoilState(bankState);
  const [account, setAccount] = useRecoilState(accountState);
  const [name, setName] = useRecoilState(nameState);
  const [point, setPoint] = useRecoilState(pointState);

  const [inputs, setInputs] = useState({
    id: "",
    pw: "",
  });

  const { id, pw } = inputs;

  const navigate = useNavigate();

  const onChange = (e) => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    // 입력한 정보와 일치하는 데이터가 있으면 로그인시킴

    loginData(inputs).then((result) => {
      if (result === "") {
        alert("일치하는 회원 정보가 없습니다.");
      } else {
        // 받아온 데이터 recoil에 저장함
        setuId(result.u_id);
        setAddr(result.address);
        setRoadAddr(result.road_address);
        setX(result.u_x);
        setY(result.u_y);
        setBank(result.bank);
        setAccount(result.account);
        setName(result.name);
        setPoint(result.point);

        alert("로그인이 완료되었습니다.");
        navigate("/main");
      }
    });
  };
  return (
    <>
      <form onSubmit={onSubmit}>
        <InputContainer>
          <Input
            name="id"
            value={id}
            onChange={onChange}
            placeholder="휴대폰 번호"
            required
            autoComplete="off"
          />
        </InputContainer>
        <InputContainer>
          <Input
            name="pw"
            value={pw}
            type="password"
            onChange={onChange}
            placeholder="비밀번호"
            required
            autoComplete="off"
          />
        </InputContainer>
        <ButtonContainer1>
          <MainButton
            color="rgb(73, 69, 64)"
            background="rgb(250, 224, 82)"
            type="submit"
            text="로그인"
          />
        </ButtonContainer1>
        <ButtonContainer2>
          <Link to="/signup">
            <MainButton
              color="rgb(73, 69, 64)"
              background="rgb(104, 193, 251)"
              text="회원가입"
            />
          </Link>
        </ButtonContainer2>
      </form>
    </>
  );
};
export default LoginViewer;
