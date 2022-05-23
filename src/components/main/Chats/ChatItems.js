import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container } from "../CategoryTab/ListItem";

const ChatItems = (props) => {
  const [items, setItems] = useState(null);
  const navigate = useNavigate();

  const getData = async () => {
    await axios
      .get(`http://3.39.125.17/chat/list?uId=${props.uId}`)
      .then((data) => {
        setItems(data.data);
      });
  };

  const onClick = (props) => {
    navigate(`/chat?pId=${props}`, {
      state: {},
    });
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
