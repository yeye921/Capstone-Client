// 동네 인증 페이지
/*global kakao */
import React, { useEffect, useState } from "react";
import "./MyMap.css";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { authData } from "../services/Neighbor/authData";
import { idState } from "../state";
import { useRecoilState } from "recoil";

export default function Neighbor() {
  // let uId = 1;
  const [uId] = useRecoilState(idState); // 회원가입 할 때 받은 아이디

  let [roadAddr, setRoadAddr] = useState("");
  let [lotAddr, setLotAddr] = useState("");
  let [x, setX] = useState(0);
  let [y, setY] = useState(0);
  const navigate = useNavigate();

  const mapscript = () => {
    kakao.maps.load(() => {
      let container = document.getElementById("map");
      let options = {
        center: new kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
        level: 4, // 지도의 확대 레벨
      };

      const map = new kakao.maps.Map(container, options);
      // map.setDraggable(false); // 지도 드래그 이동 막기
      map.setZoomable(false); // 지도 확대 축소 막기

      // 좌표-주소 변환 객체 생성
      let geocoder = new kakao.maps.services.Geocoder();

      // HTML5의 geolocation으로 사용할 수 있는지 확인
      if (navigator.geolocation) {
        // GeoLocation을 이용해서 접속 위치를 얻어옴
        navigator.geolocation.getCurrentPosition(function (position) {
          let lat = position.coords.latitude, // 위도
            lon = position.coords.longitude; // 경도

          let locPosition = new kakao.maps.LatLng(lat, lon), // 마커가 표시될 위치를 geolocation으로 얻어온 좌표로 생성
            message = '<div style="padding:5px;">여기에 계신가요?!</div>'; // 인포윈도우에 표시될 내용

          setX(locPosition.getLng());
          setY(locPosition.getLat());

          // 마커 좌표 - 위치 변환
          searchDetailAddrFromCoords(locPosition, function (result, status) {
            if (status === kakao.maps.services.Status.OK) {
              setRoadAddr(
                !!result[0].road_address
                  ? result[0].road_address.address_name
                  : "",
              );
              setLotAddr(result[0].address.address_name);
            }
          });

          // 마커와 인포윈도우를 표시
          displayMarker(locPosition, message);
        });
      } else {
        // HTML5의 GeoLocation을 사용할 수 없을때 마커 표시 위치와 인포윈도우 내용을 설정

        let locPosition = new kakao.maps.LatLng(33.450701, 126.570667),
          message = "geolocation을 사용할수 없어요..";

        displayMarker(locPosition, message);
      }

      // 지도에 마커와 인포윈도우를 표시하는 함수
      function displayMarker(locPosition, message) {
        // 마커 생성
        let marker = new kakao.maps.Marker({
          map: map,
          position: locPosition,
          draggable: true,
        });

        let iwContent = message, // 인포윈도우에 표시할 내용
          iwRemoveable = true;

        // 인포윈도우를 생성
        let infowindow = new kakao.maps.InfoWindow({
          content: iwContent,
          removable: iwRemoveable,
        });

        // 인포윈도우를 마커위에 표시
        infowindow.open(map, marker);

        // 지도 중심좌표를 접속위치로 변경
        map.setCenter(locPosition);

        // 마커 클릭 이벤트 처리
        kakao.maps.event.addListener(map, "click", function (mouseEvent) {
          let latlng = mouseEvent.latLng;
          marker.setPosition(latlng);

          infowindow.open(map, marker);

          searchDetailAddrFromCoords(latlng, function (result, status) {
            if (status === kakao.maps.services.Status.OK) {
              setRoadAddr(
                !!result[0].road_address
                  ? result[0].road_address.address_name
                  : "",
              );
              setLotAddr(result[0].address.address_name);
            }
          });
        });

        // 마커 드래그 이벤트 처리
        kakao.maps.event.addListener(marker, "dragend", function () {
          setX(marker.getPosition().La); // 위도
          setY(marker.getPosition().Ma); // 경도
          //   console.log('dragend', x, y);
          infowindow.open(map, marker);

          searchDetailAddrFromCoords(
            marker.getPosition(),
            function (result, status) {
              if (status === kakao.maps.services.Status.OK) {
                setRoadAddr(
                  !!result[0].road_address
                    ? result[0].road_address.address_name
                    : "",
                );
                setLotAddr(result[0].address.address_name);
              }
            },
          );
        });
      }
      function searchDetailAddrFromCoords(coords, callback) {
        // 좌표로 법정동 상세 주소 정보를 요청
        geocoder.coord2Address(coords.getLng(), coords.getLat(), callback);
      }
    });
  };
  useEffect(() => {
    mapscript();
  }, []);
  const buttonClick = () => {
    authData(uId, x, y, roadAddr, lotAddr);
    console.log("버튼클릭", uId, x, y, roadAddr, lotAddr);
    navigate("/login");
  };
  return (
    <div>
      <div className="header">
        <div className="text">현재 사는 동네가 이곳이 맞나요?</div>
      </div>

      <div id="map" style={{ width: "100vw", height: "76vh" }}></div>

      <div className="bottom">
        <div className="guide">마커를 움직여 위치를 조정하세요</div>
        <div className="addr">{lotAddr}</div>
        <div className="button">
          <Button
            variant="contained"
            type="submit"
            onClick={buttonClick}
            style={{
              borderRadius: 15,
              backgroundColor: "rgb(247, 217, 86)", // 노란색
              // backgroundColor: 'rgb(104, 193, 251)',
              fontWeight: "bold",
              fontSize: "15px",
              color: "white",
            }}
          >
            {/* 클릭한 위치로 설정 */}
            Yes {">"}
          </Button>
        </div>
      </div>
    </div>
  );
}
