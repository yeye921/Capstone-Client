import axios from "axios";

const POST_BASE_URL = "http://3.39.164.26/login";

export const loginData = async (inputData) => {
  const headers = {
    "Access-Control-Allow-Origin": "*",
  };
  try {
    const response = await axios.post(
      POST_BASE_URL,
      {
        phone: inputData.id,
        pw: inputData.pw,
      },
      { headers: headers },
      { withCredentials: false },
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
