import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

export const Container = styled.div`
  padding-left: 1rem;
  padding-right: 1rem;
  width: 310px;
  height: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  alignitems: center;

  background-color: #ffffff;
  margin: 0.5rem;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  border-radius: 6px;

  &:hover {
    background-color: rgba(182, 182, 182, 0.8);
  }
`;
const Title = styled.div`
  font-size: large;
  font-weight: bold;
  margin-bottom: 0.2rem;
  margin-top: 0.2rem;
`;
const Detail = styled.div`
  display: flex;
`;
const Space = styled.div`
  font-size: small;
  margin-left: 0.3rem;
  margin-right: 0.3rem;
`;
const Text = styled.div`
  font-size: small;
  margin-bottom: 0.2rem;
`;
const Name = styled.div`
  font-size: small;
`;

const ListItem = ({ item }) => {
  const { p_id, title, r_name, order_time, min_price, post_fee } = item;

  const name = r_name.replace("-", " ");
  let newName = "";
  let newTitle = "";

  const arr = order_time.split(":");
  const hour = arr[0];
  const min = arr[1];

  const len1 = name.length;
  if (len1 > 14) {
    newName = name.substr(0, 13);
  } else {
    newName = name;
  }

  const len2 = title.length;
  if (len2 > 23) {
    newTitle = title.substr(0, 23);
  } else {
    newTitle = title;
  }

  const navigate = useNavigate();
  const onClick = () => {
    navigate(`/main/detail?pId=${p_id}`, {
      // 게시글 상세페이지 주소로 수정
      state: {
        pId: { p_id },
        // p_id: p_id,
      },
    });
  };
  return (
    <Container onClick={onClick}>
      <Title title={title}>{newTitle}</Title>
      <Detail>
        <Name title={r_name}>{newName}</Name>
        <Space> | </Space>
        <Text>
          {hour}시 {min}분 주문 예정
        </Text>
      </Detail>
      <Detail>
        <Text>최소 주문 {min_price}원</Text>
        <Space> | </Space>
        <Text>지금 참여하면 배달비 {post_fee}원</Text>
      </Detail>
    </Container>
  );
};
export default ListItem;
