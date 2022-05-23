import React, { useState } from 'react';
import styled from 'styled-components';
import Header from '../../common/Header';

const Container = styled.div`
	// padding-top: 4rem;
	margin-bottom: 4rem;
	// background-color: yellow;
`;


const MyPageViewer = () => {
	return (
		<Container>
			<Header name="마이페이지" />
		</Container>
	);
};
export default MyPageViewer;
