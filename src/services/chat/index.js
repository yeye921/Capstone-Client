import axios from "axios";
import { QueryClient, useQuery } from "react-query";
const BASE_URL = "http://3.39.125.17/chat";

export const ssondaData = async (uId, pId) => {
  const headers = {
    "Access-Control-Allow-Origin": "*",
  };
  try {
    const response = await axios.put(
      BASE_URL,
      {
        p_id: pId,
        u_id: uId,
      },
      { headers: headers },
      { withCredentials: false },
    );
    return response;
  } catch (error) {
    console.error(error);
  }
};
export const getLocationData = async (setUserInfo, pId) => {
  try {
    const response = await axios.get(BASE_URL + `?pId=${pId}`);
    setUserInfo(response.data);
    console.log(response);
  } catch (error) {
    console.error(error);
  }
};

export const getOrderData = async (props) => {
  try {
    const response = await axios.get(BASE_URL + `/orders?pId=${props}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
