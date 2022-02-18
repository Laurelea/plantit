import React, {useState} from 'react'
import '../css/App.css';

import axios from "axios";
import {API_URL} from "../config";
import {authorize, setMessage, smthAsync, unauthorize} from "../store/actions";
import {connect} from "react-redux";

const NewUser = (props) => {
    const [state, setState] = useState({
        username: "",
        password: "",
        email: "",
        apiResponse: '',
        message: "",
        ifPwsMatch: false,
        emailMessage: "",
        unMessage: '',
        pwMessage: "",
        repPwMessage: "",
        ifValid: false
    })

    const ifFormvalid = async () => {
        console.log("state.username ifFormvalid: ", state.username )
        // console.log ("checkUsername(state.username) :", (state.username, checkUsername(state.username)== true))
        // console.log("checkEmail(state.email) :", (checkEmail(state.email) == true))
        // console.log("password(state.password) :", (checkPw(state.password) == true))
        // console.log("match(state.match) :", (state.ifPwsMatch == true))
        // console.log(
        //     (checkUsername(state.username) == true)
        //     && (checkEmail(state.email) == true)
        //     && (checkPw(state.password) == true)
        //     && (state.ifPwsMatch == true)
        // )
         const ifValid = await (
            (checkUsername(state.username) == true)
            && (checkEmail(state.email) == true)
            && (checkPw(state.password) == true)
            && (state.ifPwsMatch == true)
        )
        setState({
            ...state,
            ifValid: ifValid
        })
        // console.log("ifValid: ", ifValid)
    }

    const checkEmail = (value) => {
        try {
            if (value.match(/^[-\w.]+@([A-z0-9][-A-z0-9]+\.)+[A-z]{2,4}$/) == null) {
                throw new Error("Value must be email");
            } else {
                return true
            }
        } catch (myError) {
            return myError
        }
    }

    const checkUsername = (value) => {
        // console.log("Starting...")
        try {
            if (value.match(/^(?=.*[A-Za-z0-9]$)[A-Za-z][A-Za-z\d.-]{6,19}$/) == null) {
                throw new Error("Latin chars and digits. Starts with a char.");
            } else {
                return true
            }
        } catch (myError) {
            return myError
        }
    }

    const checkPw = (value) => {
        setState({
            ...state,
            password: value}
        );
        try {
            if (value.length < 8) {
                throw new Error("At least 8 chars");
            } else if (value.length > 20) {
                throw new Error("No more than 20 chars");
            } else if (value.match(/^[a-zA-Z]+[a-zA-Z0-9]*$/) == null) {
                throw new Error("Latin chars and digits. Starts with a char.");
            } else {
                // console.log("Password: ", value)
                return true
            }
        } catch (myError) {
            return myError
        }
    }

    const ifPwsMatch = async value  => {
        try {
            if (value !== state.password) {
                setState({
                    ...state,
                    ifPwsMatch: false
                });
                throw new Error("Pws don't match");
            } else {
                setState({
                    ...state,
                    ifPwsMatch: true
                })
                console.log("Password Rep: ", value)
                return true
            }
        } catch (myError) {
            return myError
        }
    }

    const changeHandler = async event => {
        let result = true;
        console.log("changeHandler CHANGED event.target.name", event.target.name)
        switch (event.target.name) {
            case "email":
                // setState({email: event.target.value})
                result = await checkEmail(event.target.value);
                console.log("result: ", result)
                if (result === true) {
                    setState({
                        ...state,
                        emailMessage: "Email true",
                        email: event.target.value
                    })
                    console.log()
                } else {
                    setState({
                        ...state,
                        emailMessage: result.message.toString(),
                        formValid: false
                    })
                    // console.log(result.message.toString())
                }
                await ifFormvalid()
                break
            case "username":
                // setState({username: event.target.value})
                console.log("1. event.target.value", event.target.value)
                result = await checkUsername(event.target.value)
                // console.log("2.", result)
                if (result === true) {
                    console.log("3. IfRestrue: User name to rem: ", event.target.value)
                    setState({
                        ...state,
                        unMessage: "User Name true",
                        username: event.target.value
                    })
                } else {
                    setState({
                        ...state,
                        unMessage: result.message.toString()
                    })
                }
                await ifFormvalid()
                break
            case "password":
                result = await checkPw(event.target.value);
                if (result === true) {
                    setState({
                        ...state,
                        pwMessage: "Pw true",
                        formValid: true
                    })
                } else {
                    setState({
                        ...state,
                        pwMessage: result.message.toString(),
                        formValid: false
                    })
                    console.log(result.message.toString())
                }
                await ifFormvalid()
                break
            case "repPassword":
                await ifPwsMatch(event.target.value)
                    .then(result => {
                        if (result === true) {
                            setState({
                                ...state,
                                repPwMessage: "Pws match"
                            })
                        } else {
                            setState({
                                ...state,
                                repPwMessage: result.message.toString()
                            })
                        }
                    })
                    .then(result => {
                        ifFormvalid()
                    })
                    .catch(error => {
                        console.log(error);
                    })
        }
    }

    const resetForm = async () => {
        document.getElementById("regForm").reset()
        setState({
            ...state,
            emailMessage: "",
            unMessage: '',
            pwMessage: "",
            repPwMessage: "",
        })
    }

    const registerHandler = async event => {
        event.preventDefault();
        const regData = {
            username: state.username,
            password: state.password,
            email: state.email,
        }
        await axios.post(API_URL + 'api/register', regData)
            .then(response => {
                console.log("post.response.data: ", response.data);
                setState({
                    ...state,
                    apiResponse: response.data.regSuccess,
                    message: response.data.message
                });
                console.log("apiResponse: ", state.apiResponse)
            })
            .then( response => {
                console.log("Am I here?");
                resetForm()
            })
            .catch(error => {
                console.log(error);
            })
    }
        return (
            <div id="addNewUser">
                <h2>Регистрация</h2>
                <form onSubmit={registerHandler} autoComplete="on" id="regForm">
                    <div className="regField">
                        <div className="labelInput">
                            <label className="regLabel">User name:</label>
                            <input
                                type="text"
                                name="username"
                                required
                                id="regName"
                                autoFocus
                                className="regInput"
                                // value={username}
                                // defaultValue={username}
                                onChange={changeHandler}/>
                        </div>

                        <span id="nameErrorSpan" className="errorspan">{state.unMessage}</span>
                    </div>
                    <div className="regField">
                        <div className="labelInput">
                            <label className="regLabel">Password:</label>
                            <input
                                type="password"
                                name="password"
                                required
                                id="regPw"
                                className="regInput"
                                // value={password}
                                onChange={changeHandler}/>
                        </div>
                        <span id="pwErrorSpan" className="errorspan"> {state.pwMessage}</span>
                    </div>
                    <div className="regField">

                        <div className="labelInput">

                            <label className="regLabel">Repeat password:</label>
                            <input
                                type="password"
                                name="repPassword"
                                required
                                id="regRepPw"
                                className="regInput"
                                // value = ''
                                onChange={changeHandler}/>
                        </div>

                        <span id="repPwErrorSpan" className="errorspan">{state.repPwMessage}</span>
                    </div>
                    <div className="regField">
                        <div className="labelInput">

                            <label className="regLabel">E-mail:</label>
                            <input
                                type="email"
                                name="email"
                                required
                                id="regEmail"
                                className="regInput"
                                // defaultValue={email}
                                onChange={changeHandler}/>

                        </div>
                        <span id="emailErrorSpan" className="errorspan">{state.emailMessage}</span>
                    </div>
                    <div className="labelInput">
                        <button
                            type="submit"
                            className="button"
                            value="AddNewUser"
                            disabled={!state.ifValid}
                        >
                            AddNewUser
                        </button>
                    </div>

                </form>
                <p className="errorSpan"> {state.apiResponse.toString()} {state.message}</p>
            </div>
        )
}

const mapStateToProps = (state) => {
    return {
        counter: state.counter,
        isAuthenticated: state.isAuthenticated,
        message: state.message,
        currentUser: state.currentUser,
        apiResponse: state.apiResponse,
        pageTitle: state.pageTitle
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

export default connect(mapStateToProps, mapDispatchToProps)(NewUser);
