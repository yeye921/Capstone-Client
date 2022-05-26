import styled from "styled-components";

const Title = styled.p`
  font-size: 2rem;
  font-weight: bolder;
  color: rgb(94, 191, 236);
  justify-content: center;
  display: flex;
`;

const Form = styled.div`
  justify-content: center;
  display: flex;
  padding-right: 1rem;
`;
const Label = styled.div`
  margin-bottom: 0.3rem;
  font-size: 1rem;
  color: rgb(82, 80, 80);
`;
const InputContainer = styled.div`
  margin-bottom: 1rem;
  margin-left: 2rem;
`;
const Input = styled.input`
  width: 17rem;
  line-height: 2rem;
  border-width: 0.06rem;
  font-size: large;
  padding-left: 1rem;
  border-radius: 5px;
`;
const BankContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;
  margin-top: 2rem;
  margin-left: 2rem;
`;
const AccountContainer = styled.div`
  text-align: left;
`;
const AccountInput = styled.input`
  height: 2.6rem;
  width: 9rem;
  font-size: large;
  padding-left: 0.5rem;
  margin-top: 0.3rem;
`;
const Button = styled.button`
  color: white;
  background-color: rgb(94, 191, 236);
  width: 19rem;
  height: 2.7rem;
  font-size: medium;
  font-weight: 600;
  border-style: initial;
  border-radius: 0.7rem;
  margin-left: 2rem;
`;
const ButtonContainer = styled.div`
  // display: flex;
  // justify-content: center;
  // background-color: yellow;
`;

const CheckContainer = styled.div`
  width: 17em;
  margin-left: 2rem;
  margin-bottom: 1em;
`;

export {
  Title,
  Form,
  Label,
  InputContainer,
  Input,
  BankContainer,
  AccountContainer,
  AccountInput,
  Button,
  ButtonContainer,
  CheckContainer,
};
