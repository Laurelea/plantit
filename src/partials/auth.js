import React, {useState} from 'react'
import '../css/App.css';
import { NavLink } from "react-router-dom";
import axios from "axios";
import {API_URL} from "../config";
import {connect} from "react-redux";
import {authorize, setMessage, smthAsync, unauthorize} from "../store/actions";


const Auth = (props) => {
    const [state, setState] = useState({
        loginValue: '',
        pwValue: '',
        loginValid: false,
        pwValid: false,
        loginErrorMessage: '',
        pwErrorMessage: ''
    });

    const resetForm = () => {
        document.getElementById("authForm").reset()
        setState({
            ...state,
            loginErrorMessage: "",
            pwErrorMessage: ""
        })
    }
    const loginHandler = async (event) => {
        event.preventDefault()
        // console.log(event.target)
        const authData = {
            password: state.pwValue,
            email: state.loginValue,
        }
        const response = await axios.post(API_URL + 'api/auth', authData)
            .then(response => {
                console.log("post.response.data: ", response.data);

                //При любом результате авторизации:
                props.setMessage(response.data.message);

                //При успешной авторизации:
                if (response.data.isAuthenticated) {
                    try {
                        console.log("response.data.userID: ", response.data.userID)
                        console.log("response.data.numberOfPlants: ", response.data.numberOfPlants)

                        props.authorize(response.data.userID, response.data.authUN, response.data.authEmail, response.data.numberOfPlants);
                        console.log("Mainstore current user numberOfPlants: ", props.currentUser.numberOfPlants)
                        console.log("Mainstore current user userID: ",  props.currentUser.userID)
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

    const checkLogin = (value) => {
        try {
            if (value.match(/^[-\w.]+@([A-z0-9][-A-z0-9]+\.)+[A-z]{2,4}$/) == null) {
                throw new Error("Value must be email");
            }
            else {
                return true
            }
        } catch (myError) {
            return myError
        }
    }

    const checkPassword = (value) => {
        try {
            if (value.length < 8) {
                throw new Error("Value is less than 8");
            }
            else if (value.length >= 20) {
                throw new Error("Value is more than 20");
            }
            else if (value.match(/^[a-zA-Z]+[a-zA-Z0-9]*$/) == null) {
                throw new Error("Value must be correct pw");
            } else {
                return true
            }
        } catch (myError) {
            // console.log("myError", myError);
            return myError
        }
    }
    const handleChange = (event) => {
        if (event.target.name === 'login') {
            setState({
                ...state,
                loginValue: event.target.value,
            }, () => {
                const result = checkLogin(event.target.value);
                if (result == true) {
                    setState({
                        ...state,
                        loginErrorMessage: "Email true",
                        loginValid: true
                    })
                } else {
                    setState({
                        ...state,
                        loginErrorMessage: result.message.toString(),
                        loginValid: false
                    })
                }
            });
        }
        if (event.target.name === 'password') {
            setState({
                    ...state,
                    pwValue: event.target.value,
                }, () => {
                    const result = checkPassword(state.pwValue);
                    if (result === true) {
                        setState({
                            ...state,
                            pwErrorMessage: "Pw true",
                            pwValid: true
                        })
                    } else {
                        setState({
                            ...state,
                            pwErrorMessage: result.message.toString(),
                            pwValid: false
                        })
                    }
                }
            );
        }
    }


        return (
            <div>
                <h3>Авторизуйтесь для полного доступа</h3>
            <form className="authForm" onSubmit={loginHandler} id="authForm">
                {/*action="login" method="post"*/}
                <h2>Авторизация</h2>
                <fieldset className="authField">
                    <label> Email
                        <input
                            type='text'
                            placeholder='Email'
                            name='login'
                            // pattern="[a-zA-Z]+"
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
                            // value = "qwerty12"

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
                    >
                        Войти
                    </button>
                    {
                        props.isAuthenticated
                            ? <span className="errorspan"
                                    id="authSuccessSpan">{props.message} {"\n"} You're logged in as {props.userName}</span>
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

const mapStateToProps = (state) => {
    return {
        counter: state.counter,
        isAuthenticated: state.isAuthenticated,
        message: state.message,
        currentUser: state.currentUser
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        authorize: (userID, userName, userEmail, numberOfPlants) => dispatch(authorize(userID, userName, userEmail, numberOfPlants)),
        unauthorize: () => dispatch(unauthorize()),
        smthAsync: (userID, userName, userEmail, numberOfPlants) => dispatch(smthAsync(userID, userName, userEmail, numberOfPlants)),
        setMessage: message => dispatch(setMessage(message))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
