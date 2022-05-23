import React, { useEffect, useState } from "react";
import axios from "axios";
import { ListContainer } from "../MainStyle";
import ListItem from "./ListItem";
import { mainData } from "../../../../services/main/mainData";

import { useRecoilState } from "recoil";
import { idState, roadAddrState, xState, yState } from "../../../../state";

const Content = (props) => {
  const [uId, setuId] = useRecoilState(idState);
  const [x, setX] = useRecoilState(xState);
  const [y, setY] = useRecoilState(yState);

  const [lists, setLists] = useState(null); // null or []

  useEffect(() => {
		console.log('현재 u_x u_y: ', x, y);
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
