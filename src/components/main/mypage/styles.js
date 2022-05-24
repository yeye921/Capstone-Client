import styled from "styled-components";

const UserBlock = styled.div`
  margin-top: 1.5em;
  margin-left: 2.5em;
  margin-right: 2.5em;
  margin-bottom: 1em;

  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 1em;
`;

const Greeting = styled.div`
  font-size: large;
`;

const Input = styled.input`
  width: 10em;
  height: 4vh;
  border: 2px solid #696969;
  border-radius: 5px;
`;

export { UserBlock, Greeting, Input };
