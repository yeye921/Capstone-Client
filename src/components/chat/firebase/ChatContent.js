import React, { useState, useEffect, forwardRef } from "react";
import firebase from "firebase/app";
import "firebase/firestore";
import { db } from "./firebase";
import { useRecoilState } from "recoil";
import { nameState, pidState } from "../../../state";
import Message from "./Message";
import styled from "styled-components";

const Msgs = styled.div`
  padding-top: 5rem;
  margin-bottom: 5rem;
  // display:flex;
  // flex-direction: column;
  // height: 20rem;
`;

const ChatContent = () => {
  const [username, setUSername] = useRecoilState(nameState); // 실제

  // example 예시용
  // const [username, setUsername] = useState("");
  // useEffect(() => {
  //   setUsername(prompt("이름을 넣으세요~"));
  // }, []);

  // 채팅방 구별하는 이름: pId로 설정
  // const [room, setRoom] = useState("1"); // 예시
  const [room, setRoom] = useRecoilState(pidState); // 실제

  // 파이어베이스에서 받아온 데이터 저장할 변수
  const [msgs, setMsgs] = useState([]);


  // firebase 실시간 데이터 조회
  useEffect(() => {
    db.collection(room)
      .orderBy("timestamp")
      .onSnapshot((querySnapshot) => {
        setMsgs(
          querySnapshot.docs.map((doc) => ({
            id: doc.id,
            msg: doc.data(),
          })),
        );
      });
  }, []);

  return (
    <>
      <Msgs>
        {msgs.map(({ id, msg }, index) => (
          <Message key={index} username={username} msg={msg}></Message>
        ))}
      </Msgs>

      {/* <h2>{username}님이 채팅방에 입장</h2> */}
    </>
  );
};
export default ChatContent;
