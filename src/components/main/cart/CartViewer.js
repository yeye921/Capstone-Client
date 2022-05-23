import React, { useState } from 'react';
import styled from 'styled-components';
import Header from '../../common/Header';

const Container = styled.div`
	// background-color: yellow;
	// padding-top: 4rem;
	margin-bottom: 4rem;
`;

const CartViewer = () => {
	return (
		<Container>
			<Header name="내 주문 목록" />
			<h1>여기는 Cart</h1>
		</Container>
	);
};
export default CartViewer;
