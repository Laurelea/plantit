import {
    AUTHORIZE,
    UNAUTHORIZE,
    SETMESSAGE
} from "./types";
import Logout from '../partials/no_auth'

export const authorize = (userID, userName, userEmail, numberOfPlants) => {
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

// Асинхронное действие - может вызывать другое действие. Зачем??
export function smthAsync(userID, userName, userEmail, numberOfPlants) {
    return (dispatch) => {
        setTimeout(() => {
            dispatch(authorize(userID, userName, userEmail, numberOfPlants))
        }, 3000)
    }
}

export const setMessage = (message) => {
    return {
        type: SETMESSAGE,
        payload: {
            message
        }
    }
}
