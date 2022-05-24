import React, { useEffect, useState } from "react";
import Button from "../../components/common/Button";
import { ssondaData } from "../../services/chat";
import GroupsIcon from '@mui/icons-material/Groups';
import MapIcon from '@mui/icons-material/Map';
import { FaMapMarkedAlt } from 'react-icons/fa';
import {  IoReceipt } from 'react-icons/io5';
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import IconButton from "@mui/material/IconButton";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import Topbar from "../../components/chat/Topbar";
import { QueryClient, useMutation, useQuery } from "react-query";
import axios from "axios";
import { useHere } from "../../services/mutation";
import NoticeBar from "../../components/chat/NoticeBar";
import { useRecoilState } from "recoil";
import {
  idState,
  roadAddrState,
  addrState,
  pidState,
  titleState,
  feeState,
  nameState,
} from "../../state";
import styled from "styled-components";

import ChatContent from "../../components/chat/firebase/ChatContent";
import ChatInput from "../../components/chat/firebase/ChatInput";

import firebase from "firebase/app";
import "firebase/firestore";
import { db } from "../../components/chat/firebase/firebase";

const ButtonContainer = styled.div`
  display: flex;
  height: 4rem;
  justify-content: center;

  position: fixed;
  bottom: 5.1rem;
  background-color: rgba(230, 228, 228);
  width: 100%;
`;

