import React from "react";
import Header from "../components/common/Header";
import ChatContainer from "../containers/chat/ChatContainer";
import { useLocation } from "react-router-dom";

const Chat = () => {
  const { state } = useLocation();
  return (
    <>
      <Header name={state.title} />
      <ChatContainer state={state} />
    </>
  );
};

export default Chat;
