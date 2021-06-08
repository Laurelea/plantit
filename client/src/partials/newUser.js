import React from 'react'
import './../App.css';
import {NavLink} from "react-router-dom";
import {ReactSession} from "react-client-session";

import axios from "axios";

export default class newUser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
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
        };

        this.registerHandler = this.registerHandler.bind(this);
        this.ifPwsMatch = this.ifPwsMatch.bind(this);
        this.changeHandler = this.changeHandler.bind(this);
        this.ifFormvalid = this.ifFormvalid.bind(this);
        this.checkUsername = this.checkUsername.bind(this);
        this.checkEmail = this.checkEmail.bind(this);
        this.checkPw = this.checkPw.bind(this);
        // this.checkUsername = this.checkUsername.bind(this);

        // this.handleSubmit = this.handleSubmit.bind(this);
    }

    ifFormvalid = async () => {
        // console.log("this.state.username ifFormvalid: ", this.state.username )
        // console.log ("this.checkUsername(this.state.username) :", (this.state.username, this.checkUsername(this.state.username)== true))
        // console.log("this.checkEmail(this.state.email) :", (this.checkEmail(this.state.email) == true))
        // console.log("this.password(this.state.password) :", (this.checkPw(this.state.password) == true))
        // console.log("this.match(this.state.match) :", (this.state.ifPwsMatch == true))
        // console.log(
        //     (this.checkUsername(this.state.username) == true)
        //     && (this.checkEmail(this.state.email) == true)
        //     && (this.checkPw(this.state.password) == true)
        //     && (this.state.ifPwsMatch == true)
        // )
         const ifValid = await (
            (this.checkUsername(this.state.username) == true)
            && (this.checkEmail(this.state.email) == true)
            && (this.checkPw(this.state.password) == true)
            && (this.state.ifPwsMatch == true)
        )
        this.setState({ifValid: ifValid})
        console.log("ifValid: ", ifValid)
    }

    checkEmail(value) {
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

    checkUsername(value) {
        console.log("Starting...")
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

    checkPw(value) {
        this.setState({password: value});
        try {
            if (value.length < 8) {
                throw new Error("At least 8 chars");
            } else if (value.length > 20) {
                throw new Error("No more than 20 chars");
            } else if (value.match(/^[a-zA-Z]+[a-zA-Z0-9]*$/) == null) {
                throw new Error("Latin chars and digits. Starts with a char.");
            } else {
                console.log("Password: ", value)
                return true
            }
        } catch (myError) {
            return myError
        }
    }

    ifPwsMatch = async (value)  => {
        try {
            if (value != this.state.password) {
                this.setState({ifPwsMatch: false});
                throw new Error("Pws don't match");
            } else {
                this.setState({ifPwsMatch: true})
                console.log("Password Rep: ", value)
                return true
            }
        } catch (myError) {
            return myError
        }
    }


    // changeHandler (event) {
    //
    //         // this.setState({[event.target.name]: event.target.value})
    //         // console.log("changeHandler: event.target.name: ", event.target.name, " event.target.value: ", event.target.value)
    //         let result;
    //         switch (event.target.name) {
    //             case "email":
    //                 // this.setState({email: event.target.value})
    //                 result = this.checkEmail(event.target.value);
    //                 if (result == true) {
    //                     this.setState({emailMessage: "Email true", formValid: true})
    //                 } else {
    //                     this.setState({emailMessage: result.message.toString(), formValid: false})
    //                     // console.log(result.message.toString())
    //                 }
    //                 break
    //             case "username":
    //                 // this.setState({username: event.target.value})
    //                 result = this.checkUsername(event.target.value);
    //                 if (result == true) {
    //                     this.setState({unMessage: "User Name true", formValid: true})
    //                 } else {
    //                     this.setState({unMessage: result.message.toString(), formValid: false})
    //                 }
    //                 break
    //             case "password":
    //                 result = this.checkPw(event.target.value);
    //                 if (result == true) {
    //                     this.setState({pwMessage: "Pw true", formValid: true})
    //                 } else {
    //                     this.setState({pwMessage: result.message.toString(), formValid: false})
    //                     // console.log(result.message.toString())
    //                 }
    //                 break
    //             case "repPassword":
    //                 result = this.ifPwsMatch(event.target.value);
    //                 if (result == true) {
    //                     this.setState({repPwMessage: "Pws match"})
    //                 } else {
    //                     this.setState({repPwMessage: result.message.toString()})
    //                     // console.log(result.message.toString())
    //                 }
    //         }
    //         this.ifFormvalid()
    // }

    changeHandler = async (event) => {
        let result = true;
        // console.log("event.target.name", event.target.name)
        switch (event.target.name) {
            case "email":
                // this.setState({email: event.target.value})
                result = await this.checkEmail(event.target.value);
                // console.log("result: ", result)
                if (result == true) {
                    this.setState({emailMessage: "Email true", email: event.target.value})
                    console.log()
                } else {
                    this.setState({emailMessage: result.message.toString(), formValid: false})
                    // console.log(result.message.toString())
                }
                this.ifFormvalid()
                break
            case "username":
                // this.setState({username: event.target.value})
                console.log("1. event.target.value", event.target.value)
                result = await this.checkUsername(event.target.value)
                console.log("2.", result)
                if (result == true) {
                    console.log("3. IfRestrue: User name to rem: ", event.target.value)
                    this.setState({unMessage: "User Name true", username: event.target.value}, () => {
                        console.log("4. this.state.username changeHandler: ", this.state.username)
                    })
                } else {
                    this.setState({unMessage: result.message.toString()})
                }
                this.ifFormvalid()
                break
            case "password":
                result = await this.checkPw(event.target.value);
                if (result == true) {
                    this.setState({pwMessage: "Pw true", formValid: true})
                } else {
                    this.setState({pwMessage: result.message.toString(), formValid: false})
                    // console.log(result.message.toString())
                }
                this.ifFormvalid()
                break
            case "repPassword":
                result = await this.ifPwsMatch(event.target.value)
                    .then(result => {
                        if (result == true) {
                            this.setState({repPwMessage: "Pws match"})
                        } else {
                            this.setState({repPwMessage: result.message.toString()})
                        }
                    })
                    .then(
                        this.ifFormvalid()
                    )
                    .catch(error => {
                        // handle error
                        console.log(error);
                    })
        }
        // this.ifFormvalid()
    }

    registerHandler = async (event) => {
        event.preventDefault();
        const regData = {
            username: this.state.username,
            password: this.state.password,
            email: this.state.email,
        }
        const response = await axios.post('/api/register', regData, {withCredentials: true})
            .then(response => {
                console.log("post.response.data: ", response.data);
                this.setState({apiResponse: response.data.regSuccess, message: response.data.message});
                console.log("apiResponse: ", this.state.apiResponse)
                // document.getElementById("apiID").innerText =  "API response:" + this.state.apiResponse
            })
            .catch(error => {
                // handle error
                console.log(error);
            })
    }

    render() {
        const {username, email} = this.state
        return (
            <div id="addNewUser">
                <h2>Регистрация</h2>
                <form onSubmit={this.registerHandler} autoComplete="on" id="regForm">
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
                                defaultValue={username}
                                onChange={this.changeHandler}/>
                        </div>

                        <span id="nameErrorSpan" className="errorspan">{this.state.unMessage}</span>
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
                                onChange={this.changeHandler}/>
                        </div>
                        <span id="pwErrorSpan" className="errorspan"> {this.state.pwMessage}</span>
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
                                onChange={this.changeHandler}/>
                        </div>

                        <span id="repPwErrorSpan" className="errorspan">{this.state.repPwMessage}</span>
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
                                defaultValue={email}
                                onChange={this.changeHandler}/>

                        </div>
                        <span id="emailErrorSpan" className="errorspan">{this.state.emailMessage}</span>
                    </div>
                    {/*<NavLink to="/newUser" className="button">Регистрация</NavLink>*/}
                    <div className="labelInput">
                        <button
                            type="submit"
                            className="button"
                            value="AddNewUser"
                            // className="centerbutton"
                            // id="submitIt"
                            // onClick={this.registerHandler}
                            disabled={!this.state.ifValid}

                        >
                            AddNewUser
                        </button>
                    </div>

                </form>
                <p className="errorSpan"> {this.state.apiResponse.toString()} {this.state.message.toString()}</p>
            </div>
        )
    }
}