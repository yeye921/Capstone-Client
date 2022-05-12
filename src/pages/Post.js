import React from "react";
import MainHeader from "../components/common/MainHeader";
import PostInputContainer from "../containers/post/PostInputContainer";

const Post = () => {
  return (
    <>
      <MainHeader text={"나눔등록"} />
      <PostInputContainer />
    </>
  );
};

export default Post;
