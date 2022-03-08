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

export interface Irow extends Record<string, any> {
    id: number,
    cat_name: string,
    product_name: string,
    name: string,
    producer_name: string,
    user_name: string,
}

export interface IReduxState {
    apiResponse: string,
    pageTitle: string,
    counter: number,
    isAuthenticated: boolean,
    message: string | undefined,
    currentUser: IUser,
    dbToPrint: undefined | Array<Irow>
}

interface IMessage {
    message: string | undefined;
}

interface Ibase {
    base: undefined | Promise<any>
}

interface IUserInfo {
    numberOfPlants: number;
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
    payload: IUserInfo;
}

export interface IGetBaseAction {
    type: typeof GETBASE;
    payload: Ibase;
}
