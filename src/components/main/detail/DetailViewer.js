import React, { useEffect, useState } from "react";
import { getDetail } from "../../../services/main/mainData";
import  { Container, DetailContent, DetailButton } from "./styles";
import MainHeader from "../../common/MainHeader";
import SubInfo from "../../common/SubInfo"


const DetailViewer = ({post}) => {
    if(!post){
        return null;
    }

    const { u_id, p_id, title, name, category, r_name, order_time, min_price } = post;

    const onPublish = () => {
        alert("나눔 참여 완료");
        //주문 정보 입력창으로 이동
    }

    /*
    const [details, setDetails] = useState(null);

    useEffect(()=>{
        getDetail(setDetails, post);
    },[]);
    */
    return (
        <Container>
            <MainHeader text={title}/>
            <SubInfo 
                user={name}
                orderTime={order_time}
            />
            <hr style={{ width: "90vw" }}/>
            <DetailContent
                restaurant={r_name}
                //postFee={post_fee}
                minPrice={min_price}
            />

            <DetailButton onClick={onPublish}>함께하기</DetailButton>
        </Container>
    )
}

export default DetailViewer;