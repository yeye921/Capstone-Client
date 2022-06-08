import styled from "styled-components";
import Button from "../../common/Button";
import { Input } from "../../main/main/MainStyle";

const PostContainer = styled.div`
  text-align: center;
  margin-top: 1em;
`;

const BoxCotainer = styled.div`
  padding: 1em;
  display: grid;
  grid-template-columns: 0.5fr 1fr;
  justify-content: space-around;

  input {
    border-color: #ffffff;
    justify-self: center;
  }
  div {
    display: flex;
    align-items: center;
    justify-content: space-around;
  }
`;

const PostButton = styled(Button)`
  position: fixed;
  bottom: 10vw;
  right: 10vw;
  width: 20vw;
  height: 7vh;
`;

const RestContainer = styled.div`
  padding: 1em;
  display: flex;
  justify-content: space-between;
  margin-left: 15vw;
  margin-right: 10vw;
  font-size: 90%;
  flex-wrap: wrap;
  div {
    color: #696969;
  }
  input {
    width: 15vw;
  }
  p {
    margin: 0px;
  }
`;

const Fee = styled.div`
  width: 100%;
  margin: 0;
  float: right;
  text-align: right;
  margin-right: 15vw;
  p {
    font-size: small;
  }
`;

const InputBox = styled(Input)`
  justify-self: center;
  width: 80%;
`;

const Text = styled.div`
  color: #696969;
  font-size: small;
  position: fixed;
  bottom: 15vh;
  right: 10vw;
`;

export {
  PostContainer,
  BoxCotainer,
  PostButton,
  RestContainer,
  Fee,
  InputBox,
  Text,
};
