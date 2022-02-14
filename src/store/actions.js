import {
    AUTHORIZE,
    UNAUTHORIZE,
    SETUSER, SETMESSAGE
} from "./types";

export const authorize = () => {
    return {
        type: AUTHORIZE
    }
};

export const unauthorize = () => {
    return {
        type: UNAUTHORIZE
    }
};

// Асинхронное действие - может вызывать другое действие. Зачем??
export function smthAsync(userID, userName, userEmail, numberOfPlants) {
    return (dispatch) => {
        setTimeout(() => {
            dispatch(setUser(userID, userName, userEmail, numberOfPlants))
        }, 3000)
    }
}

export const setUser = (userID, userName, userEmail, numberOfPlants) => {
    return {
        type: SETUSER,
        payload: {
            userID, userName, userEmail, numberOfPlants
        }
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
