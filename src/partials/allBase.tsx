import { API_URL } from "../config";
import { Irow } from "../store/types";
const axios = require('axios').default;

export const getMyBase = async () => {
    const result = await axios({
        method: 'get',
        url: API_URL + 'api/getbase'
    })
        .then((response: { data: Array<Irow> | undefined }) => {
            // console.log('10 allbase', response.data, typeof (response.data))
            return response.data
        })
        .catch((error: any) => {
            console.log(error);
        })
    // console.log('17', result)
    return result
}

export const getCats = async () => {
    const result = await axios({
        method: 'get',
        url: API_URL + 'api/getCats'
    })
        .then((response: { data: any }) => {
            console.log('27 getCats', response.data, typeof (response.data))
            return response.data
        })
        .catch((error: any) => {
            console.log(error);
        })
    return result
}
