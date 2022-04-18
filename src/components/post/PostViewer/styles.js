import styled from "styled-components";
import Button from "../../common/Button";

const PostContainer = styled.div`
    text-align: center;
    margin-top: 1em;
`

const BoxCotainer = styled.div`
    padding: 1em;
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-around;

    input {
        border-color: #ffffff;
    }
`

const PostButton = styled(Button)`
    position: fixed;
    bottom: 10vw;
    right: 10vw;
    width: 20vw;
    height: 7vh;
`

const RestCotainer = styled.div`
    padding: 1em;
    display: flex;
    justify-content: space-between;
    margin-left: 15vw;
    margin-right: 10vw;
    font-size: 90%;
    div {
        color: #696969;
    }
    input {
        width: 15vw;
    }
    p {
        margin: 0px;
        display: flex;
    }
`

const Fee = styled.div`
    width: 100%;
    margin: 0;
    float: right;
    text-align: right;
    margin-right: 15vw;
    p {
        font-size: small;
    }
`

export { PostContainer, BoxCotainer, PostButton, RestCotainer, Fee }