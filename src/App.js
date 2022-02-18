import React, { useState, useEffect } from 'react';
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

const App = (props) => {
    {console.log('APP:', props)}
    // const [state, setState] = useState({
    //     apiResponse: 'initital empty response',
    //     pageTitle: 'Initial App page title'
    // });
    useEffect(() => {
        axios({
            method: 'get',
            url: API_URL +'api',
            // responseType: 'json'
        })
            .then( async response => {
                console.log("get.response.data: ", response.data);
                // setState({
                //     apiResponse: response.data.message,
                // });
                if (response.data.isAuthenticated) {
                    // setState({
                    //     ...state,
                    //     pageTitle: response.data.title
                    // });
                    await props.authorize(response.data.userID, response.data.userName, response.data.userEmail, response.data.numberOfPlants);
                    // document.title = state.pageTitle;
                } else {
                    await props.unauthorize();
                    throw new Error("API response: unauthorized")
                }
            })
            .catch(error => {
                console.log(error);
            })
    }, [])

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
                                props.isAuthenticated
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
                                props.isAuthenticated
                                    ? <div className="chat_section">
                                        <span className="errorspan"
                                            id="authSuccessSpan">You're logged in as {props.currentUser.userName}</span>
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

// App.getInitialProps = async (context) => {
//     const isLoggedIn = context.store.getState().auth.isLoggedIn;
//     if (context.req && !isLoggedIn) {
//         await needLogin(context.res);
//     }
//     return {
//         path: context.asPath,
//     };
// };


// опеределяем props, которые будут переданы в App на основе общего стейта из сторы
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

export default connect(mapStateToProps, mapDispatchToProps)(App);

// Другая запись:

// export default connect(
//     (state: AppState) => ({
//         user: state.auth.user,
//         isLoggedIn: state.auth.isLoggedIn,
//     }),
//     {},
// )(SystemStatus);
