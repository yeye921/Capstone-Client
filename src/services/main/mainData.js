import axios from 'axios';

const BASE_URL = "http://localhost:8080/main";

// 전체 게시글 목록 불러오기 & 카테고리 별 게시글 목록 불러오기
export const mainData = async({setLists, url}) => {
    const headers = {
        'Access-Control-Allow-Origin' : "*"
    }
    try {
        // 요청이 시작 할 때에는 lists를 초기화
        setLists(null);
        const response = await axios.get(url);
        setLists(response.data);  // 데이터는 response.data에 들어있음
        // console.log(response.data);
    } catch(error) {
        console.error(error);
    }
} 

export const getDetail = async(setDetails, post) => {
    try {
        const response = await axios.get(BASE_URL + `/detail?pId=${post}`);
        setDetails(response.data);
    } catch(error) {
        console.error(error);
    }
}