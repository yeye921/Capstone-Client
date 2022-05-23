import React, { useState, useEffect, forwardRef } from "react";
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
    db.collection(`${room}`)
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

// useEffect(() => {
//   console.log("room: ", room);
//     db.collection("73")
//       .orderBy('timestamp')
//       .onSnapshot(d => {
//         setMsgs([]);
//         d.forEach((doc) => {
//           msgs.push(doc.data().msg);
//         })
//         console.log("msgs: ", msgs.join(", "));
//       })
//   }, [])

  // useEffect(() => {
  //   setMsgs([{id:"1", msg: "gdgd"},{id:"1", msg: "gdgd"},{id:"1", msg: "gdgd"},{id:"1", msg: "gdgd"} ]);
  // }, []);


  return (
    <>
      <Msgs>
        {msgs.map(({ id, msg },) => (
          <Message key={id} username={username} msg={msg}></Message>
        ))}
      </Msgs>
    </>
  );
};
export default ChatContent;
