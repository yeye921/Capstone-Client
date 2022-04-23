import axios from 'axios';

const POST_BASE_URL = "http://192.168.35.145:8080/post"
//윤정ip

export const menuData = async(inputData) => {
    const headers = {
        'Access-Control-Allow-Origin' : "*"
    }
    try {
        const response = await axios.post(POST_BASE_URL, {
            menu: inputData.menu,
            price: inputData.price,
            request: inputData.request,
        }, {headers:headers}, {withCredentials: false})
        console.log(response);
    } catch(error) {
        console.error(error);
    }
}