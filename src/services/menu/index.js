import axios from 'axios';

const POST_BASE_URL = "http://localhost:8080/post"

export const menuData = async(inputData) => {
    const headers = {
        'Access-Control-Allow-Origin' : "*"
    }
    try {
        const response = await axios.put(POST_BASE_URL, {
            u_id: 1,
            p_id: 1,
            menu: inputData.menu,
            price: inputData.price,
            request: inputData.request,
        }, {headers:headers}, {withCredentials: false})
        console.log(response);
    } catch(error) {
        console.error(error);
    }
}