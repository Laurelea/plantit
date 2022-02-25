import React, { ChangeEvent, useState } from 'react';
// import '../css/App.css';
import { NavLink } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../config";
import { connect } from "react-redux";
import { authorize, setMessage, unauthorize } from "../store/actions";
import { IReduxState, IUser } from "../store/types";
import { checkEmail, checkPw } from './newUser';

interface IAuthProps {
    setMessage: (message: string) => void,
    authorize: (userID: number, userName: string, userEmail: string, numberOfPlants: number) => void,
    currentUser: IUser,
    isAuthenticated: boolean,
    message: string | undefined,
}

interface IAuthState {
    loginValue: string,
    pwValue: string,
    loginValid: boolean,
    pwValid: boolean,
    loginErrorMessage: string | undefined,
    pwErrorMessage: string | boolean | undefined,
}

const Auth = (props: IAuthProps) => {
    const [state, setState] = useState<IAuthState>({
        loginValue: '',
        pwValue: '',
        loginValid: false,
        pwValid: false,
        loginErrorMessage: undefined,
        pwErrorMessage: undefined,
    });

    const loginHandler = async (event: React.MouseEvent<HTMLFormElement>) => {
        event.preventDefault()
        console.log('event.currentTarget: ', event.currentTarget)
        const authData = {
            password: state.pwValue,
            email: state.loginValue,
        }
        console.log('authData: ', authData)
        await axios.post(API_URL + 'api/auth', authData)
            .then(response => {
                console.log("post.response.data: ", response.data);

                //При любом результате авторизации:
                props.setMessage(response.data.message);

                //При успешной авторизации:
                if (response.data.isAuthenticated) {
                    try {
                        // console.log("response.data.userID: ", response.data.userID)
                        // console.log("response.data.numberOfPlants: ", response.data.numberOfPlants)

                        props.authorize(response.data.userID, response.data.authUN, response.data.authEmail, response.data.numberOfPlants);
                        // console.log("Mainstore current user numberOfPlants: ", props.currentUser.numberOfPlants)
                        // console.log("Mainstore current user userID: ",  props.currentUser.userID)
                    } catch (e) {
                        throw e
                    }
                }
            })
            .catch(error => {
                // handle error
                console.log(error);
            })
    }

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.name === 'login') {
            const result = checkEmail(event.target.value);
            if (result) {
                setState({
                    ...state,
                    loginErrorMessage: undefined,
                    loginValid: true,
                    loginValue: event.target.value,
                })
            } else {
                setState({
                    ...state,
                    loginErrorMessage: "Value must be email",
                    loginValid: false,
                    loginValue: event.target.value,
                })
            }
        }
        if (event.target.name === 'password') {
            const result = checkPw(state.pwValue);
            if (result === true) {
                setState({
                    ...state,
                    pwErrorMessage: undefined,
                    pwValid: true,
                    pwValue: event.target.value
                })
            } else {
                setState({
                    ...state,
                    pwErrorMessage: result,
                    pwValid: false,
                    pwValue: event.target.value
                })
            }
        }
    }
        return (
            <div>
            <form className="authForm" onSubmit={loginHandler} id="authForm">
                <h2>Авторизация</h2>
                <fieldset className="authField">
                    <label> Email
                        <input
                            type='text'
                            placeholder='Email'
                            name='login'
                            // defaultValue= "laurelea@mail.ru"
                            required
                            onChange={handleChange}
                        />
                    </label>
                    {
                        state.loginErrorMessage
                            ?
                            <span className="errorspan" id="loginErrorSpan">{state.loginErrorMessage}</span>
                            : null
                    }
                    <label> Пароль
                        <input
                            type='text'
                            placeholder='Пароль'
                            name='password'
                            required
                            // defaultValue = "qwerty12"
                            onChange={handleChange}
                        />
                    </label>
                    {
                        state.pwErrorMessage
                            ? <span className="errorspan"
                                    id="passwordErrorSpan">{state.pwErrorMessage}</span>
                            : null
                    }
                </fieldset>
                <fieldset className="authField">
                    <button
                        type="submit"
                        className="button"
                        disabled={!(state.loginValid && state.pwValid)}
                    >
                        Войти
                    </button>
                    {
                        props.isAuthenticated
                            ? <span className="errorspan"
                                    id="authSuccessSpan">{props.message} {"\n"} You're logged in as {props.currentUser.userName}</span>
                            : <span className="errorspan"
                                    id="authErrorSpan">{
                                props.message
                                    ? props.message
                                    : null
                            }</span>
                    }
                </fieldset>
            </form>
                <NavLink to="/newUser" className="button">Регистрация</NavLink>
            </div>
        )
}

export default connect((state: IReduxState) => ({
    counter: state.counter,
    isAuthenticated: state.isAuthenticated,
    message: state.message,
    currentUser: state.currentUser
}), { unauthorize, authorize, setMessage })(Auth);

