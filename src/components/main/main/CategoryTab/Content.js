import React, { useEffect, useState } from "react";
import axios from "axios";
import { ListContainer } from "../MainStyle";
import ListItem from "./ListItem";
import { mainData } from "../../../../services/main/mainData";

import { useRecoilState } from "recoil";
import { idState, roadAddrState, xState, yState, nameState } from "../../../../state";

const Content = (props) => {
  const [uId, setuId] = useRecoilState(idState);
  const [name, setName] = useRecoilState(nameState);
  const [x, setX] = useRecoilState(xState);
  const [y, setY] = useRecoilState(yState);

  const [lists, setLists] = useState(null); // null or []

  useEffect(() => {
		console.log('현재 u_x u_y: ', x, y);
    console.log("현재 아이디 & 닉네임", uId, name);
    mainData(x, y, setLists, props.category);
	}, [props]);

  return (
    <>
      <ListContainer>
        {lists &&
          lists.map((item, index) => <ListItem item={item} key={index} />)}
      </ListContainer>
    </>
  );
};
export default Content;
