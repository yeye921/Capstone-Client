import React from 'react';
import styled, { css } from 'styled-components';
import Face from '@material-ui/icons/Face'

const SubInfoBlock = styled.div`
    margin-top: 1.5em;
    margin-left: 2.5em;
    margin-right: 2.5em;
    margin-bottom: 1em;
    font-size: 0.8em;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #696969;
`;

const UserBlock = styled.div`
    width: 15vw;
    display: flex;
    justify-content: space-between;
    align-items: center;
`

const SubInfo = ({ user, orderTime }) => {
    return (
        <SubInfoBlock>
            <UserBlock><Face/><b>{user}</b></UserBlock>
            <span><b>{orderTime}</b> 주문 예정</span>
        </SubInfoBlock>
    );
};

export default SubInfo;