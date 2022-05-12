// 동네인증 데이터
import axios from 'axios';

const BASE_URL = 'http://3.39.125.17/neighbor';

export const authData = async (uId, x, y, roadAddr, lotAddr) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
  };
  try {
    const response = await axios.put(
      BASE_URL,
      {
        u_id: uId,
        u_x: x,
        u_y: y,
        road_address: roadAddr,
        address: lotAddr,
      },
      { headers: headers },
      { withCredentials: false },
    );
    return response;
  } catch (error) {
    console.error(error);
  }
};
