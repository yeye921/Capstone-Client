import axios from 'axios';

const POST_BASE_URL = "https://3.39.125.17/post"

export const postData = async(inputData, postTime) => {
    const headers = {
        'Access-Control-Allow-Origin' : "*"
    }
    try {
        const response = await axios.post(POST_BASE_URL, {
            title: inputData.title,
            order_time: inputData.orderTime,
            post_time: postTime,
            shooting_user: null,
            p_location: null,
            u_id: 1,
            r_id: 1,
        }, {headers:headers}, {withCredentials: false})
        console.log(response);
        return response;
    } catch(error) {
        console.error(error);
    }
}