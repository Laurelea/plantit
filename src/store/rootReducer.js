import {AUTHORIZE, SETMESSAGE, UNAUTHORIZE, UPDATEUSERINFO, GETBASE, GETVEGS} from "./types";

const initialState = {
    apiResponse: "",
    pageTitle: "React Components",
    counter: 50,
    isAuthenticated: false,
    message: undefined,
    currentUser: {
        userName: "Default",
        userEmail: "default@default.ru",
        userID: 0,
        numberOfPlants: 0
    },
    dbToPrint: undefined,
    vegs: undefined,
    fruit: [],
    herbs: [],
    decs: []
}

const rootReducer = (state=initialState, action) => {
    switch(action.type) {
        case AUTHORIZE:
            console.log('authorized success');
            return {
                ...state,
                isAuthenticated: true,
                currentUser: {
                    userName: action.payload.userName,
                    userEmail: action.payload.userEmail,
                    userID: action.payload.userID,
                    numberOfPlants: action.payload.numberOfPlants
                }
            }
        case UNAUTHORIZE:
            return {
                ...state,
                isAuthenticated: false,
                message: initialState.message,
                currentUser: {
                    userName: initialState.currentUser.userName,
                    userEmail: initialState.currentUser.userEmail,
                    userID: initialState.currentUser.userID,
                    numberOfPlants: initialState.currentUser.numberOfPlants
                }
            }
        case SETMESSAGE: {
            return {
                ...state,
                message: action.payload.message
            }
        }
        case UPDATEUSERINFO: {
            return {
                ...state,
                currentUser: {
                    ...state.currentUser,
                    numberOfPlants: action.payload.number
                }
            }
        }
        case GETBASE: {
            return {
                ...state,
                dbToPrint: action.payload.base
            }
        }
        case GETVEGS: {
            return {
                ...state,
                vegs: action.payload.vegs
            }
        }
        default: return state
    }
}

export default rootReducer
