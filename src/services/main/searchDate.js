import axios from 'axios';
// 매장명으로 검색: /main?rName=매장명
// 게시글 제목으로 검색: /main?postTitle=제목

// 검색 내용과 일치하는 게시글 불러오기
export const searchData = async(setLists, searchValue) => {
    const url = "http://localhost:8080/main?postTitle=" + searchValue
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