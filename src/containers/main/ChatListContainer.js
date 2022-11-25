import React from "react";
import { useRecoilState } from "recoil";
import { idState } from "../../state";
import ChatItems from "../../components/main/Chats/ChatItems";
import Header, { Spacer } from "../../components/common/Header";
import { Margin } from "@mui/icons-material";

const ChatsContainer = () => {
  const [user, setUser] = useRecoilState(idState);
  return (
    <>
      <Header name="채팅방" />
      <ChatItems uId={user} />
      <Spacer />
    </>
  );
};

export default ChatsContainer;