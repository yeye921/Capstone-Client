import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { ListContainer } from "../MainStyle";
import ListItem from "./ListItem";
import { searchData } from "../../../services/main/searchData";

const SearchContent = (props) => {
  // 페이지 이동하면서 받아온 검색 데이터
  const location = useLocation();
  const { searchValue } = location.state;

  // 게시글 데이터a
  const [lists, setLists] = useState(null);

  // 게시글 목록 불러오기
  // 페이지 이동하면서 받아온 검색 데이터로 url설정해야함
  useEffect(() => {
    searchData(setLists, searchValue);
  }, [searchData]);

  return (
    <>
      <ListContainer>
        {lists &&
          lists.map((item, index) => <ListItem item={item} key={index} />)}
      </ListContainer>
    </>
  );
};
export default SearchContent;
