import React, { useEffect, useState } from "react";
import Button from "../../components/common/Button";
import { ssondaData } from "../../services/chat";
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
import { idState, roadAddrState, addrState, pidState, titleState, feeState, nameState } from "../../state";
import styled from "styled-components";

import ChatContent from "../../components/chat/firebase/ChatContent";
import ChatInput from "../../components/chat/firebase/ChatInput";

import firebase from "firebase/app";
import "firebase/firestore";
import { db } from "../../components/chat/firebase/firebase";

const ButtonContainer = styled.div`
  display: flex;
  height: 3em;
  justify-content: center;
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
  const [cnt, setCnt] = useState(1);

  // 원래 주석처리 됨
  if (data) {
    console.log("data: ", data);
    console.log("1",data.place_name);

    // 이거 맞는지?
    // sendingHere(data.place_name);
    

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
    const msg = "모집이 마감되었습니다";
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
    if(roadAddr.length == 0){
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
  }

  const sendingClose = (msg) => {
    db.collection(`${pId}`).doc("close").set({
      msg: msg,
      username: name,
      type: "close",
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
  }

  const sendingHere = (place) => {
    db.collection(`${pId}`).doc("place").set({
      place: place,
    })
  }

  // MenuModal에서 받아온 데이터 recoil로 저장
  useEffect(() => {
    console.log(state.pId, state.title, state.fee);
    setPid(state.pId);
    setTitle(state.title);
    setFee(state.fee);
    console.log("recoil",pId, title, fee);
    // console.log("fee",fee);
    // setPostFee(state.fee)
  }, [])


  useEffect(() => {
    db.collection(`${pId}`)
      .orderBy("timestamp")
      .onSnapshot((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          if(doc.data().type == "close"){
            console.log("모집마감 주체자", doc.data().username);
            setCBtn(true);
          }
          if(doc.data().type == "ssonda"){
            console.log("내가쏜다 주체자", doc.data().username);
            setSBtn(true);
            setPlace(doc.data().place);
            setFee("0");
          }
          if(doc.data().username == "관리자"){
            console.log("db에 존재", cnt, fee)
            setCnt(cnt+1);
            setFee(fee/cnt); // 둘다 int형이어야 함
            console.log("db에 존재2", cnt, fee)
          }
        });
      });
  }, []);

  // useEffect(() => {
  //   const room = {pId} + "_";
  //   db.collection(`${room}`)
  //     .orderBy("timestamp")
  //     .onSnapshot((querySnapshot) => {
  //       querySnapshot.forEach(doc => {
  //           setCnt(cnt+1);
  //           setFee(fee/cnt); // 둘다 int형이어야 함
  //       });
  //     })
  // })


  return (
    <div>
      {here.isLoading && <div>isLoading</div>}
      <NoticeBar
        fee={fee}
        addr={place}
      />

      <ChatContent />

      <ButtonContainer>
        <Button
          id="closeBtn"
          onClick={onClosing}
          disabled={closeBtn}
        >
          모집마감
        </Button>

        <IconButton
          onClick={onShooting}
          disabled={shootBtn}
        >
          <MonetizationOnIcon
            sx={{
              fontSize: 50,
            }}
          />
        </IconButton>
        
        <Button onClick={onMap}>지도</Button>
      </ButtonContainer>

      <ChatInput />
    </div>
  );
};

export default ChatContainer;
