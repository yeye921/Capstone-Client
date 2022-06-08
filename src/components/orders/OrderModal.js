import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Background, ModalContainer } from "../common/Modal";
import { useRecoilState } from "recoil";
import { idState } from "../../state";
import Button from "../common/Button";
import axios from "axios";

const OrderBox = styled(ModalContainer)`
  height: 60%;
`;

const OrderList = styled.div`
  margin-left: 10vw;
  margin-right: 10vw;
  margin-bottom: 2vh;
  display: grid;
  grid-template-columns: 25vw 20vw 20vw;
  grid-template-rows: 3vh 3vh;
  align-items: center;
  grid-template-areas:
    "menu menu menu"
    "none price fee";

  .item:nth-child(1) {
    text-align: left;
    grid-area: menu;
  }
  .item:nth-child(2) {
    text-align: right;
    grid-area: price;
  }
  .item:nth-child(3) {
    text-align: right;
    grid-area: fee;
  }
`;

const OrderButton = styled(Button)`
  width: 5em;
  height: 3em;
  position: fixed;
  bottom: 2em;
  right: 2em;
`;

const Text = styled.div`
  font-size: large;
  font-weight: 600;

  margin-bottom: 0.5em;
`;

const OrderInput = styled.input`
  font-size: medium;
  border: 0px;
  font-weight: 600;
  ::placeholder {
    color: black;
  }
`;

const OrderText = styled.div`
  display: flex;
  margin-left: 10vw;
  margin-right: 10vw;
  height: 5vh;
  p:nth-child(1) {
    text-align: left;
    flex-grow: 2;
  }
  p:nth-child(2) {
    text-align: right;
    flex-grow: 1;
  }
  p:nth-child(3) {
    text-align: right;
    flex-grow: 1;
  }
`;

const OrderModal = ({ openModal, setOpenModal, closeModal }) => {
  const [uId, setUId] = useRecoilState(idState);

  const [order, setOrder] = useState({
    menu: "",
    price: "",
  });

  const onPublish = () => {
    alert("주문정보가 수정되었습니다");
    //서버 통신 & 업데이트
    putData();
    closeModal();
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    setOrder({
      ...order,
      [name]: value,
    });
  };

  const putData = async () => {
    //null값 처리 필요

    await axios
      .put("http://3.39.125.17/chat/orders", {
        u_id: uId,
        p_id: openModal.items[0].p_id,
        menu: order.menu,
        price: order.price,
      })
      .then((data) => {
        console.log(data);
      });
  };

  return (
    <>
      {openModal.isOpen ? (
        <Background onClick={closeModal}>
          <OrderBox onClick={(e) => e.stopPropagation()}>
            <Text>주문서</Text>
            <OrderText>
              <p>메뉴</p>
              <p>가격</p>
              <p>배달비</p>
            </OrderText>
            <hr style={{ width: "70vw" }} />
            {openModal.items.map((item, index) => (
              <OrderList key={index}>
                {item.u_id == uId ? (
                  <>
                    <OrderInput
                      className="item"
                      placeholder={item.menu}
                      name="menu"
                      value={order.menu}
                      onChange={onChange}
                    />
                    <OrderInput
                      className="item"
                      placeholder={item.price}
                      name="price"
                      value={order.price}
                      onChange={onChange}
                    />
                    <p className="item" style={{ "font-weight": "600" }}>
                      {item.fee}
                    </p>
                  </>
                ) : (
                  <>
                    <p className="item" style={{ color: "gray" }}>
                      {item.menu}
                    </p>
                    <p className="item" style={{ color: "gray" }}>
                      {item.price}
                    </p>
                    <p className="item" style={{ color: "gray" }}>
                      {item.fee}
                    </p>
                  </>
                )}
              </OrderList>
            ))}
            <OrderButton onClick={onPublish}>수정</OrderButton>
          </OrderBox>
        </Background>
      ) : null}
    </>
  );
};

export default OrderModal;
