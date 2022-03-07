import {
    AUTHORIZE,
    UNAUTHORIZE,
    SETMESSAGE,
    UPDATEUSERINFO,
    GETBASE
} from "./types";
import Logout from '../partials/logout'
import { getMyBase } from "../partials/allBase";
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
    const base = await getMyBase();
    console.log('updateBase: ', base);
    dispatch(({
        type: GETBASE,
        payload: {
            base
        }
    }));
}

export const setMessage = (message: string) => {
    return {
        type: SETMESSAGE,
        payload: {
            message
        }
    }
}
