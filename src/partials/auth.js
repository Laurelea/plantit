import React from 'react'
import '../css/App.css';
import {NavLink, Link} from "react-router-dom";
import axios from "axios";
import {API_URL} from "../config";

// const cookies = new Cookies();

class Auth extends React.Component {
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
        const response = await axios.post(API_URL + 'api/auth', authData)
            .then(response => {
                console.log("post.response.data: ", response.data);

                //При любом результате авторизации:
                this.props.setMessage(response.data.message);

                //При успешной авторизации:
                if (response.data.isAuthenticated) {
                    try {
                        // this.setState({
                        //     authUN: response.data.authUN,
                        //     authEmail: response.data.authEmail,
                        //     isAuthenticated: true,
                        //     // message: "Authorization successful"
                        // });
                        // console.log("MainStore.currentUser.userName: ", MainStore.currentUser.authUN)
                        console.log("response.data.userID: ", response.data.userID)
                        console.log("response.data.numberOfPlants: ", response.data.numberOfPlants)

                        this.props.setUser(response.data.userID, response.data.authUN, response.data.authEmail, response.data.numberOfPlants);
                        console.log("Mainstore current user numberOfPlants: ", this.props.currentUser.numberOfPlants)
                        console.log("Mainstore current user userID: ",  this.props.currentUser.userID)


                        this.props.authorize()
                    } catch (e) {
                        throw e
                    }

                    // MainStore.numberOfPlants = response.data.numberOfPlants
                    // console.log("MainStore.isAuthenticated: ", MainStore.isAuthenticated)
                    // console.log("MainStore.currentUser.userName: ", MainStore.currentUser.userName)
                }
                // window.location.replace("/")
                // this.resetForm()
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
                <h3>Авторизуйтесь для полного доступа</h3>
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
                            // defaultValue= "laurelea@mail.ru"
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
                            // defaultValue = "qwerty12"
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
                                    id="authSuccessSpan">{this.state.message} {"\n"} You're logged in as {this.state.userName}</span>
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

export default Auth
