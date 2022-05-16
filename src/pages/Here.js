/*global kakao */
import React, { useEffect, useState } from "react";
// import { markerdata } from "../../data/markerData";
import MainHeader from "../components/common/MainHeader";
import "./Here.css";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useNavigate, useLocation } from "react-router-dom";
import Header from "../components/common/Header";
import axios from "axios";
import { getLocationData } from "../services/chat";
import { useMutation, useQuery } from "react-query";

export default function Here() {
  const navigate = useNavigate();
  const Info = useLocation();
  const [userInfo, setUserInfo] = useState();
  const { isLoading, data } = useQuery("here");

  if (isLoading) {
    console.log(isLoading);
  }

  const getData = async () => {
    await axios
      .get(`http://3.39.125.17/chat?pId=${Info.state.pId}`)
      .then((data) => {
        let users = data.data;
        if (users.length === 0) {
          setUserInfo(users);
        }
        mapscript(users);
      });
  };

  // props로 참여자들 위치 받아와야 함
  const mapscript = (props) => {
    kakao.maps.load(() => {
      let container = document.getElementById("map");
      let options = {
        //사용자 uId 위치로 중심 위치 설정
        center: new kakao.maps.LatLng(37.2775, 127.0438666666667),
        level: 3,
      };
      //map
      const map = new kakao.maps.Map(container, options);

      //markerdata 대신 서버에서 받아온 데이터로 대체
      props.forEach((el) => {
        new kakao.maps.Marker({
          map: map,
          position: new kakao.maps.LatLng(el.u_y, el.u_x),
          title: el.u_id,
        });
      });

      let imageSrc = "https://cdn-icons-png.flaticon.com/512/929/929426.png", // 마커이미지의 주소
        imageSize = new kakao.maps.Size(64, 69), // 마커이미지의 크기
        imageOption = { offset: new kakao.maps.Point(27, 69) };

      let markerImage = new kakao.maps.MarkerImage(
          imageSrc,
          imageSize,
          imageOption
        ),
        markerPosition = new kakao.maps.LatLng(data.y, data.x); // 마커가 표시될 위치

      //이미지 마커 생성
      let marker = new kakao.maps.Marker({
        position: markerPosition,
        image: markerImage, // 마커이미지 설정
      });

      // 마커가 지도 위에 표시되도록 설정
      marker.setMap(map);

      // 커스텀 오버레이에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다
      let content =
        '<div class="customoverlay">' +
        '  <a href="https://map.kakao.com/link/map/11394059" target="_blank">' + // for 링크
        // `   <span class="title">${here}</span>` +
        `   <span class="title">여기서 모여!</span>` +
        "  </a>" +
        "</div>";

      // 커스텀 오버레이 생성
      new kakao.maps.CustomOverlay({
        map: map,
        position: markerPosition,
        content: content,
        yAnchor: 1,
      });
    });
  };
  useEffect(() => {
    getData();
  }, [userInfo]);
  const backClick = () => {
    // 뒤로 가기
    navigate("/main"); // 채팅방 만들어지면 경로 수정하기
  };
  return (
    <div>
      <Header name={Info.state.title} />
      <div
        id="map"
        // style={{width:"400px", height:"800px"}}
        style={{ width: "100vw", height: "100vh" }}
      ></div>
    </div>
  );
}
