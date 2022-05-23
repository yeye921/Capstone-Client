import React, { useEffect, useState } from "react";
import axios from "axios";
import { ListContainer } from "../MainStyle";
import ListItem from "./ListItem";
import { mainData } from "../../../../services/main/mainData";

import { useRecoilState } from "recoil";
import { idState, roadAddrState } from "../../../../state";

const Content = (props) => {
  const [uId, setuId] = useRecoilState(idState);

  // 실제 게시글 데이터
  const [lists, setLists] = useState(null); // null or []

  // // 게시글 목록 불러오기
  useEffect(() => {
    mainData(setLists, props.url);
  }, [props]);

  // const [lists, setLists] = useState([
  //   {
  //     title: "짜장면 팟 구함",
  //     r_name: "홍콩반점 매탄점",
  //     order_time: "22:10:00",
  //     min_price: 12000,
  //     post_fee: 250,
  //   },
  // ]);

  return (
    <>
      {/* <div>uid:{uId}</div> */}
      <ListContainer>
        {/* lists === null ? <div>등록된 게시글이 없습니다</div>
              : {lists.map(item => (
                      <ListItem item={item} key={item.id} />
              ))} */}

        {lists &&
          lists.map((item, index) => <ListItem item={item} key={index} />)}
      </ListContainer>
    </>
  );
};
export default Content;
