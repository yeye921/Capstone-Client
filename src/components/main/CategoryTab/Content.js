import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {ListContainer} from '../MainStyle';
import ListItem from './ListItem';
import { mainData } from '../../../services/main/mainData'

const Content = (props) => {
    // 실제 게시글 데이터
    const [lists, setLists] = useState(null); // null or []

    // 게시글 목록 불러오기
    useEffect(() => {
        mainData(setLists, props.url);
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
        <>  <div>{props.value}</div>
            <div>전달받은 url {props.url}</div>
            <ListContainer>
              {/* lists === null ? <div>등록된 게시글이 없습니다</div>
              : {lists.map(item => (
                      <ListItem item={item} key={item.id} />
              ))} */}

              {lists && lists.map((item, index) => (
                  <ListItem item={item} key={index} />
              ))}

            </ListContainer>
        </>
    )

}
export default Content;