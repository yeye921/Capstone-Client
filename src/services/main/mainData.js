import axios from "axios";

const BASE_URL = "http://3.39.125.17/main";

// 전체 게시글 목록 불러오기 & 카테고리 별 게시글 목록 불러오기
export const mainData = async (setLists, url) => {
  try {
    // 요청이 시작 할 때에는 lists를 초기화
    setLists();
    const response = await axios.get(url);
    setLists(response.data); // 데이터는 response.data에 들어있음
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
