import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import queryString from 'query-string';
import DetailViewer from '../../components/main/detail/DetailViewer';
import { getDetail } from '../../services/main/mainData';

const DetailContainer = () => {
    const { search } = useLocation();
    const { pId } = queryString.parse(search);

    /*server test

    const dispatch = useDispatch();
    const { post } = useSelector((post) => ({
        post: post.post
    }))
    //const [details, setDetails] = useState(null);

    useEffect(() => {
        dispatch(getDetail(pId));
    }, [dispatch, pId]);
    */

    const post = {
        title: '짜장면',
        name: '하진',
        order_time: '13:00',
        r_name:'홍콩반점 매탄점',
        min_price:1000,
    }

    return <DetailViewer post={ post }/>;
}

export default DetailContainer;