import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Background, ModalContainer } from "../common/Modal";
import { useRecoilState } from "recoil";
import { idState } from "../../state";

const OrderBox = styled(ModalContainer)`
  height: 60%;
`;

const OrderList = styled.div`
  display: flex;
  .item {
    margin: 0;
    width: 5em;
    border: 2px inset;
  }
`;

const OrderModal = ({ openModal, setOpenModal, closeModal }) => {
  const [uId, setUId] = useRecoilState(idState);
  return (
    <>
      {openModal.isOpen ? (
        <Background onClick={closeModal}>
          <OrderBox onClick={(e) => e.stopPropagation()}>
            <OrderList key={0}>
              <p className="item">사용자</p>
              <p className="item">메뉴</p>
              <p className="item">가격</p>
              <p className="item">배달비</p>
            </OrderList>
            {openModal.items.map((item, index) => (
              <OrderList key={index}>
                {item.u_id == uId ? (
                  <p className="item">나</p>
                ) : (
                  <p className="item"></p>
                )}
                <p className="item">{item.menu}</p>
                <p className="item">{item.price}</p>
                <p className="item">{item.fee}</p>
              </OrderList>
            ))}
          </OrderBox>
        </Background>
      ) : null}
    </>
  );
};

export default OrderModal;
