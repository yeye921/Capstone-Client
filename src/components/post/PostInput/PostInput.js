import React, { useState, Component, useEffect } from "react";
import { postData } from "../../../services/post";
import MenuModal from "../../menu/MenuModal";
import Search from "./PostSearch";
import RestSearch from "./RestSearch";
import {
  PostContainer,
  BoxCotainer,
  PostButton,
  InputBox,
  Text,
} from "./styles";
import { idState } from "../../../state";
import { useRecoilState } from "recoil";
import axios from "axios";

const PostInput = () => {
  const [uId, setuId] = useRecoilState(idState);

  const [inputs, setInputs] = useState({
    title: "",
    orderTime: "",
    restaurant: "",
  });

  const [openModal, setOpenModal] = useState({
    postId: "",
    isOpen: false,
  });

  const { title, orderTime, restaurant } = inputs;

  const [rest, setRest] = useState("");
  const [predictTime, setPredictTime] = useState("");

  useEffect(() => {
    if (orderTime && restaurant) {
      //서버 API 요청
      console.log(rest.r_name);
      getData();
    }
  }, [orderTime, restaurant]);

  const onChange = (e) => {
    const { name, value } = e.target;

    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const onPublish = () => {
    const time = new Date().toISOString();
    postData(inputs, time, uId).then((data) => {
      return setOpenModal({
        postId: data.data.p_id,
        isOpen: true,
      });
    });
  };

  const closeModal = () => {
    setOpenModal({
      ...openModal,
      isOpen: false,
    });
  };

  const searchRest = (data) => {
    setRest(data);
    setInputs({
      ...inputs,
      restaurant: data.r_id,
    });
  };

  const getData = async () => {
    await axios
      .post("http://3.39.164.26:5000/getExpectedTime", {
        rName: rest.r_name,
        orderTime: orderTime,
      })
      .then((data) => {
        console.log(data);
        setPredictTime(data.data);
      });
  };

  return (
    <PostContainer>
      <BoxCotainer>
        <div>제목</div>
        <InputBox
          placeholder="제목을 입력해주세요"
          name="title"
          value={title}
          onChange={onChange}
        />
      </BoxCotainer>
      <Search searchRest={searchRest} />
      {rest && (
        <RestSearch
          category={rest.category}
          minPrice={rest.min_price}
          orderFee={rest.order_fee}
        />
      )}
      <BoxCotainer>
        <div>주문예정시간</div>
        <input
          type="time"
          name="orderTime"
          value={orderTime}
          onChange={onChange}
        />
      </BoxCotainer>
      {predictTime && (
        <Text>
          지금 등록하면 모집마감까지 <b>{predictTime}분</b> 걸려요
        </Text>
      )}
      <PostButton onClick={onPublish}>등록하기</PostButton>

      <MenuModal openModal={openModal} closeModal={closeModal} title={title} />
    </PostContainer>
  );
};

export default PostInput;
