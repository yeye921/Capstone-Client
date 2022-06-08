import axios from "axios";

const BASE_URL = "http://3.39.164.26/mymap";

export const mapData = async (input, roadAddr, lotAddr, x, y) => {
  const headers = {
    "Access-Control-Allow-Origin": "*",
  };
  try {
    const response = await axios.post(
      BASE_URL,
      {
        // u_id: 1,
        pl_name: input,
        x: x,
        y: y,
        road_address: roadAddr,
        lot_address: lotAddr,
      },
      { headers: headers },
      { withCredentials: false },
    );
    return response;
  } catch (error) {
    console.error(error);
  }
};
