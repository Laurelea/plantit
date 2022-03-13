import { API_URL } from "../config";
import {ICat, IProducer, IProduct, Irow, IYearType} from "../store/types";
const axios = require('axios').default;

export const getMyBase = async () => {
    return await axios({
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
}

export const getCats = async () => {
    return await axios({
        method: 'get',
        url: API_URL + 'api/getCats'
    })
        .then((response: { data: Array<ICat> | undefined }) => {
            // console.log('27 getCats', response.data, typeof (response.data))
            return response.data
        })
        .catch((error: any) => {
            console.log(error);
        })
}

export const getProducts = async () => {
    return await axios({
        method: 'get',
        url: API_URL + 'api/getProducts'
    })
        .then((response: { data: Array<IProduct> | undefined }) => {
            console.log('42 getProducts', response.data, typeof (response.data))
            return response.data
        })
        .catch((error: any) => {
            console.log(error);
        })
}

export const getProducers = async () => {
    return await axios({
        method: 'get',
        url: API_URL + 'api/getProducers'
    })
        .then((response: { data: Array<IProducer> | undefined }) => {
            console.log('57 getProducers', response.data, typeof (response.data))
            return response.data
        })
        .catch((error: any) => {
            console.log(error);
        })
}

export const getYearTypes= async () => {
    return await axios({
        method: 'get',
        url: API_URL + 'api/getYearTypes'
    })
        .then((response: { data: Array<IYearType> | undefined }) => {
            console.log('72 getYearTypes', response.data, typeof (response.data))
            return response.data
        })
        .catch((error: any) => {
            console.log(error);
        })
}
