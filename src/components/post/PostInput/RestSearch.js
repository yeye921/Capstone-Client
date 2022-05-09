import axios from "axios";
import React, { useState, Component, useEffect } from "react";
import styled from "styled-components";
import { RestContainer, Fee } from "./styles";

const Container = styled.div``;

const RestSearch = ({ category, minPrice, orderFee }) => {
  const list = orderFee
    .split(".")
    .map((str) => str.substring(1, str.length - 1).split(","));

  console.log(list);

  return (
    <Container>
      <RestContainer>
        <div>카테고리</div>
        <p>{category}</p>
      </RestContainer>
      <RestContainer>
        <div>최소주문금액</div>
        <p>{minPrice} 원</p>
      </RestContainer>
      <RestContainer>
        <div>배달비</div>
        {list.map((data) => (
          <p key={data[0]}>
            {data[0]}원 이상 {data[1]}원
          </p>
        ))}
      </RestContainer>
    </Container>
  );
};

export default RestSearch;
