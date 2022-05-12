import axios from "axios";
import React, { useState, Component, useEffect } from "react";
import styled from "styled-components";
import { BoxCotainer, InputBox } from "./styles";

const AutoSearchContainer = styled.div`
  width: 100%;
  background-color: #fff;
  padding: 15px;
`;

const SearchContainer = styled(BoxCotainer)`
  grid-template-rows: 1fr minmax(0px, auto);

  .list {
    grid-column: 2 / 3;
    width: 12em;
    grid-row: 2 / 3;
    border: 1px solid #cdcbcb;
    border-radius: 3px;
  }
`;

const SearchList = styled.div`
  margin: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  align-content: flex-start;
`;

const SearchData = styled.p`
  width: 100%;
  font-size: small;
  margin-top: 0;
  &:hover {
    background-color: #edf5f5;
    cursor: pointer;
  }
`;

const Search = ({ searchRest }) => {
  const [restaurant, setRestaurant] = useState("");
  const [items, setItems] = useState("");
  const [isOpen, setIsOpen] = useState(true);

  const getData = async () => {
    await axios
      .get(`http://3.39.125.17/post?rName=${restaurant}`)
      .then((data) => {
        let restaurants = data.data;
        if (restaurants.length === 0) {
          restaurants = [];
        }
        setItems(restaurants);
      });
  };

  useEffect(() => {
    getData();
  }, [restaurant]);

  const onChangeData = (e) => {
    setRestaurant(e.target.value);
    setIsOpen(true);
  };

  const setData = (data) => {
    setRestaurant(data.r_name);
    setIsOpen(false);
    searchRest(data);
  };

  return (
    <SearchContainer>
      <div>매장</div>
      <InputBox
        placeholder="매장을 입력해주세요"
        value={restaurant}
        onChange={onChangeData}
      />
      {items.length > 0 && restaurant && isOpen && (
        <AutoSearchContainer className="list">
          <SearchList>
            {items.map((search, idx) => {
              return (
                <SearchData key={idx} onClick={() => setData(search)}>
                  {search.r_name}
                </SearchData>
              );
            })}
          </SearchList>
        </AutoSearchContainer>
      )}
    </SearchContainer>
  );
};

export default Search;
