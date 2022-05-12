/*global kakao */
import React, { useEffect } from "react";
// import { markerdata } from "../../data/markerData";
import MainHeader from "../components/common/MainHeader";
import "./Here.css";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useNavigate } from "react-router-dom";

export const markerdata = [
  {
    title: "아주플러스원",
    lat: 37.2787,
    lng: 127.0447,
  },
  {
    title: "써니텔",
    lat: 37.2759,
    lng: 127.0442,
  },
  {
    title: "예일고시원",
    lat: 37.2779,
    lng: 127.0427,
  },
];

export default function Here() {
  const navigate = useNavigate();

  // props로 참여자들 위치 받아와야 함
  const mapscript = (props) => {
    kakao.maps.load(() => {
      let container = document.getElementById("map");
      let options = {
        // 중심 위치 설정
        // center: new kakao.maps.LatLng(37.27790544003763, 127.04686160352978),
        center: new kakao.maps.LatLng(37.2775, 127.0438666666667),
        level: 3,
      };
      const here = "어린이 공원";
      //map
      const map = new kakao.maps.Map(container, options);

      // 그냥 마커
      markerdata.forEach((el) => {
        // 마커를 생성합니다
        new kakao.maps.Marker({
          //마커가 표시 될 지도
          map: map,
          //마커가 표시 될 위치
          position: new kakao.maps.LatLng(el.lat, el.lng),
          //마커에 hover시 나타날 title
          title: el.title,
        });
      });

      // 이미지 마커
      let imageSrc = "https://cdn-icons-png.flaticon.com/512/929/929426.png", // 마커이미지의 주소
        imageSize = new kakao.maps.Size(64, 69), // 마커이미지의 크기
        imageOption = { offset: new kakao.maps.Point(27, 69) }; // 마커이미지의 옵션, 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.

      // 마커의 이미지정보를 가지고 있는 마커이미지를 생성
      let markerImage = new kakao.maps.MarkerImage(
          imageSrc,
          imageSize,
          imageOption
        ),
        markerPosition = new kakao.maps.LatLng(37.2775, 127.0438666666667); // 마커가 표시될 위치

      // 이미지 마커 생성
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

      // 커스텀 오버레이가 표시될 위치
      let position = new kakao.maps.LatLng(37.2775, 127.0438666666667);

      // 커스텀 오버레이 생성
      new kakao.maps.CustomOverlay({
        map: map,
        position: position,
        content: content,
        yAnchor: 1,
      });
    });
  };
  useEffect(() => {
    mapscript();
  }, []);
  const backClick = () => {
    // 뒤로 가기
    navigate("/main"); // 채팅방 만들어지면 경로 수정하기
  };
  return (
    <div>
      <div className="header">
        <div onClick={backClick}>
          <ArrowBackIosNewIcon
            sx={{
              fontSize: 30,
              color: "white",
              paddingLeft: "0.5rem",
            }}
          />
        </div>
        <div className="text">여기서 모여</div>
      </div>

      <div
        id="map"
        // style={{width:"400px", height:"800px"}}
        style={{ width: "100vw", height: "100vh" }}
      ></div>
    </div>
  );
}
