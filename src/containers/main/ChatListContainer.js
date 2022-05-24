import React from "react";
import { useRecoilState } from "recoil";
import { idState } from "../../state";
import ChatItems from "../../components/main/chats/ChatItems";
import Header from "../../components/common/Header";

const ChatsContainer = () => {
  const [user, setUser] = useRecoilState(idState);
  return (
    <>
      <Header name="채팅방" />
      <ChatItems uId={user} />
    </>
  );
};

export default ChatsContainer;
