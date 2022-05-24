import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { menuData } from "../../services/menu";
import {
  idState,
  pidState,
  feeState,
  titleState,
  nameState,
} from "../../state";
import { Background, ModalContainer, ModalButton } from "../common/Modal";
import { Text, MenuInput, Title } from "./style";
import { useRecoilState, useSetRecoilState } from "recoil";

import firebase from "firebase/app";
import "firebase/firestore";
import { db } from "../../components/chat/firebase/firebase";

const MenuModal = ({ openModal, setOpenModal, closeModal, title }) => {
  const [uId, setUid] = useRecoilState(idState);
  const [pId, setPid] = useRecoilState(pidState);
  const [fee, setFee] = useRecoilState(feeState);
  const [nickName, setName] = useRecoilState(nameState);
  const setTitle = useSetRecoilState(titleState);

  const [cnt, setCnt] = useState(0);

  const [inputs, setInputs] = useState({
    menu: "",
    price: "",
    request: "",
  });

  const { menu, price, request } = inputs;
  const navigate = useNavigate();

  const onChange = (e) => {
    const { name, value } = e.target;

    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const onPublish = () => {
    userSending();
    menuData(uId, openModal.postId, inputs).then((response) => {
      console.log(response);

      setPid(openModal.postId); // for ChatContent
      setTitle(title);
      console.log("입장");
      closeModal();
      alert("메뉴가 등록되었습니다. 채팅방으로 이동합니다.");
      navigate(`/chat?pId=${openModal.postId}`, {
        state: {
          pId: openModal.postId,
          title: title,
          fee: response.fee,   // 배달비 전송
          // fee: 5000,
        },
      });
    });
  };

  // 참여자 전송
  // const userSending = () => {
  //   db.collection(`${pId}`).add({
  //     username: "관리자",
  //     msg: "입장",
  //     timestamp: firebase.firestore.FieldValue.serverTimestamp(),
  //   });
  //

  const userSending = () => {
    const room = pId + "_";
    const msg = nickName + "입장";
    db.collection(`${room}`).add({
      username: "관리자",
      msg: msg,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
  };

  return (
    <>
      {openModal.isOpen ? (
        <Background onClick={closeModal}>
          <ModalContainer onClick={(e) => e.stopPropagation()}>
            <Title>주문 정보 입력</Title>
            <MenuInput>
              <div>메뉴</div>
              <input
                placeholder="정확하게 작성해주세요"
                name="menu"
                value={menu}
                onChange={onChange}
              />
            </MenuInput>
            <MenuInput>
              <div>가격</div>
              <input
                placeholder="가격만 입력해주세요 (ex 10000)"
                name="price"
                value={price}
                onChange={onChange}
              />
            </MenuInput>
            <MenuInput>
              <div>요청사항</div>
              <input
                placeholder="정확하게 작성해주세요"
                name="request"
                value={request}
                onChange={onChange}
              />
            </MenuInput>
            <Text>
              확인 버튼을 누를 시,
              <br /> 나눔 채팅방으로 이동합니다
            </Text>
            <ModalButton onClick={onPublish}>확인</ModalButton>
          </ModalContainer>
        </Background>
      ) : null}
    </>
  );
};

export default MenuModal;
