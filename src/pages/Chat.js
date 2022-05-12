import React, { useState } from 'react';
import Button from '../components/common/Button';
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';
import { finishData } from '../services/chat';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import IconButton from '@mui/material/IconButton';
import { ssondaData } from '../services/chat/ssondaData';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { idState } from '../state';
import { useNavigate } from 'react-router-dom';

const Chat = () => {
  const [color, setColor] = useState('success'); // 버튼 클릭 시 색상 변경
  const [disable, setDisable] = useState(false); // 버튼 클릭 시 disable처리
  const [fee, setFee] = useState(0); // 채팅방 상단 배달비

  // recoil로 선언한 사용자 로그인 아이디
  const uId = useRecoilValue(idState);
  const setuId = useSetRecoilState(idState);
  const navigate = useNavigate();

  const { search } = useLocation();
  const { pId } = queryString.parse(search);

  const onClick = (e) => {
    e.target.disabled = !e.target.disabled;
    finishData(pId).then((data) => {
      console.log(data);
    });
  };

  const ssondaClick = (e) => {
    setDisable(true);
    setColor('disabled');
    console.log(uId, pId);
    ssondaData(1, 3); // 이건 됐음
    setFee(0);

    // navigate('/login');
  };
  return (
    <>
      <Button onClick={onClick}>모집마감</Button>

      {/* 내가 쏜다 버튼 */}
      <IconButton onClick={ssondaClick} disabled={disable}>
        <MonetizationOnIcon
          color={color}
          sx={{
            fontSize: 50,
          }}
        />
      </IconButton>
      <div>uid: {uId}</div>
    </>
  );
};

export default Chat;
