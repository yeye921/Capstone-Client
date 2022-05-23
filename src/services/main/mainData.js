import axios from "axios";

const BASE_URL = "http://3.39.125.17/main";

// 전체 게시글 목록 불러오기 & 카테고리 별 게시글 목록 불러오기
export const mainData = async (u_x, u_y, setLists, url) => {
  const headers = {
      "Access-Control-Allow-Origin": "*",
    };
    try {
      setLists();
      const response = await axios.post(
        url,
        {
            u_x: u_x,
            u_y: u_y,
        },
        { headers: headers },
        { withCredentials: false },
      );
      setLists(response.data);
      console.log("res.data", response.data);
  } catch (error) {
    console.error(error);
  }
};

export const getDetail = async (setPost, pId) => {
  try {
    const response = await axios.get(BASE_URL + `/detail?pId=${pId}`);
    setPost(response.data);
  } catch (error) {
    console.error(error);
  }
};

/*
export const getDetail = async(pId) => {
    try {
        const response = await axios.get(BASE_URL + `/detail?pId=${pId}`);
        console.log(response);
    } catch(error) {
        console.error(error);
    }
}
*/
