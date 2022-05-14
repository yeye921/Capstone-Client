import axios from 'axios';
// 게시글 제목 or 매장명으로 검색
// 검색 내용과 일치하는 게시글 불러오기

export const searchData = async (setLists, searchValue) => {
  const url = 'http://3.39.125.17/main/search?keyword=' + searchValue;
  try {
    // 요청이 시작 할 때에는 lists를 초기화
    setLists(null);
    const response = await axios.get(url);
    setLists(response.data); // 데이터는 response.data에 들어있음
    // console.log(response.data);
  } catch (error) {
    console.error(error);
  }
};
