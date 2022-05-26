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
  display: flex;
  .item {
    text-align: center;
    margin: 0;
    padding: 0;
    width: 20vw;
    border: 2px inset;
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

  margin-bottom: 1em;
`;

const OrderInput = styled.input`
  font-size: medium;
  ::placeholder {
    color: black;
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
            <OrderList key={0}>
              <p className="item">사용자</p>
              <p className="item">메뉴</p>
              <p className="item">가격</p>
              <p className="item">배달비</p>
            </OrderList>
            {openModal.items.map((item, index) => (
              <OrderList key={index}>
                {item.u_id == uId ? (
                  <>
                    <p className="item">나</p>
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
                  </>
                ) : (
                  <>
                    <p className="item"></p>
                    <p className="item">{item.menu}</p>
                    <p className="item">{item.price}</p>
                  </>
                )}

                <p className="item">{item.fee}</p>
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
