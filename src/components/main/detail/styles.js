import styled, { css } from "styled-components";
import Button from "../../common/Button";
import { Restaurant, AttachMoney } from "@material-ui/icons";
//import RestuarantIcon from "@material-ui/icons/Restaurant"

const Container = styled.div`

`

const DetailBlock = styled.div`
    padding: 2.5em;
    padding-bottom: 0;
    display: grid;
    grid-template-columns: 0.5fr 1.3fr;
    grid-template-rows: 1fr 1fr;

    .logo {
        font-size: 3em;
        color: #F7D358;
        grid-row-start: 1;
        grid-row-end: 3;
    }

    .type {
        font-size: 0.9em;
        color: #696969;
    }
`

const DetailContent = ({ restaurant, minPrice }) => {
    console.log(minPrice)
    return (
        <>
            <DetailBlock>
                <Restaurant className="logo"/>
                <div className="type">매장</div>
                <div><b>{restaurant}</b></div>
            </DetailBlock>
            <DetailBlock>
                <AttachMoney className="logo"/>
                <div className="type">최소주문금액</div>
                <div><b>{minPrice}</b></div>
            </DetailBlock>
        </>
    )
    
}

const DetailButton = styled(Button)`
    text-align: center;
    font-size: 1em;
    width: 20vw;
    height: 7vh;

    position: absolute;
    bottom: 10vw;
    right: 10vw;
`

export { Container, DetailContent, DetailButton }