import React, { useState } from 'react';
import './css/App.css';
import Newheader from "./partials/Newheader";
import ShowBase from "./partials/showBase";
import AllBase from "./partials/allBase";
import Vegs from "./partials/vegs"
import Fruit from "./partials/fruit"
import Herbs from "./partials/herbs"
import Decs from "./partials/decs"
import Auth from "./partials/auth";
import Footer from "./partials/footer";
import { Switch, Route } from "react-router-dom";
import Addplant from "./partials/addPlant";
import Newuser from "./partials/newUser";
import Account from "./partials/lk";
import Chat from "./partials/chat"
import { API_URL } from "./config";
import { connect } from 'react-redux';
import {authorize, setMessage, smthAsync, unauthorize} from "./store/actions";

const axios = require('axios').default;

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            apiResponse: "",
            pageTitle: "React Components"
        };
    };

    componentDidMount = async() => {
        await axios({
            method: 'get',
            url: API_URL +'api',
            // responseType: 'json'
        })
            .then( async(response) => {
                console.log("get.response.data: ", response.data);
                this.setState({
                    apiResponse: response.data.message,
                });
                if (response.data.isAuthenticated) {
                    this.setState({
                        pageTitle: response.data.title
                    });
                    await this.props.authorize(response.data.userID, response.data.userName, response.data.userEmail, response.data.numberOfPlants);
                    // MainStore.isAuthenticated = true;
                    document.title = this.state.pageTitle;
                } else {
                    this.props.unauthorize();
                    throw new Error("Auth problems")
                }
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    render() {
        console.log('APP:', this.props);
        return (
            <div className="App">
                <div className="mainContainer">
                    <Newheader/>
                    <div id="bodyContainer" className="horizontal-align">
                        <div id="dbContainer" className="totheleft">
                            {/*/!*Это показывать только если авторизован*!/*/}
                            {/*<ShowBase/>*/}
                            {/*/!*Иначе текст: авторизуйтесь для доступа к базе растений*!/*/}
                            {
                                this.props.isAuthenticated
                                    ? <ShowBase/>
                                    : <div>
                                        <span className="errorspan"> Please, log in to see the plant base </span>
                                </div>
                            }
                        </div>
                        <div id="centralContainer" className="center">

                            <Switch>
                                <Route path="/" exact render={() =>
                                    <React.Fragment>
                                        <h1>Home Page</h1>
                                        {/*<button onClick={this.goToHomePage}>Click</button>*/}
                                        {/*<h2>{this.state.pageTitle}</h2>*/}
                                        <p id="welcomep">
                                            PlantIt! - это удобный инструмент для огородника, позволяющий вести историю посадок и применения различных садовых технологий,
                                            а также общаться с единомышленниками.
                                        </p>

                                    </React.Fragment>
                                }/>
                                <Route path="/addPlant" exact component={Addplant}/>
                                <Route path="/newUser" exact component={Newuser}/>
                                <Route path="/showBase" exact component={AllBase}/>
                                <Route path="/lk" exact component={Account}/>
                                <Route path="/vegs" exact component={Vegs}/>
                                <Route path="/fruit" exact component={Fruit}/>
                                <Route path="/herbs" exact component={Herbs}/>
                                <Route path="/decs" exact component={Decs}/>
                                <Route path="/chat" exact component={Chat}/>
                                <Route render={() => <h2>404 not found</h2>}/>

                            </Switch>
                        </div>
                        <div id="authContainer" className="totheright">
                            {/*Это показывать только если не авторизован*/}
                            {
                                this.props.isAuthenticated
                                    ? <div className="chat_section">
                                        <span className="errorspan"
                                            id="authSuccessSpan">You're logged in as {this.props.currentUser.userName}</span>
                                        <Chat/>
                                    </div>
                                    :
                                    <Auth/>
                            }
                        </div>
                    </div>
                    <Footer/>
                </div>
            </div>
        );
    }
}

// опеределяем props, которые будут переданы в App на основе общего стейта из сторы
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

export default connect(mapStateToProps, mapDispatchToProps)(App);

// Другая запись:

// export default connect(
//     (state: AppState) => ({
//         user: state.auth.user,
//         isLoggedIn: state.auth.isLoggedIn,
//     }),
//     {},
// )(SystemStatus);
