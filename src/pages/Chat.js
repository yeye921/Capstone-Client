import React from "react";
import Header from "../components/common/Header";
import ChatContainer from "../containers/chat/ChatContainer";
import { useLocation } from "react-router-dom";

const Chat = () => {
  const { state } = useLocation();
  return (
    <div style={{  backgroundColor:"#9bbbd4", display:"flex", flexDirection:"column" }}>
      <Header name={state.title} />
      {/* <Header name="아무거나먹자" /> */}
      <ChatContainer state={state}/>
    </div>
  );
};

export default Chat;
