import React from "react";
import Button from "../components/common/Button";
import { useLocation } from "react-router-dom";
import queryString from "query-string";
import { finishData } from "../services/chat";

const Chat = () => {
  const { search } = useLocation();
  const { pId } = queryString.parse(search);

  const onClick = (e) => {
    e.target.disabled = !e.target.disabled;
    finishData(pId).then((data) => {
      console.log(data);
    });
  };

  return (
    <>
      <div>게시글 아이디 : {pId}</div>
      <Button onClick={onClick}>모집마감</Button>
    </>
  );
};

export default Chat;
