import {AUTHORIZE, SETMESSAGE, SETUSER, UNAUTHORIZE} from "./types";

const initialState = {
    counter: 50,
    isAuthenticated: false,
    message: "default message",
    currentUser: {
        userName: "Default",
        userEmail: "default@default.ru",
        userID: 0,
        numberOfPlants: 0
    },
    dbToPrint: [],
    vegs: [],
    fruit: [],
    herbs: [],
    decs: []
}

const rootReducer = (state=initialState, action) => {
    switch(action.type) {
        case AUTHORIZE:
            return {
                isAuthenticated: true
            }
        case UNAUTHORIZE:
            return {
                isAuthenticated: false
            }
        case SETUSER:
            return {
                currentUser: {
                    userName: action.payload.userName,
                    userEmail: action.payload.userEmail,
                    userID: action.payload.userID,
                    numberOfPlants: action.payload.numberOfPlants
                }
            }
        case SETMESSAGE: {
            return {
                message: action.payload.message
            }
        }
        default: return state
    }
}

export default rootReducer
