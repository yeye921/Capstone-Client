import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
    padding-top: 1rem;
    padding-left: 2rem;
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


const ListItem = ({item}) => {
    const {title, r_name, order_time, min_price, fee} = item;
    return (
      <Container>
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
    )
}
export default ListItem;