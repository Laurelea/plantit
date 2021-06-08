import React from 'react'
import './../App.css';
import {NavLink, Link} from "react-router-dom";
import {ReactSession} from "react-client-session";
// import Button from '@material-ui/core/Button';

import axios from "axios";

export default class Auth extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loginValue: '',
            pwValue: '',
            loginValid: false,
            pwValid: false
        };

        this.handleChange = this.handleChange.bind(this);
        // this.handleSubmit = this.handleSubmit.bind(this);
    }

    loginHandler = async (event) => {
        event.preventDefault()
        // console.log(event.target)
        const authData = {
            password: this.state.pwValue,
            email: this.state.loginValue,
        }
        const response = await axios.post('/api/auth', authData, { withCredentials: true })
            .then(response => {
                console.log("post.response.data: ", response.data);
                this.setState({apiResponse: response.data.isLogin, message: response.data.message});
                (response.data.isLogin == true)
                    ? ReactSession.set("username", this.state.loginValue)
                    :
                console.log("apiResponse: ", this.state.apiResponse, this.state.message)
                // document.getElementById("apiID").innerText =  "API response:" + this.state.apiResponse
            })
            .catch(error => {
                // handle error
                console.log(error);
            })
        // console.log("document.title: ", document.title)
        // console.log("this.state.pageTitle: ", this.state.pageTitle)
    }



    //Предотвращает стандартное поведение формы
    // submitHandler = (event) => {
    //     event.preventDefault()
    //
    // }

    checkLogin(value) {
        try {
            if (value.match(/^[-\w.]+@([A-z0-9][-A-z0-9]+\.)+[A-z]{2,4}$/) == null) {
                throw new Error("Value must be email");
            }
            // else if (value.length < 6) {
            //     throw new Error("Value is less than 6");
            // } else if (value.length >= 30) {
            //     throw new Error("Value is more than 30");
            // } else if (value.match(/^[-\w.]+@([A-z0-9][-A-z0-9]+\.)+[A-z]{2,4}$/) == null) {
            //     throw new Error("Value must be email");
            // }
            else {
                return true
            }
        } catch (myError) {
            return myError
        }
    }

    checkPassword(value) {
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
    handleChange(event) {
        // this.setState({
        //     field: event.target.name,
        // });
        if (event.target.name === 'login') {
            this.setState({
                loginValue: event.target.value,
            }, () => {
                const result = this.checkLogin(event.target.value);
                if (result == true) {
                    this.setState({
                        loginErrorMessage: "Email true",
                        loginValid: true
                    })
                } else {
                    this.setState({
                        loginErrorMessage: result.message.toString(),
                        loginValid: false
                    })
                }
            });
        }
        if (event.target.name === 'password') {
            this.setState({
                    pwValue: event.target.value,
                }, () => {
                    const result = this.checkPassword(this.state.pwValue);
                    if (result == true) {
                        this.setState({pwErrorMessage: "Pw true", pwValid: true})
                    } else {
                        this.setState({pwErrorMessage: result.message.toString(), pwValid: false})
                    }
                }
            );
        }
    }

    render() {
        return (
            <div>
            <form className="authForm" onSubmit={this.loginHandler}>
                {/*action="login" method="post"*/}
                <h2>Авторизация</h2>
                <fieldset className="authField">
                    <label> Email
                        <input
                            type='text'
                            placeholder='Email'
                            name='login'
                            // pattern="[a-zA-Z]+"
                            // value = "default@default.default"
                            required
                            onChange={this.handleChange}
                        />
                    </label>

                    {
                        this.state.loginErrorMessage
                            ?
                            <span className="errorspan" id="loginErrorSpan">{this.state.loginErrorMessage}</span>
                            : null
                    }
                    <label> Пароль
                        <input
                            type='password'
                            placeholder='Пароль'
                            name='password'
                            required
                            // value = "default"
                            onChange={this.handleChange}
                        />
                    </label>
                    {
                        this.state.pwErrorMessage
                            ? <span className="errorspan"
                                    id="passwordErrorSpan">{this.state.pwErrorMessage}</span>
                            : null
                    }
                </fieldset>

                <fieldset className="authField">
                    <button
                        type="submit"
                        className="button"

                        // value="login"
                        // onClick={this.loginHandler}
                        disabled={!(this.state.loginValid && this.state.pwValid)}
                    >
                        Войти
                    </button>

                </fieldset>
            </form>
                <NavLink to="/newUser" className="button">Регистрация</NavLink>
            </div>
        )
    }
}