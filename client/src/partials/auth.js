import React from 'react'
import './../App.css';
import {NavLink, Link} from "react-router-dom";
// import {ReactSession} from "react-client-session";
// import Button from '@material-ui/core/Button';
// import Cookies from 'js-cookie'
// import cookie from "react-cookie";

// import Cookies from 'universal-cookie';
import axios from "axios";

// const cookies = new Cookies();

export default class Auth extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loginValue: '',
            pwValue: '',
            loginValid: false,
            pwValid: false,
            isAuthenticated: false
        };

        this.handleChange = this.handleChange.bind(this);
        // this.handleSubmit = this.handleSubmit.bind(this);
    }

    resetForm = async () => {
        document.getElementById("authForm").reset()
        this.setState({
            ...this.state,
            loginErrorMessage: "",
            pwErrorMessage: ""
        })
    }
    loginHandler = async (event) => {
        event.preventDefault()
        // console.log(event.target)
        const authData = {
            password: this.state.pwValue,
            email: this.state.loginValue,
        }
        //Запрос: логин и пароль.
        // Ответ:
        // 2. Сообщение - ошибка или успешно
        // 3. Если успешно, то id сессии, UserName

        //Эта штука должна посылать существующую куку:
        const response = await axios.post('/api/auth', authData,  { withCredentials: true })
            .then(response => {
                console.log("post.response.data: ", response.data);

                //При любом результате авторизации:
                this.setState({
                    // apiResponse: response.data.isAuthenticated,
                    message: response.data.message,
                });

                //При успешной авторизации:
                if (response.data.isAuthenticated) {
                    this.setState({
                        authUN: response.data.authUN,
                        authEmail: response.data.authEmail,
                        isAuthenticated: true
                    });

                }
                window.location.replace("/")
                this.resetForm()
            })
            .catch(error => {
                // handle error
                console.log(error);
            })
    }

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
            <form className="authForm" onSubmit={this.loginHandler} id="authForm">
                {/*action="login" method="post"*/}
                <h2>Авторизация</h2>
                <fieldset className="authField">
                    <label> Email
                        <input
                            type='text'
                            placeholder='Email'
                            name='login'
                            // pattern="[a-zA-Z]+"
                            defaultValue= "laurelea@mail.ru"
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
                            type='text'
                            placeholder='Пароль'
                            name='password'
                            required
                            defaultValue = "qwerty12"
                            // value = "qwerty12"

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
                        // disabled={!(this.state.loginValid && this.state.pwValid)}
                    >
                        Войти
                    </button>
                    {
                        this.state.authUN
                            ? <span className="errorspan"
                                    id="authSuccessSpan">{this.state.message} {"\n"} You're logged in as {this.state.authUN}</span>
                            : <span className="errorspan"
                                    id="authErrorSpan">{this.state.message}</span>
                    }
                </fieldset>
            </form>
                <NavLink to="/newUser" className="button">Регистрация</NavLink>
            </div>
        )
    }
}