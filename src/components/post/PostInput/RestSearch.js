import React, { useState, Component, useEffect } from "react";
import styled from "styled-components";
import { RestContainer } from "./styles";

const Fee = styled.div`
  padding: 1em;
  display: grid;
  font-size: 90%;
  margin-left: 15vw;
  margin-right: 10vw;

  div {
    grid-column: 1 / 2;
    grid-row: 1 / 2;
    color: #696969;
    text-align: left;
  }

  p {
    grid-column: 2 / 3;
    text-align: right;
    margin-top: 0;
  }
`;

const RestSearch = ({ category, minPrice, orderFee }) => {
  const list = orderFee
    .split(".")
    .map((str) => str.substring(1, str.length - 1).split(","));

  console.log(list);

  return (
    <>
      <RestContainer>
        <div>카테고리</div>
        <p>{category}</p>
      </RestContainer>
      <RestContainer>
        <div>최소주문금액</div>
        <p>{minPrice} 원</p>
      </RestContainer>
      <Fee>
        <div>배달비</div>
        {list.map((data) => (
          <p key={data[0]}>
            {data[0]}원 이상 {data[1]}원
          </p>
        ))}
      </Fee>
    </>
  );
};

export default RestSearch;
