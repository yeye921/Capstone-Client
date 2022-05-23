import React from "react";
import Header from "../components/common/Header";
import ChatsContainer from "../containers/main/ChatListContainer";

const Chats = () => {
  return (
    <>
      <Header name="채팅방" />
      <ChatsContainer />
    </>
  );
};

export default Chats;
