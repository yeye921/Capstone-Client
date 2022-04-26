import axios from 'axios';

const POST_BASE_URL = "http://192.168.35.145:8080/signup"
//윤정ip

export const signData = async(inputData) => {
    const headers = {
        'Access-Control-Allow-Origin' : "*"
    }
    try {
        const response = await axios.post(POST_BASE_URL, {
            phone: inputData.id,
            name: inputData.name,
            pw: inputData.pw,
            bank: inputData.bank,
            account: inputData.account,
        }, {headers:headers}, {withCredentials: false})
        console.log(response);
    } catch(error) {
        console.error(error);
    }
}