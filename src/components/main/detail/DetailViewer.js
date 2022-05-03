import React, { useEffect, useState } from "react";
import { getDetail } from "../../../services/main/mainData";
import { Container, DetailContent, DetailButton } from "./styles";
import MainHeader from "../../common/MainHeader";
import SubInfo from "../../common/SubInfo";
import MenuModal from "../../menu/MenuModal";

const DetailViewer = ({ post, postId }) => {
  const [openModal, setOpenModal] = useState({
    postId: "",
    isOpen: false,
  });

  if (!post) {
    return null;
  }

  const { title, name, category, r_name, order_time, min_price } = post;

  const onPublish = () => {
    //주문 정보 입력창으로 이동
    setOpenModal({
      postId: postId,
      isOpen: true,
    });
  };

  const closeModal = () => {
    setOpenModal({
      ...openModal,
      isOpen: false,
    });
  };

  /*
    const [details, setDetails] = useState(null);

    useEffect(()=>{
        getDetail(setDetails, post);
    },[]);
    */
  return (
    <Container>
      <MainHeader text={title} />
      <SubInfo user={name} orderTime={order_time} />
      <hr style={{ width: "90vw" }} />
      <DetailContent
        restaurant={r_name}
        //postFee={post_fee}
        minPrice={min_price}
      />

      <DetailButton onClick={onPublish}>함께하기</DetailButton>
      <MenuModal openModal={openModal} closeModal={closeModal} />
    </Container>
  );
};

export default DetailViewer;
