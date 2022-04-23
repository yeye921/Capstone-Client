import styled from "styled-components";

const MenuInput = styled.div`
    padding: 1.2em;
    height: 10vh;
    display: flex;
    flex-flow: row nowrap;
    flex-direction: column;
    justify-content: space-around;
    align-items: flex-start;

    input {
        width: 20em;
        height: 4vh;
        border-top: none;
        border-left: none;
        border-right: none;
        border-bottom: 2px solid #696969;
    }
`

const Text = styled.div`
    margin-top: 8vh;
    font-size: small;
    color: #696969;
`

const Title = styled.div`
    padding: 1em;
`

export {MenuInput,Text,Title};