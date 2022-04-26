import { React, useState } from 'react';
import { Link } from 'react-router-dom';
import MainButton from '../common/MainButton';
import {
  Input,
  InputContainer,
  ButtonContainer1,
  ButtonContainer2,
} from './LoginStyle';
import { loginData } from '../../services/login/loginData';

const LoginViewer = () => {

  const [inputs, setInputs] = useState({
    id: '',
    pw: ''
  })
  
  const { id, pw } = inputs;
  
  const onChange = (e) => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value
    })
  }

  const onSubmit = (e) => {
    e.preventDefault();
    // 입력한 정보와 일치하는 데이터가 있으면 로그인시킴
    loginData(inputs);
    console.log(inputs);
    alert('로그인이 완료되었습니다.');
    window.location.replace('/main');
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
            background="rgb(239, 226, 131)"
            type="submit"
            text="로그인"
          />
        </ButtonContainer1>
        <ButtonContainer2>
          <Link to="/signup">
            <MainButton
              color="rgb(73, 69, 64)"
              background="rgb(94, 191, 236)"
              text="회원가입"
            />
          </Link>
        </ButtonContainer2>
      </form>
    </>
  );
};
export default LoginViewer;
