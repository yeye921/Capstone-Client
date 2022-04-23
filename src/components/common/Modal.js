import React from 'react';
import styled from 'styled-components';
import Button from './Button';

const Background = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: rgba(0,0,0,0.50);
    z-index: 0;
`

const ModalContainer = styled.div`
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    max-height: 80%;
    width: 20rem;
    height: 80%;
    padding: 16px;
    background: white;
    border-radius: 10px;
    text-align: center;
`;

const ModalButton = styled(Button)`
    text-align: center;
    width: 20vw;
    height: 7vh;

    position: absolute;
    bottom: 10vw;
    right: 0;
    left: 0;
    margin: auto;
`

export { Background, ModalContainer,ModalButton };