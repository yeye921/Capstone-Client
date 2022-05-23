import axios from "axios";

const BASE_URL = "http://3.39.125.17/main";

export const uIdData = async (u_x, u_y) => {
    const headers = {
        "Access-Control-Allow-Origin": "*",
      };
      try {
        const response = await axios.post(
          BASE_URL,
          {
              u_x: u_x,
              u_y: u_y,
          },
          { headers: headers },
          { withCredentials: false },
        );
        // return response;
        //  console.log("uId", uId);
    } catch (error) {
      console.error(error);
    }
  };