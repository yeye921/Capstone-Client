import React, { useState, useEffect, forwardRef } from "react";
import styled from "styled-components";

const UserContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin-right: 0.5rem;
`;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-left: 0.5rem;
`;
const UserContent = styled.div`
  background-color: rgb(132, 195, 236);
  color: white;
  display: inline-block;
  padding: 0.5rem;
  border-radius: 1rem;
  margin-bottom: 0.5rem;
`;
const Content = styled.div`
  background-color: rgba(230, 228, 228, 0.8);
  display: inline-block;
  padding: 0.5rem;
  border-radius: 1rem;
  margin-bottom: 0.5rem;
`;
const Text = styled.div`
  font-size: 17px;
`;
const Name = styled.div`
  font-size: 14px;
`;
const Time = styled.div`
  font-size: 10px;
`;

const Message = forwardRef(({ msg, username }, ref) => {
  const isUser = username === msg.username;
  //   const time = msg.timestamp.toDate();
  //   const arr = time.split(" ");
  //   console.log("time", arr);
  const isMsg = msg.username === "관리자";

  return (
    <div ref={ref}>
      {isUser ? (
        <UserContainer>
          <Name>{username}</Name>
          <UserContent>
            <Text>{msg.msg}</Text>
          </UserContent>
        </UserContainer>
      ) : isMsg? (
        <></>
      ) : (
        <Container>
          <Name>{msg.username}</Name>
          <Content>
            <Text>{msg.msg}</Text>
          </Content>
      </Container>
      )
    }
    </div>
  );
});
export default Message;
