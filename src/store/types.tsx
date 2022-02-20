export const AUTHORIZE = 'AUTHORIZE'
export const UNAUTHORIZE = 'UNAUTHORIZE'
export const SETMESSAGE = 'SETMESSAGE'
export const UPDATEUSERINFO = 'UPDATEUSERINFO'
export const GETBASE = 'GETBASE'

export interface IUser {
    userName: string,
        userEmail: string,
        userID: number,
        numberOfPlants: number
}

export interface IReduxState {
    apiResponse: string,
    pageTitle: string,
    counter: number,
    isAuthenticated: boolean,
    message: string | undefined,
    currentUser: IUser,
    dbToPrint: undefined | object
}

interface IMessage {
    message: string | undefined;
}

interface Ibase {
    base: undefined | object
}

export type TAction =
    IAuthorizeAction | IUnauthorizeAction | ISetmessageAction | IUpdateUserInfoAction | IGetBaseAction;

export interface IAuthorizeAction {
    type: typeof AUTHORIZE;
    payload: IUser;
}

export interface IUnauthorizeAction {
    type: typeof UNAUTHORIZE;
}

export interface ISetmessageAction {
    type: typeof SETMESSAGE;
    payload: IMessage;
}

export interface IUpdateUserInfoAction {
    type: typeof UPDATEUSERINFO;
    payload: IUser;
}

export interface IGetBaseAction {
    type: typeof GETBASE;
    payload: Ibase;
}
