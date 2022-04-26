import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Banks from './Banks';
import {
  Label,
  InputContainer,
  Input,
  Form,
  BankContainer,
  AccountContainer,
  AccountInput,
  Button,
  ButtonContainer
} from './SignStyle';
import { signData } from '../../../src/services/sign/signData';

const SignViewer = () => {

  const [inputs, setInputs] = useState({
    id: '',
    // 여기에 인증번호 추가
    name: '',
    pw: '',
    account: '',
  })
  const { id, name, pw, account } = inputs;

  const onChange = (e) => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      ["bank"]: bank, // bank정보 추가
      [name]: value
    })
  }

  const [bank, setBank] = useState('');
  const [pwCheck, setPwCheck] = useState('');
  const [pwError, setPwError] = useState(false);


  // fetch 버전이랑 아닌 버전이랑 만들기
  const onSubmit = (e) => {
    e.preventDefault();
    // 비밀번호와 비밀번호 체크가 다를 경우를 검증한다
    if (pw !== pwCheck) {
      return setPwError(true);
    }

    console.log(inputs)
    signData(inputs);
    alert('회원가입이 완료되었습니다.');
    window.location.replace('/login');
  };

  const onChangePwChk = (e) => {
    //비밀번호 입력 시 password 를 검증하는 함수
    setPwError(e.target.value !== pw);
    setPwCheck(e.target.value);
  };

  return (
    <Form>
      <form onSubmit={onSubmit}>
        <InputContainer>
          <Label>핸드폰번호</Label>
          <Input name="id" value={id} required onChange={onChange} />
        </InputContainer>
        <InputContainer>
          <Label>닉네임</Label>
          <Input name="name" value={name} required onChange={onChange} />
        </InputContainer>
        <InputContainer>
          <Label>비밀번호</Label>
          <Input name="pw" type="password" value={pw} required onChange={onChange} autoComplete="off" />
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
            <div style={{ color: 'red', marginTop:'0.5rem' }}>비밀번호가 일치하지 않습니다.</div>
          )}
        </InputContainer>
        <BankContainer>
          <Banks setBank={setBank}/>
          <AccountContainer>
            <label>계좌번호</label>
            <br />
            <AccountInput name="account" value={account} required onChange={onChange} />
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
