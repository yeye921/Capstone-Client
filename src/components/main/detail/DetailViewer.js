import React, { useEffect, useState } from "react";
import { getDetail } from "../../../services/main/mainData";

const DetailViewer = ({post}) => {
    const [details, setDetails] = useState(null);

    useEffect(()=>{
        getDetail(setDetails, post);
    },[]);

    return (
        <>
            <div>{details.title}</div>
        </>
    )
}

export default DetailViewer;