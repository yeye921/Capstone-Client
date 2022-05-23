// 사용자 지정 나눔위치
/*global kakao */
import React, { useEffect, useState } from "react";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import "./MyMap.css";
import { mapData } from "../services/mypage/mapData";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { xState, yState } from "../state";

export default function MyMap() {
  // 사용자 동네인증 좌표
  const [uX, setUX] = useRecoilState(xState);
  const [uY, setUY] = useRecoilState(yState);

  let [roadAddr, setRoadAddr] = useState("");
  let [lotAddr, setLotAddr] = useState("");
  let [x, setX] = useState(0);
  let [y, setY] = useState(0);
  let [input, setInput] = useState("");
  const navigate = useNavigate();

  const mapscript = () => {
    kakao.maps.on(() => {
      console.log("x,y", x, y);
      let container = document.getElementById("map");
      let options = {
        // 중심 위치 설정
        center: new kakao.maps.LatLng(uX, uY),
        level: 5,
      };
      //map
      const map = new kakao.maps.Map(container, options);

      // 주소-좌표 변환 객체 생성
      var geocoder = new kakao.maps.services.Geocoder();

      var marker = new kakao.maps.Marker(), // 클릭한 위치를 표시할 마커
        infowindow = new kakao.maps.InfoWindow({ zindex: 1 }); // 클릭한 위치에 대한 주소를 표시할 인포윈도우

      // 지도를 클릭했을 때 클릭 위치 좌표에 대한 주소정보를 표시하도록 이벤트를 등록
      kakao.maps.event.addListener(map, "click", function (mouseEvent) {
        searchDetailAddrFromCoords(
          mouseEvent.latLng,
          function (result, status) {
            if (status === kakao.maps.services.Status.OK) {
              var detailAddr = !!result[0].road_address
                ? "<div>도로명주소 : " +
                  result[0].road_address.address_name +
                  "</div>"
                : "";
              detailAddr +=
                "<div>지번 주소 : " + result[0].address.address_name + "</div>";

              var content =
                '<div class="bAddr">' +
                '<span class="title">주소 상세정보</span>' +
                detailAddr +
                "</div>";

              setRoadAddr(
                !!result[0].road_address
                  ? result[0].road_address.address_name
                  : "",
              );
              setLotAddr(result[0].address.address_name);

              // 마커를 클릭한 위치에 표시
              marker.setPosition(mouseEvent.latLng);
              marker.setMap(map);

              // 인포윈도우에 클릭한 위치에 대한 법정동 상세 주소정보를 표시
              infowindow.setContent(content);
              infowindow.open(map, marker);
            }
          },
        );
      });
      function searchDetailAddrFromCoords(coords, callback) {
        // 좌표로 법정동 상세 주소 정보를 요청
        // console.log('coods.getLng', coords.getLng(), coords.getLat());
        setX(coords.getLng());
        setY(coords.getLat());
        geocoder.coord2Address(coords.getLng(), coords.getLat(), callback);
      }
    });
  };

  useEffect(() => {
    mapscript();
  }, []);

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (input !== "" && lotAddr !== "" && x !== 0 && y !== 0) {
      console.log(input, roadAddr, lotAddr, x, y);
      mapData(input, roadAddr, lotAddr, x, y);
      // navigate('/main');
    } else if (x === 0 && y === 0) {
      alert("원하는 나눔 위치를 지도에서 클릭해주세요.");
    }
  };

  const backClick = () => {
    // 뒤로 가기
    navigate("/main"); // 마이페이지 만들어지면 경로 수정하기
  };
  return (
    <div>
      <div className="header">
        <div onClick={backClick}>
          <ArrowBackIosNewIcon
            sx={{
              fontSize: 26,
              color: "white",
              paddingLeft: "0.5rem",
            }}
          />
        </div>
        <div className="text">원하는 나눔 위치 설정</div>
      </div>

      <div id="map" style={{ width: "100vw", height: "80vh" }}></div>

      <div className="guide">지도에서 원하는 나눔 위치를 클릭하세요</div>
      <div className="box">
        <form onSubmit={onSubmit}>
          <input
            required
            value={input}
            onChange={handleChange}
            placeholder="위치를 저장할 이름을 입력"
            style={{
              width: "11rem",
              height: "2rem",
              paddingLeft: "0.4rem",
              // backgroundColor: 'yellow',
              marginRight: "0.7rem",
            }}
          ></input>
          <Button
            variant="contained"
            type="submit"
            // onClick={handleClick}
            style={{
              borderRadius: 10,
              // backgroundColor: 'rgb(42, 95, 149)', // 남색
              backgroundColor: "rgb(250,224,82)", // 노란색
              // backgroundColor: 'rgb(104,193,251)', // 하늘색
              fontWeight: "bold",
              fontSize: "15px",
              color: "white",
            }}
          >
            {/* 클릭한 위치로 설정 */}
            확인
          </Button>
        </form>
      </div>
    </div>
  );
}
