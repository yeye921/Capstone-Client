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
import { useRecoilState } from "recoil";
import { xState, yState } from "../state";

export default function Here() {
  const navigate = useNavigate();
  const Info = useLocation();
  const [userInfo, setUserInfo] = useState({});
  //const { isLoading } = useQuery("here");

  const [data, setData] = useState({
    x: "",
    y: "",
  });

  const [x, setX] = useRecoilState(xState);
  const [y, setY] = useRecoilState(yState);

  useEffect(() => {
    axios
      .all([
        axios.get(`http://3.39.125.17/chat?pId=${Info.state.pId}`),
        axios.get(
          `http://3.39.125.17/chat/nanumPlaceInfo?pId=${Info.state.pId}`,
        ),
      ])
      .then(
        axios.spread((res1, res2) => {
          let users = res1.data;
          if (users.length !== 0) {
            // setUserInfo(users);
          }
          if (res2) {
            console.log(res2);
            // setData({
            //   x: res2.data.x,
            //   y: res2.data.y,
            // });
          }
          mapscript(users, res2.data);
        }),
      )
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    if (userInfo.length !== 0) {
      //mapscript(userInfo);
    }
  }, [data]);

  const getData = async () => {
    await axios
      .get(`http://3.39.125.17/chat?pId=${Info.state.pId}`)
      .then((data) => {
        let users = data.data;
        if (users.length !== 0) {
          setUserInfo(users);
        }
        //mapscript(users);
      });
  };

  const getPLocation = async () => {
    await axios
      .get(`http://3.39.125.17/chat/nanumPlaceInfo?pId=${Info.state.pId}`)
      .then((response) => {
        setData({
          x: response.data.x,
          y: response.data.y,
        });
      });
  };

  // props로 참여자들 위치 받아와야 함
  const mapscript = (users, data) => {
    kakao.maps.load(() => {
      let Y = data.y != "" ? data.y : y;
      let X = data.x != "" ? data.x : x;
      console.log(data);
      let container = document.getElementById("map");
      let options = {
        center: new kakao.maps.LatLng(Y, X),
        level: 3,
      };
      //map
      const map = new kakao.maps.Map(container, options);
      //markerdata 대신 서버에서 받아온 데이터로 대체
      users.forEach((el) => {
        new kakao.maps.Marker({
          map: map,
          position: new kakao.maps.LatLng(el.u_y, el.u_x),
          title: el.u_id,
        });
      });

      if (data.x != "" && data.y != "") {
        let imageSrc = "https://cdn-icons-png.flaticon.com/512/929/929426.png", // 마커이미지의 주소
          imageSize = new kakao.maps.Size(64, 69), // 마커이미지의 크기
          imageOption = { offset: new kakao.maps.Point(27, 69) };

        let markerImage = new kakao.maps.MarkerImage(
            imageSrc,
            imageSize,
            imageOption,
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
      }
    });
  };
  const backClick = () => {
    // 뒤로 가기
    navigate(`/chat?pId=${Info.state.pId}`, {
      state: {
        pId: Info.state.pId,
        title: Info.state.title,
        fee: Info.state.fee, 
      },
    });
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
