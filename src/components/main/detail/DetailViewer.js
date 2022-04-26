import React from "react";
import { getDetail } from "../../../services/main/mainData";

const DetailViewer = (postId) => {
    const data = getDetail(postId);

    console.log(data);

    return (
        <></>
    )
}

export default DetailViewer;