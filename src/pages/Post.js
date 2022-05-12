import React from "react";
import Header from "../components/common/Header";
import PostInputContainer from "../containers/post/PostInputContainer";

const Post = () => {
  return (
    <>
      <Header name={"나눔등록"} />
      <PostInputContainer />
    </>
  );
};

export default Post;
