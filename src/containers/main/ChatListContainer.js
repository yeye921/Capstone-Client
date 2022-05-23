import React from "react";
import { useRecoilState } from "recoil";
import { idState } from "../../state";
import ChatItems from "../../components/main/Chats/ChatItems";

const ChatsContainer = () => {
  const [user, setUser] = useRecoilState(idState);
  return (
    <>
      <ChatItems uId={user} />
    </>
  );
};

export default ChatsContainer;
