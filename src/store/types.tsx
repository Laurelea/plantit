export const AUTHORIZE = 'AUTHORIZE'
export const UNAUTHORIZE = 'UNAUTHORIZE'
export const SETMESSAGE = 'SETMESSAGE'
export const UPDATEUSERINFO = 'UPDATEUSERINFO'
export const GETBASE = 'GETBASE'
export const GETCATS = 'GETCATS'

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
    soil: string,
    watering: string,
    rootstock: boolean,
    yeartype: string,
    depth_min: number,
    depth_max: number,
    height_min: number,
    height_max: number,
    days_to_seedlings_min: number,
    days_to_seedlings_max: number,
    planting_start_day: number,
    planting_stop_day: number,
    planting_start_month: number,
    planting_stop_month: number,
    sun: string,
}

export interface ICat extends Record<string, any> {
    cat_id: number,
    cat_name: string,
    cat_pic: string,
    cat_desc: string,
    parent: number,
}

export interface IReduxState {
    apiResponse: string,
    pageTitle: string,
    counter: number,
    isAuthenticated: boolean,
    message: string | undefined,
    currentUser: IUser,
    dbToPrint: undefined | Array<Irow>,
    cats: undefined | Array<ICat>,
}

interface IMessage {
    message: string | undefined;
}

interface IBase {
    base: undefined | Array<Irow>
}

interface ICats {
    cats: undefined | Array<ICat>
}

interface IUserInfo {
    numberOfPlants: number;
}
export type TAction =
    IAuthorizeAction | IUnauthorizeAction | ISetmessageAction | IUpdateUserInfoAction | IGetBaseAction | IGetCatsAction;

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
    payload: IBase;
}

export interface IGetCatsAction {
    type: typeof GETCATS;
    payload: ICats;
}
