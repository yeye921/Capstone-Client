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
  const [room, setRoom] = useRecoilState(pidState); // 실제

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
