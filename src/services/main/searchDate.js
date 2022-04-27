import axios from 'axios';
// 매장명으로 검색: /main?rName=매장명
// 게시글 제목으로 검색: /main?postTitle=제목
const POST_BASE_URL = "http://localhost:8080/main"

// 검색 내용과 일치하는 게시글 불러오기
export const searchData = async({setLists, searchValue}) => {
    const headers = {
        'Access-Control-Allow-Origin' : "*"
    }
    try {
        // 요청이 시작 할 때에는 lists를 초기화
        setLists(null);
        const response = await axios.get(POST_BASE_URL);
        setLists(response.data);  // 데이터는 response.data에 들어있음
        // console.log(response.data);
    } catch(error) {
        console.error(error);
    }
} 