import React, { useState, Component } from "react";
import { postData } from "../../../services/post";
import MenuModal from "../../menu/MenuModal";
import Search from "./PostSearch";
import RestSearch from "./RestSearch";
import {
  PostContainer,
  BoxCotainer,
  PostButton,
  RestCotainer,
  Fee,
  InputBox,
} from "./styles";

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

  const [orderFee, setOrderFee] = useState({
    order: "",
    fee: "",
  });

  const [rest, setRest] = useState("");

  const [list, setList] = useState([]);

  const { order, fee } = orderFee;

  const onTextChange = (e) => {
    const { value, name } = e.target;
    setOrderFee({
      ...orderFee,
      [name]: value,
    });
  };

  const onChange = (e) => {
    const { name, value } = e.target;

    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const onTextReset = () => {
    setOrderFee({
      order: "",
      fee: "",
    });
  };

  const onAddFee = () => {
    //중복체크
    onTextReset();
    setList((list) => [
      ...list,
      orderFee.order + "원 이상 " + orderFee.fee + "원",
    ]);
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
      {/* <RestCotainer>
        <div>카테고리</div>
        <p>
          <select name="category">
            <option value="한식">한식</option>
            <option value="중식">중식</option>
            <option value="일식">일식</option>
          </select>
        </p>
      </RestCotainer> */}
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

      <MenuModal openModal={openModal} closeModal={closeModal} />
    </PostContainer>
  );
};

export default PostInput;
