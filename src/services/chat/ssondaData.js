// 내가 쏜다
import axios from 'axios';

const BASE_URL = 'http://3.39.125.17/chat';

export const ssondaData = async (uId, pId) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
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
