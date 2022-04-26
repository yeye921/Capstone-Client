import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {ListContainer} from '../MainStyle';
import ListItem from './ListItem';
import { mainData } from '../../../services/main/mainData'

const Content = (props) => {
    // 실제 게시글 데이터
    /*
    const [lists, setLists] = useState(null);
    
    // 게시글 목록 불러오기
    useEffect(() => {
        mainData(setLists);
    }, []);
    */
    

    // 게시글 데이터 example
    const [lists, setLists] = useState([
        {
          title: "짜장면 먹어요",
          r_name: "홍콩반점 매탄점",
          order_time: 8,
          min_price: 12000,
          fee: 250,
        },
        {
          title: "햄버거 팟 구함",
          r_name: "맥도날드 매탄점",
          order_time: 7,
          min_price: 12000,
          fee: 250,
        },
      ])


    return(
        <>  <div>{props.value}</div>
            {/* <div>전달받은 url {props.url}</div> */}
            <ListContainer>
              {lists.map((item,index) => (
                      <ListItem item={item} key={index} />
              ))}

              {/* {lists.map(item => (
                  <ListItem item={item} key={item.id} />
              ))} */}

            </ListContainer>
        </>
    )

}
export default Content;