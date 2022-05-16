import axios from "axios";

const POST_BASE_URL = "http://3.39.125.17/post";

export const menuData = async (uId, postId, inputData) => {
  const headers = {
    "Access-Control-Allow-Origin": "*",
  };
  try {
    const response = await axios.put(
      POST_BASE_URL,
      {
        u_id: uId,
        p_id: postId,
        menu: inputData.menu,
        price: inputData.price,
        request: inputData.request,
      },
      { headers: headers },
      { withCredentials: false }
    );
  } catch (error) {
    console.error(error);
  }
};
