import React, {useEffect, useState} from 'react';
import { useLocation } from "react-router-dom";
import axios from 'axios';
import {ListContainer} from '../MainStyle';
import ListItem from './ListItem';
import { mainData } from '../../../services/main/mainData'

// 파일 분리 안한 버전
const SearchContent = (props) => {

    // 페이지 이동하면서 받아온 검색 데이터 
    const location = useLocation();
    const { searchValue } = location.state;
    // console.log('state', location.state);

    // 게시글 데이터
    const [lists, setLists] = useState(null);

    
    // 게시글 목록 불러오기
    // 페이지 이동하면서 받아온 검색 데이터로 url설정해야함 (in searchData or 여기서)
    useEffect(() => {
        mainData(setLists, searchValue);
        // mainData();
    }, []);


    // 게시글 데이터 example
    // const [lists, setLists] = useState([
    //     {
    //       title: "짜장면 먹어요",
    //       r_name: "홍콩반점 매탄점",
    //       order_time: 8,
    //       min_price: 12000,
    //       fee: 250,
    //     },
    //     {
    //       title: "짜장면 팟 구함",
    //       r_name: "래원 매탄점",
    //       order_time: 7,
    //       min_price: 12000,
    //       fee: 250,
    //     },
    //   ])


    return(
        <>  
            <div>전달받은 url {props.url}</div>
            <div>전달받은 value {searchValue}</div>
            <ListContainer>

              {lists && lists.map((item, index) => (
                  <ListItem item={item} key={index} />
              ))}
            </ListContainer>
        </>
    )

}
export default SearchContent;