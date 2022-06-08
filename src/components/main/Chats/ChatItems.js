import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { pidState } from "../../../state";
import { Container } from "../main/CategoryTab/ListItem";

const ChatItems = (props) => {
  const [items, setItems] = useState(null);
  const [pId, setPId] = useRecoilState(pidState);
  const navigate = useNavigate();

  const getData = async () => {
    await axios
      .get(`http://3.39.164.26/chat/list?uId=${props.uId}`)
      .then((data) => {
        setItems(data.data);
      });
  };

  const getPostInfo = async (pId) => {
    await axios
      .get(`http://3.39.164.26/chat/list/detail?pId=${pId}`)
      .then((data) => {
        console.log("채팅리스트에서 넘어온 배달비", data.data.total_fee);
        navigate(`/chat?pId=${pId}`, {
          state: {
            pId: `${pId}`,
            title: `${data.data.title}`,
            fee: `${data.data.total_fee}`,
          },
        });
      });
  };

  const onClick = (props) => {
    setPId(props);
    getPostInfo(props);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <div>
        {items &&
          items.map((item) => (
            <Container key={item.p_id} onClick={() => onClick(item.p_id)}>
              {item.title}
            </Container>
          ))}
      </div>
    </>
  );
};

export default ChatItems;
