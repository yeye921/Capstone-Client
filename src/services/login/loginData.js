import axios from 'axios';

const POST_BASE_URL = "http://192.168.35.145:8080/login"
//윤정ip

export const loginData = async(inputData) => {
    const headers = {
        'Access-Control-Allow-Origin' : "*"
    }
    try {
        const response = await axios.post(POST_BASE_URL, {
            phone : inputData.id,
            pw: inputData.pw,
        }, {headers:headers}, {withCredentials: false})
        console.log(response);
    } catch(error) {
        console.error(error);
    }
}