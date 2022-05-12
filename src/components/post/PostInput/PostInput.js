import React, { useState, Component } from "react";
import { postData } from "../../../services/post";
import MenuModal from "../../menu/MenuModal";
import Search from "./PostSearch";
import RestSearch from "./RestSearch";
import { PostContainer, BoxCotainer, PostButton, InputBox } from "./styles";

const PostInput = () => {
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

  const onChange = (e) => {
    const { name, value } = e.target;

    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const onPublish = () => {
    const time = new Date().toISOString();
    postData(inputs, time).then((data) => {
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
    console.log(data);
    setRest(data);
    setInputs({
      ...inputs,
      restaurant: data.r_id,
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
      <PostButton onClick={onPublish}>등록하기</PostButton>

      <MenuModal openModal={openModal} closeModal={closeModal} title={title} />
    </PostContainer>
  );
};

export default PostInput;