const ChatContainer = ({ state }) => {
  const [name, setName] = useRecoilState(nameState);
  const [fee, setFee] = useRecoilState(feeState); // 상단 바 배달비
  const [uId, setuId] = useRecoilState(idState);
  const [roadAddr, setRoadAddr] = useRecoilState(roadAddrState);
  const [addr, setAddr] = useRecoilState(addrState);
  const [pId, setPid] = useRecoilState(pidState);
  const [title, setTitle] = useRecoilState(titleState);

  const [closeBtn, setCBtn] = useState(false);
  const [shootBtn, setSBtn] = useState(false);

  const navigate = useNavigate();

  //const { pId } = queryString.parse(state);
  const here = useHere("here", "http://3.39.125.17/chat");
  const { data } = useQuery("here");

  const [place, setPlace] = useState(""); // 상단 바 나눔 위치
  // const [cnt, setCnt] = useState(1);

  const sendingHere = (place) => {
    const room = pId + "_";
    db.collection(`${room}`).add({
      place: place,
    })
  }

  // const userSending = () => {
  //   const room = pId + "_";
  //   const msg = nickName + "입장";
  //   db.collection(`${room}`).add({
  //     username: "관리자",
  //     msg: msg,
  //     timestamp: firebase.firestore.FieldValue.serverTimestamp(),
  //   });
  // }

  // 원래 주석처리 됨
  if (data) {
    console.log("data: ", data);
    console.log("1", data.place_name);

    // 이거 맞는지?
    sendingHere(data.place_name);

    // setPostInfo({
    //   ...postInfo,
    //   [state.pId]: {
    //     ...postInfo[state.pId],
    //     location: data.place_name,
    //   },
    // });
  }

  const onClosing = (e) => {
    // setPostInfo({
    //   ...postInfo,
    //   [state.pId]: {
    //     ...postInfo[state.pId],
    //     isClosing: true,
    //   },
    // });
    const msg = "모집이 마감되었습니다.";
    sendingClose(msg);
    here.mutate({ pId: pId });

    // console.log("2",data.place_name);
    // sendingHere(data.place_name);
  };

  const onShooting = (e) => {
    // ssondaData(uId, pId).then((response) => {
    //   // let fee = 0;
    //   // if (uId == response.data.uId) {
    //   //   // setFee(response.data.total_fee);
    //   //   fee = response.data.total_fee;
    //   // }
    //   // setPostInfo({
    //   //   ...postInfo,
    //   //   [state.pId]: {
    //   //     ...postInfo[state.pId],
    //   //     isShooting: true,
    //   //     fee: fee,
    //   //     location: "here",
    //   //   },
    //   // });
    // });

    ssondaData(uId, pId);

    const msg = "내가 쏜다!";
    console.log(roadAddr);
    if(roadAddr.length === 0){
      sendingSSonda(msg, addr); 
    } else {
      sendingSSonda(msg, roadAddr);
    }
  };

  const onMap = (e) => {
    navigate("/here", {
      state: {
        pId: pId,
        title: title,
      },
    });
  };

  const sendingSSonda = (msg, place) => {
    db.collection(`${pId}`).doc("ssonda").set({
      msg: msg,
      username: name,
      type: "ssonda",
      place: place,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
  };

  const sendingClose = (msg) => {
    db.collection(`${pId}`).doc("close").set({
      msg: msg,
      username: name,
      type: "close",
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
  };

  // MenuModal에서 받아온 데이터 recoil로 저장
  // 여기서 두 콘솔 다르게 찍힘
  // useEffect(() => {
  //   console.log(state.pId, state.title, state.fee);
  //   setPid(state.pId);
  //   setTitle(state.title);
  //   // setFee(state.fee);
  //   console.log("recoil",pId, title, fee);
  //   // console.log("fee",fee);
  //   // setPostFee(state.fee)
  // }, [])

  // 맨 처음 배달비 설정
  useEffect(()=> {
    setFee(state.fee);
  },[]);

  // 채팅 받아오기
  useEffect(() => {
    // let currentFee = fee;  // 이런식으로 해야함
    // let cnt = 0;
    db.collection(`${pId}`)
      .orderBy("timestamp")
      .onSnapshot((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          if(doc.data().type === "close"){
            console.log("모집마감 주체자", doc.data().username);
            setCBtn(true);
          }
          if(doc.data().type === "ssonda"){
            console.log("내가쏜다 주체자", doc.data().username);
            setSBtn(true);
            setPlace(doc.data().place);
            setFee("0");
          }
          // if(doc.data().username === "관리자"){
          //   console.log("db에 존재", cnt, currentFee)
          //   cnt += 1;
          //   currentFee /= cnt;  // 둘다 int형이어야 함
          //   console.log("db에 존재2", cnt, currentFee)
          // }
        });
      });
  }, []);


  // Ver1, 일단 사람 수만 셈
  // useEffect(() => {
  //   let cnt = 0;
  //   const room = pId + "_";
  //   db.collection(`${room}`)
  //     .orderBy("timestamp")
  //     .onSnapshot((d) => {
  //       d.forEach((doc) => {
  //         console.log("문서개수");
  //         if(doc.data().username === "관리자"){
  //           console.log("db에 존재");
  //           cnt += 1;
  //           console.log("현재cnt",cnt);
  //           // currentFee /= cnt;  // 둘다 int형이어야 함
  //           // console.log("db에 존재2", cnt, currentFee)
  //         }
  //       })
  //     })
  // }, [])

  // Ver2
  useEffect(() => {
    // let cnt = 1;
    // let currentFee = fee;  // 이런식으로 해야함
    const room = pId + "_";
    db.collection(`${room}`)
      .orderBy("timestamp")
      .onSnapshot((querySnapshot) => { // 변화 감지
        let cnt = 1;
        let currentFee = state.fee;
        querySnapshot.forEach(doc => { // 각 문서마다 실행
          if(doc.data().username === "관리자"){
            // console.log("db에 존재", cnt, fee )
            cnt += 1;
            currentFee = Math.floor(currentFee/cnt);
            setFee(currentFee);
            console.log("db에 존재2", cnt, currentFee, fee);
          }
        });
      })
  }, [])

  // 모집 마감
  useEffect(() => {
    // let cnt = 1;
    // let currentFee = fee;  // 이런식으로 해야함
    const room = pId + "_";
    db.collection(`${room}`)
      .orderBy("timestamp")
      .onSnapshot((querySnapshot) => { // 변화 감지
        querySnapshot.forEach(doc => { // 각 문서마다 실행
          if(doc.data().place){
            console.log("여기서모여", doc.data().place);
            setPlace(doc.data().place);
          }
        });
      })
  }, [])

  return (
    <div>
      {here.isLoading && <div>isLoading</div>}
      <NoticeBar fee={fee} addr={place} />

      <ChatContent />

      <ButtonContainer>
        <IconButton
          id="closeBtn"
          onClick={onClosing}
          disabled={closeBtn}
        >
          <GroupsIcon
            sx={{
              fontSize: 50,
              color: "rgba(31, 122, 19, 0.8)",
            }}
          />

        </IconButton>

        <IconButton onClick={onShooting} disabled={shootBtn}>
          <MonetizationOnIcon
            sx={{
              fontSize: 50,
              color: "rgba(31, 122, 19, 0.8)",
            }}
          />
        </IconButton>
        
        <IconButton onClick={onMap}>
          <FaMapMarkedAlt
              style={{color: "rgba(31, 122, 19, 0.8)", fontSize:"40"}}
            />
        </IconButton>
        
      
          <IconButton>
          {/* <div style={{display:"flex"}}> */}
            <IoReceipt
                  style={{color: "rgba(31, 122, 19, 0.8)", fontSize:"40"}}
                >
               <div>주문서</div>
            </IoReceipt>
          </IconButton>
      </ButtonContainer>
    </div>
  );
};

export default ChatContainer;
