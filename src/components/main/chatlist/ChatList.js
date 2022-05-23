import React, { useState } from 'react';
import styled from 'styled-components';
import Header from '../../common/Header';

const Container = styled.div`
	// padding-top: 4rem;
	margin-bottom: 4rem;
	// background-color: yellow;
`;


const ChatList = () => {
	return (
		<Container>
			<Header name="채팅방 목록" />
		</Container>
	);
};
export default ChatList;
