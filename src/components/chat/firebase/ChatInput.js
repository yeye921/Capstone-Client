import React, {useState, useEffect} from "react";
import firebase from "firebase/app";
import "firebase/firestore";
import { db } from "./firebase";
import { useRecoilState } from "recoil";
import { nameState, pidState } from "../../../state";
import Message from "./Message";
import styled from "styled-components";

const Input = styled.input`
    width: 18rem;
    height: 3rem;
    border:none;
    border-right:0px;
    border-top:0px;
    boder-left:0px;
    boder-bottom:0px;
    padding-left: 1rem;
    font-size: 15px;
    outline: none;

`;
const Button = styled.button`
    width: 5rem;
    height: 4rem;
    margin-right: 0.5rem;
    margin-top: 0.5rem;
`;
const Div = styled.div`
    border: 1px solid grey;
    height: 5rem;
    display: flex;
    border-radius: 0.2rem;
    // border-width: 0.1rem;

    // position: fixed;
    // position : relative;
    // transform : translateY(-100%);

    background-color: white;
    // margin : 0.2rem;

`;


const ChatInput = () => {
    const [username, setUSername] = useRecoilState(nameState); 
    const [room, setRoom] = useRecoilState(pidState); // 실제 

    const [input, setInput] = useState("");
    const [msgs, setMsgs] = useState([]);

    // 없애기
    // const [username, setUsername] = useState('');
    // const [room, setRoom] = useState("1");  // 예시

    // useEffect(() => {
    //     setUsername(prompt('이름을 넣으세요~'))
    //   }, [])
  

    const onSubmit = (e) => {
      e.preventDefault();
    };
  
    const onSending = (e) => {
      e.preventDefault();
      db.collection(`${room}`).add({
        msg: input,
        username: username, // uId로 설정
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        // timestamp: Date.now(),
      });
      setMsgs([...msgs, { username: username, msg: input }]);
      setInput("");
    };

    return(
        <form onSubmit={onSubmit}>
        <Div>
          <Input value={input} placeholder="내용을 입력해주세요" onChange={(e) => setInput(e.target.value)} />
          <Button
            disabled={!input}
            variant="contained"
            color="primary"
            type="submit"
            onClick={onSending}
          >
            전송
          </Button>
        </Div>
      </form>

    )
}
export default ChatInput;