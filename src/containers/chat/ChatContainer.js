import React, { useEffect, useState } from 'react';
import Button from '../../components/common/Button';
import { getOrderData, ssondaData } from '../../services/chat';
import GroupsIcon from '@mui/icons-material/Groups';
import { FaMapMarkedAlt } from 'react-icons/fa';
import { IoReceipt } from 'react-icons/io5';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import IconButton from '@mui/material/IconButton';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';
import Topbar from '../../components/chat/Topbar';
import { QueryClient, useMutation, useQuery } from 'react-query';
import axios from 'axios';
import { useHere } from '../../services/mutation';
import NoticeBar from '../../components/chat/NoticeBar';
import { useRecoilState } from 'recoil';
import { idState, roadAddrState, addrState, pidState, titleState, feeState, nameState } from '../../state';
import styled from 'styled-components';

import ChatContent from '../../components/chat/firebase/ChatContent';
import ChatInput from '../../components/chat/firebase/ChatInput';

import firebase from 'firebase/app';
import 'firebase/firestore';
import { db } from '../../components/chat/firebase/firebase';
import OrderModal from '../../components/orders/OrderModal';

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
	const [ name, setName ] = useRecoilState(nameState);
	// const [fee, setFee] = useRecoilState(feeState); // 상단 바 배달비
	const [ uId, setuId ] = useRecoilState(idState);
	const [ roadAddr, setRoadAddr ] = useRecoilState(roadAddrState);
	const [ addr, setAddr ] = useRecoilState(addrState);
	const [ pId, setPid ] = useRecoilState(pidState);
	const [ title, setTitle ] = useRecoilState(titleState);

	const [ closeBtn, setCBtn ] = useState(false);
	const [ shootBtn, setSBtn ] = useState(false);

	const [ openModal, setOpenModal ] = useState({
		items: [],
		isOpen: false
	});

	const [ totalFee, setTotalFee ] = useState(state.fee);
	const [ fee, setFee ] = useState(state.fee); // 상단 바 배달비

	// state.fee로 다 수정하기
	// const [totalFee, setTotalFee] = useState("3000");
	// let [fee, setFee] = useState("3000"); // 상단 바 배달비

	const navigate = useNavigate();

	//const { pId } = queryString.parse(state);
	const here = useHere('here', 'http://3.39.125.17/chat');
	const { data } = useQuery('here');

	const [ place, setPlace ] = useState(''); // 상단 바 나눔 위치
	const [ click, setClick ] = useState(false); // 내가 쏜다가 클릭되었는지 여부
	const [ ssonda, setSssonda ] = useState(false); // 내가 쏜다 주체자인지 여부

	const sendingHere = (place) => {
		const room = pId + '나눔 위치';
		db.collection(`${room}`).add({
			place: place,
			username: '여기서모여위치'
		});
	};

	// 원래 주석처리 됨
	// if (data) {
	//   // console.log("서버에서 받아온 나눔위치",data.place_name);

	//   sendingHere(data.place_name);
	//   // 여기서 주문 확정 메시지도 보내야 함
	// }

	useEffect(
		() => {
			if (data) {
				sendingHere(data.nanumPlace.place_name);
				// 이걸 보내고 나서 읽어와야 함
				// 여기서 주문 확정 알림 보냄
			}
		},
		[ data ]
	);

	const onClosing = () => {
		const msg = '모집이 마감되었습니다.';
		sendingClose(msg); // 이 메시지가 빨리 안감
		here.mutate({ pId: pId });
	};

	const onShooting = () => {
		ssondaData(uId, pId);

		const msg = name + '님이 쏜다! 내 위치로 집합!';
		console.log(roadAddr);
		if (roadAddr.length === 0) {
			sendingSSonda(msg, addr);
		} else {
			sendingSSonda(msg, roadAddr);
		}
	};

	const sendingSSonda = (msg, place) => {
		db.collection(`${pId}`).doc('ssonda').set({
			msg: msg,
			username: name,
			type: 'ssonda',
			place: place,
			timestamp: firebase.firestore.FieldValue.serverTimestamp()
		});
	};

	const sendingClose = (msg) => {
		db.collection(`${pId}`).doc('close').set({
			msg: msg,
			username: name,
			type: 'close',
			timestamp: firebase.firestore.FieldValue.serverTimestamp()
		});
	};

	const onMap = (e) => {
		navigate('/here', {
			state: {
				pId: pId,
				title: title
			}
		});
	};

	// 채팅 받아오기
	useEffect(() => {
		db.collection(`${pId}`).orderBy('timestamp').onSnapshot((querySnapshot) => {
			querySnapshot.forEach((doc) => {
				if (doc.data().type === 'ssonda') {
					// console.log("ssoda클릭", click);
					if (doc.data().username === name) {
						console.log('나는 내가쏜다 주체자입니다');
						setFee(totalFee);
						setSssonda(true);
						console.log('fee', fee);
					} else {
						setFee(0);
						console.log('fee', fee);
					}
					setClick(true); // 이게 적용 안됨
					// click = "true";
					setSBtn(true);
					setPlace(doc.data().place);
					// console.log("ssondaClicked", click);
				}
				if (doc.data().type === 'close') {
					console.log('모집마감 주체자', doc.data().username);
					setCBtn(true);
				}
			});
		});
	}, []);

	// Ver2 배달비 계산
	useEffect(
		() => {
			// click = true;
			console.log('배달비_쏜다클릭여부', click);
			if (!click) {
				// 내가 쏜다 안할 때만 배달비 계산함
				const room = pId + '참여자 리스트';
				db.collection(`${room}`).orderBy('timestamp').onSnapshot((querySnapshot) => {
					// 변화 감지
					let cnt = 1;
					console.log('totalFee', totalFee);
					querySnapshot.forEach((doc) => {
						// 각 문서마다 실행
						if (doc.data().username === '관리자') {
							cnt += 1;
							let currentFee = Math.floor(totalFee / cnt);
							setFee(currentFee);
							console.log('배달비 계산', cnt, currentFee, fee);
						}
					});
				});
			} else {
				// 내가 쏜다일 경우
				// 다시 원래대로 되돌림
				if (ssonda) {
					setFee(totalFee);
				} else {
					setFee(0);
				}
			}
		},
		[ click ]
	); //click,ssonda 바꿔보기

	useEffect(() => {
		const room = pId + '나눔 위치';
		db.collection(`${room}`).where('username', '==', '여기서모여위치').onSnapshot((querySnapshot) => {
			let loc = '';
			querySnapshot.forEach((doc) => {
				loc = doc.data().place;
				setPlace(loc);
				// console.log("둘이 똑같은 위치 찍혀야 함", loc, place);
			});
			//console.log
		});
	}, []);

	const onOrder = () => {
		getOrderData(pId).then((data) => {
			console.log(data);
			setOpenModal({
				items: data,
				isOpen: true
			});
		});
	};
	const closeModal = () => {
		setOpenModal({
			...openModal,
			isOpen: false
		});
	};

	return (
		<div>
			{/* {here.isLoading && <div>isLoading</div>} */}
			<NoticeBar fee={fee} addr={place} />

			<ChatContent />

			<ButtonContainer>
				<IconButton id="closeBtn" onClick={onClosing} disabled={closeBtn}>
					<GroupsIcon
						sx={{
							fontSize: 50,
							// color: "rgba(31, 122, 19, 0.8)",
							color: closeBtn ? 'grey' : 'rgba(31, 122, 19, 0.8)'
						}}
					/>
				</IconButton>

				<IconButton onClick={onShooting} disabled={shootBtn}>
					<MonetizationOnIcon
						sx={{
							fontSize: 50,
							color: shootBtn ? 'grey' : 'rgba(31, 122, 19, 0.8)'
						}}
					/>
				</IconButton>

				<IconButton onClick={onMap}>
					<FaMapMarkedAlt style={{ color: 'rgba(31, 122, 19, 0.8)', fontSize: '40' }} />
				</IconButton>

				<IconButton onClick={onOrder}>
					{/* <div style={{display:"flex"}}> */}
					<IoReceipt style={{ color: 'rgba(31, 122, 19, 0.8)', fontSize: '40' }}>
						<div>주문서</div>
					</IoReceipt>
				</IconButton>
			</ButtonContainer>
			<OrderModal openModal={openModal} closeModal={closeModal} />
			<ChatInput />
		</div>
	);
};

export default ChatContainer;
