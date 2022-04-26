import styled from 'styled-components';

const Title = styled.p`
  font-size: 5rem;
  font-weight: bolder;
  color: rgb(94, 191, 236);
  justify-content: center;
  display: flex;
`;
const Input = styled.input`
  font-size: large;
  font-style: initial;
  padding-left: 1rem;
  width: 22rem;
  line-height: 3rem;
`;
const InputContainer = styled.div`
  justify-content: center;
  display: flex;
  margin-bottom: 1.2rem;
`;
const ButtonContainer1 = styled.div`
  justify-content: center;
  display: flex;
  margin-top: 2rem;
  margin-bottom: 1rem;
`;
const ButtonContainer2 = styled.div`
  justify-content: center;
  display: flex;
  margin-bottom: 1rem;
`;
export { Title, Input, InputContainer, ButtonContainer1, ButtonContainer2 };
