import React from 'react';
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';
import DetailViewer from '../../components/main/detail/DetailViewer';

const DetailContainer = () => {
    const { search } = useLocation();
    const { postId } = queryString.parse(search);

    return <DetailViewer post={postId}/>;
}

export default DetailContainer;