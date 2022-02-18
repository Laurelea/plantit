import {
    AUTHORIZE,
    UNAUTHORIZE,
    SETMESSAGE,
    UPDATEUSERINFO,
    GETBASE,
    GETVEGS
} from "./types";
import Logout from '../partials/logout'
import {getMyBase} from "../partials/allBase";
import {getVegs} from "../partials/vegs";

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

export const updateUserInfo = (number) => {
    return {
        type: UPDATEUSERINFO,
        payload: {
            number
        }
    }
}

// Асинхронное действие - может вызывать другое действие. Зачем??
export function smthAsync(userID, userName, userEmail, numberOfPlants) {
    return (dispatch) => {
        setTimeout(() => {
            dispatch(authorize(userID, userName, userEmail, numberOfPlants))
        }, 3000)
    }
}

export const updateBase = () => async(dispatch) => {
    const base = await getMyBase();
    console.log('updateBase: ', base)
    dispatch(({
        type: GETBASE,
        payload: {
            base
        }
    }));
}

export const setMessage = (message) => {
    return {
        type: SETMESSAGE,
        payload: {
            message
        }
    }
}

export const getBase = () => {
    let base = getMyBase()
    console.log('base from actions: ', base)
    return {
        type: GETBASE,
        payload: {
            base: getMyBase()
        }
    }
}

// export const getVegs = () => {
//     let vegs = getVegs()
//     console.log('vegs from actions: ', vegs)
//     return {
//         type: GETVEGS,
//         payload: {
//             vegs: getVegs()
//         }
//     }
// }
