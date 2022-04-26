import React, { useState, Component } from "react";
import { postData } from "../../../services/post";
import MenuModal from "../../menu/MenuModal";
import { PostContainer, BoxCotainer, PostButton, RestCotainer, Fee } from "./styles";

const PostInput = () => {
    const [inputs, setInputs] = useState({
        title: '',
        orderTime: '',
        restaurant: ''
    })

    const [openModal, setOpenModal] = useState(false);

    const { title, orderTime, restaurant } = inputs;
    
    const [orderFee, setOrderFee] = useState({
        order: '', 
        fee: ''
    });

    const [list,setList] = useState([])

    const { order, fee } = orderFee;

    const onTextChange = (e) => {
        const { value, name } = e.target;
        setOrderFee({
            ...orderFee,
            [name] : value
        });
    }

    const onChange = (e) => {
        const { name, value } = e.target;

        setInputs({
            ...inputs,
            [name]: value
        });
    }

    const onTextReset = () => {
        setOrderFee({
            order: '',
            fee: '',
        })
    }

    const onAddFee = () => {
        //중복체크
        onTextReset();
        setList(list => [...list, orderFee.order + '원 이상 ' + orderFee.fee + '원']);
    }

    const onPublish = () => {
        const time = new Date().toISOString();
        postData(inputs, time);
        //const postId = postData(inputs, time);
        
        //주문 정보 입력 Modal
        setOpenModal(true);
    }

    const closeModal = () => {
        setOpenModal(false);
    }

    return (
        <PostContainer>
            <BoxCotainer>
                <div>제목</div>
                <input
                    placeholder="제목을 입력해주세요"
                    name="title"
                    value={title}
                    onChange={onChange}
                />
            </BoxCotainer>
            <BoxCotainer>
                <div>매장</div>
                <input
                    placeholder="매장을 입력해주세요"
                    name="restaurant"
                    value={restaurant}
                    onChange={onChange}
                />
            </BoxCotainer>
            <RestCotainer>
                <div>카테고리</div>
                <p>
                    <select name="category">
                        <option value="한식">한식</option>
                        <option value="중식">중식</option>
                        <option value="일식">일식</option>
                    </select>
                </p>
            </RestCotainer>
            <RestCotainer>
                <div>최소주문금액</div>
                <p>
                    <input 
                        placeholder="금액을 입력해주세요"
                    />
                    원
                </p>
            </RestCotainer>
            <RestCotainer>
                <div>배달비</div>
                <p>
                    <input 
                        placeholder="주문금액"
                        name="order"
                        value={order}
                        onChange={onTextChange}
                    />
                    <input 
                        placeholder="배달비"
                        name="fee"
                        value={fee}
                        onChange={onTextChange}
                    />
                    <button onClick={onAddFee}>+</button>
                </p>
            </RestCotainer>
            <Fee>
                {list.map(orderFee => (
                    <p>{orderFee}</p>
                ))}
            </Fee>
            <BoxCotainer>
                <div>주문예정시간</div>
                <input
                    type="time"
                    name="orderTime"
                    value={orderTime}
                    onChange={onChange}
                />
            </BoxCotainer>
            <PostButton onClick={onPublish}>
                등록하기
            </PostButton>

            <MenuModal openModal={openModal} closeModal={closeModal}/>
        </PostContainer>
    )
};

export default PostInput