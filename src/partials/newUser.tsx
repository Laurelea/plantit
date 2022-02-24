import React, {useState, useEffect, ChangeEvent} from 'react'
// import '../css/App.css';
import axios from "axios";
import { API_URL } from "../config";
// import { authorize, setMessage, smthAsync, unauthorize } from "../store/actions";
// import { connect } from "react-redux";
// import {IReduxState} from "../store/types";

interface INewUserState {
    counter: number,
    username: string,
    password: string,
    repPw: string,
    email: string,
    apiResponse: undefined | string,
    message: undefined | string,
    ifPwsMatch: boolean,
    emailMessage: undefined | string,
    unMessage: undefined | string,
    pwMessage: undefined | string | boolean,
    repPwMessage: undefined | string,
}

// interface INewUserProps {
//
// }
export const checkEmail = (value: string) : boolean=> {
    if (value.match(/^[-\w.]+@([A-z0-9][-A-z0-9]+\.)+[A-z]{2,4}$/) == null) {
        return false
    } else {
        return true
    }
}

export const checkPw = (value: string) : boolean | string => {
    if (value.length < 8) {
        return "At least 8 chars";
    } else if (value.length > 20) {
        return "No more than 20 chars";
    } else if (value.match(/^[a-zA-Z]+[a-zA-Z0-9]*$/) == null) {
        return "Latin chars and digits. Starts with a char.";
    } else {
        return true
    }
}

const NewUser = () => {
    // const [c, setc] = useState({
    //     cval: 0,
    //     someval: ""
    // })
    const [state, setState] = useState<INewUserState>({
        counter: 0,
        username: "",
        password: "",
        repPw: '',
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

    const checkUsername = (value: string) : boolean=> {
        if (value.match(/^(?=.*[A-Za-z0-9]$)[A-Za-z][A-Za-z\d.-]{6,19}$/) == null) {
            return false
        } else {
            return true
        }
    }

    const ifPwsMatch = (value: string) : boolean => {
        if (value !== state.password) {
            return false
        } else {
            return true
        }
    }

    const changeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        let result;
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
                        unMessage: "Latin chars and digits. Starts with a char",
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
                        pwMessage: result,
                        password: event.target.value
                    })
                }
                break
            case "repPassword":
                result = ifPwsMatch(event.target.value)
                if (result === true) {
                    setState({
                        ...state,
                        repPw: event.target.value,
                        repPwMessage: undefined,
                        ifPwsMatch: true
                    })
                } else {
                    setState({
                        ...state,
                        repPw: event.target.value,
                        repPwMessage: "Pws don't match",
                        ifPwsMatch: false
                    })
                }
                break
            case "email":
                result = checkEmail(event.target.value);
                if (result === true) {
                    setState({
                        ...state,
                        emailMessage: undefined,
                        email: event.target.value
                    })
                } else {
                    setState({
                        ...state,
                        emailMessage: "Value must be email",
                        email: event.target.value
                    })
                }
                break
        }
    }

    const registerHandler = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const regData = {
            username: state.username,
            password: state.password,
            email: state.email,
        }
        await axios.post(API_URL + 'api/register', regData)
            .then(response => {
                setState({
                    ...state,
                    username: '',
                    password: '',
                    email: '',
                    repPw: '',
                    apiResponse: response.data.regSuccess,
                    message: response.data.message,
                    emailMessage: undefined,
                    unMessage: undefined,
                    pwMessage: undefined,
                    repPwMessage: undefined
                });
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
                                value={state.username}
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
                                value={state.password}
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
                                value = {state.repPw}
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
                                value={state.email}
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

export default NewUser
