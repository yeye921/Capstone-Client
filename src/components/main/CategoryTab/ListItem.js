import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
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
    background-color: #dba901;
  }
`;
const Title = styled.div`
  font-size: large;
  font-weight: bold;
  margin-bottom: 0.2rem;
`;
const Detail1 = styled.div`
  display: flex;
  font-size: small;
  margin-bottom: 0.3rem;
`;
const Detail2 = styled.div`
  display: flex;
  font-size: small;
  margin-bottom: 0.3rem;
`;
const Space = styled.div`
  margin-left: 0.2rem;
  margin-right: 0.3rem;
`;

const ListItem = ({ item }) => {
  const { p_id, title, r_name, order_time, min_price, fee } = item;
  console.log(item);

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
      <Title>{title}</Title>
      <Detail1>
        <div>{r_name}</div>
        <Space>|</Space>
        <div>{order_time}시 주문 예정</div>
      </Detail1>
      <Detail2>
        <div>최소 주문 {min_price}원</div>
        <Space>|</Space>
        <div>지금 참여하면 배달비 {fee}원</div>
      </Detail2>
    </Container>
  );
};
export default ListItem;
