import axios from "axios";

const POST_BASE_URL = "http://3.39.164.26/post";

export const postData = async (inputData, postTime, uId) => {
  const headers = {
    "Access-Control-Allow-Origin": "*",
  };
  try {
    const response = await axios.post(
      POST_BASE_URL,
      {
        title: inputData.title,
        order_time: inputData.orderTime,
        post_time: postTime,
        shooting_user: null,
        p_location: "null",
        u_id: uId,
        r_id: inputData.restaurant,
      },
      { headers: headers },
      { withCredentials: false },
    );
    return response;
  } catch (error) {
    console.error(error);
  }
};
