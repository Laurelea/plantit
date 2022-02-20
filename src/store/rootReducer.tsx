import { IReduxState, TAction, AUTHORIZE, SETMESSAGE, UNAUTHORIZE, UPDATEUSERINFO, GETBASE } from "./types";

const initialState: IReduxState = {
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
    dbToPrint: undefined
}

const rootReducer = (state=initialState, action: TAction) => {
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
                    numberOfPlants: action.payload.numberOfPlants
                }
            }
        }
        case GETBASE: {
            return {
                ...state,
                dbToPrint: action.payload.base
            }
        }
        default: return state
    }
}

export default rootReducer
