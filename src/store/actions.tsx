import {
    AUTHORIZE,
    UNAUTHORIZE,
    SETMESSAGE,
    UPDATEUSERINFO,
    GETBASE,
    GETCATS,
    GETPRODUCTS,
    GETPRODUCERS,
    GETYEARTYPES
} from "./types";
import Logout from '../partials/logout'
import { getMyBase, getCats, getProducts, getProducers, getYearTypes } from "../partials/allBase";
import { Dispatch } from 'redux'

export const authorize = (userID: number, userName: string, userEmail: string, numberOfPlants: number) => {
    return {
        type: AUTHORIZE,
        payload: {
            userID, userName, userEmail, numberOfPlants
        }
    }
};

export const unauthorize = () => {
    Logout();
    return {
        type: UNAUTHORIZE
    }
};

export const updateUserInfo = (numberOfPlants: number) => {
    return {
        type: UPDATEUSERINFO,
        payload: {
            numberOfPlants
        }
    }
}

// Асинхронное действие - может вызывать другое действие. Зачем??
export function smthAsync(userID: number, userName: string, userEmail: string, numberOfPlants: number) {
    return (dispatch: Dispatch) => {
        setTimeout(() => {
            dispatch(authorize(userID, userName, userEmail, numberOfPlants))
        }, 3000)
    }
}

export const updateBase = () => async(dispatch: Dispatch) => {
    await getMyBase()
        .then(response => {
            console.log('updateBase: ', response);
            dispatch(({
                type: GETBASE,
                payload: {
                    base: response
                }
            }));
        })
}

export const setMessage = (message: string) => {
    return {
        type: SETMESSAGE,
        payload: {
            message
        }
    }
}

export const updateCats = () => async(dispatch: Dispatch) => {
    console.log('updateCats triggered')
    await getCats()
        .then(response => {
            console.log('updateCats: ', response);
            dispatch(({
                type: GETCATS,
                payload: {
                    cats: response
                }
            }));
        })
}

export const updateProducts = () => async(dispatch: Dispatch) => {
    await getProducts()
        .then(response => {
            console.log('updateProducts: ', response);
            dispatch(({
                type: GETPRODUCTS,
                payload: {
                    products: response
                }
            }));
        })
}

export const updateProducers = () => async(dispatch: Dispatch) => {
    await getProducers()
        .then(response => {
            console.log('updateProducers: ', response);
            dispatch(({
                type: GETPRODUCERS,
                payload: {
                    producers: response
                }
            }));
        })
}

export const updateYearTypes = () => async(dispatch: Dispatch) => {
    await getYearTypes()
        .then(response => {
            console.log('updateYearTypes: ', response);
            dispatch(({
                type: GETYEARTYPES,
                payload: {
                    yeartypes: response
                }
            }));
        })
}
