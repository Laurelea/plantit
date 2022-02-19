import React, { useState, useEffect } from 'react'
import '../css/App.css';
import axios from "axios";
import { API_URL } from "../config";
import { authorize, setMessage, smthAsync, unauthorize } from "../store/actions";
import { connect } from "react-redux";

const NewUser = (props) => {
    // const [c, setc] = useState({
    //     cval: 0,
    //     someval: ""
    // })
    const [state, setState] = useState({
        counter: 0,
        username: "",
        password: "",
        email: "",
        apiResponse: undefined,
        message: undefined,
        ifPwsMatch: false,
        emailMessage: undefined,
        unMessage: undefined,
        pwMessage: undefined,
        repPwMessage: undefined
    });
    const[ifValid, setValid] = useState(false)

    useEffect(() => {
        ifFormvalid()
    });

    // const add = event => {
    //     console.log('await works!!')
    // }

    const ifFormvalid = async () => {
         const ifCurrValid = await(
            (checkUsername(state.username) === true)
            && (checkEmail(state.email) === true)
            && (checkPw(state.password) === true)
            && (state.ifPwsMatch === true)
        );
        setValid(ifCurrValid);
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

    const checkPw = value => {
        try {
            if (value.length < 8) {
                throw new Error("At least 8 chars");
            } else if (value.length > 20) {
                throw new Error("No more than 20 chars");
            } else if (value.match(/^[a-zA-Z]+[a-zA-Z0-9]*$/) == null) {
                throw new Error("Latin chars and digits. Starts with a char.");
            } else {
                return true
            }
        } catch (myError) {
            return myError
        }
    }

    const ifPwsMatch = value  => {
        try {
            if (value !== state.password) {
                throw new Error("Pws don't match");
            } else {
                return true
            }
        } catch (myError) {
            return myError
        }
    }

    const changeHandler = async (event) => {
        let result = true;
        switch (event.target.name) {
            case "username":
                result = checkUsername(event.target.value)
                if (result === true) {
                    setState({
                        ...state,
                        counter: state.counter + 1,
                        unMessage: undefined,
                        username: event.target.value,
                    });
                } else {
                    setState({
                        ...state,
                        unMessage: result.message.toString(),
                        username: event.target.value
                    })
                }
                break
            case "password":
                result = checkPw(event.target.value);
                if (result === true) {
                    setState({
                        ...state,
                        pwMessage: undefined,
                        password: event.target.value
                    })
                } else {
                    setState({
                        ...state,
                        pwMessage: result.message.toString(),
                        password: event.target.value
                    })
                }
                // await ifFormvalid()
                break
            case "repPassword":
                result = ifPwsMatch(event.target.value)
                if (result === true) {
                    setState({
                        ...state,
                        repPwMessage: undefined,
                        ifPwsMatch: true
                    })
                } else {
                    setState({
                        ...state,
                        repPwMessage: result.message.toString(),
                        ifPwsMatch: false
                    })
                }
                break
            case "email":
                result = await checkEmail(event.target.value);
                if (result === true) {
                    setState({
                        ...state,
                        emailMessage: undefined,
                        email: event.target.value
                    })
                } else {
                    setState({
                        ...state,
                        emailMessage: result.message.toString(),
                        email: event.target.value
                    })
                }
                break
        }
    }

    // const resetForm = () => {
    //     document.getElementById("regForm").reset()
    // }

    const registerHandler = async event => {
        event.preventDefault();
        const regData = {
            username: state.username,
            password: state.password,
            email: state.email,
        }
        await axios.post(API_URL + 'api/register', regData)
            .then(response => {
                // console.log("post.response.data: ", response.data);
                setState({
                    ...state,
                    apiResponse: response.data.regSuccess,
                    message: response.data.message,
                    emailMessage: undefined,
                    unMessage: undefined,
                    pwMessage: undefined,
                    repPwMessage: undefined
                });
                // console.log("apiResponse: ", state.apiResponse)
            })
            .then( () => {
                // console.log('state message:', state.message)
                // console.log("Am I here?");
                // resetForm()
                document.getElementById("regForm").reset()
            })
            .catch(error => {
                console.log(error);
            })
    }
        return (
            <div id="addNewUser">
                {/*<h2>Counter!!: {state.counter}</h2>*/}
                {/*<h2>Username: {state.username}</h2>*/}
                {/*<h2>C: {c.cval}</h2>*/}
                {/*<button onClick={add}>Button</button>*/}
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

                        <span id="nameErrorSpan" className="errorspan">
                            {state.unMessage ? state.unMessage : null}
                        </span>
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
                        <span id="pwErrorSpan" className="errorspan">
                            {state.pwMessage ? state.pwMessage : null}
                        </span>
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

                        <span id="repPwErrorSpan" className="errorspan">
                            {state.repPwMessage ? state.repPwMessage : null}
                        </span>
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
                        <span id="emailErrorSpan" className="errorspan">
                            {state.emailMessage ? state.emailMessage : null}
                        </span>
                    </div>
                    <div className="labelInput">
                        <button
                            type="submit"
                            className="button"
                            value="AddNewUser"
                            disabled={!ifValid}
                        >
                            AddNewUser
                        </button>
                    </div>
                </form>
                <p className="errorspan">
                    {/*{state.apiResponse ? state.apiResponse.toString() + '\n' : null}*/}
                    {state.message ? state.message : null}
                </p>
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
