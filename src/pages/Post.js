import React from "react";
import Header from "../components/common/Header";
import PostViewerContainer from "../containers/post/PostViewerContainer";

const Post = () => {
    return (
        <>
            <Header name="나눔등록"/>
            <PostViewerContainer />
        </>
    );
};

export default Post;