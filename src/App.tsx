import React, { useEffect } from 'react';
// import './css/App.css';
import Newheader from "./partials/header";
import ShowBase from "./partials/showBase";
import AllBase from "./partials/allBase";
import { Vegs } from "./partials/allBase"
import { Fruit } from "./partials/allBase"
import { Herbs } from "./partials/allBase"
import { Decs } from "./partials/allBase"
import Auth from "./partials/auth";
import Footer from "./partials/footer";
import { Switch, Route } from "react-router-dom";
import Addplant from "./partials/addPlant";
import Newuser from "./partials/newUser";
import Account from "./partials/lk";
import Chat from "./partials/chat"
import { API_URL } from "./config";
import { connect } from 'react-redux';
import { authorize, unauthorize } from "./store/actions";
import { IReduxState, IUser } from "./store/types";

const axios = require('axios').default;

interface IAppProps {
    authorize: (userID: number, userName: string, userEmail: string, numberOfPlants: number) => void,
    unauthorize: () => void,
    isAuthenticated: boolean,
    currentUser: IUser,
}

interface ICheckAuth {
    data: {
        isAuthenticated: boolean,
        userID: number,
        userName: string,
        userEmail: string,
        numberOfPlants: number,
    }
}

const App = (props: IAppProps) => {
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
            .then( (response: ICheckAuth) => {
                console.log("get.response.data: ", response.data);
                // setState({
                //     apiResponse: response.data.message,
                // });
                if (response.data.isAuthenticated) {
                    // setState({
                    //     ...state,
                    //     pageTitle: response.data.title
                    // });
                    props.authorize(response.data.userID, response.data.userName, response.data.userEmail, response.data.numberOfPlants);
                    // document.title = state.pageTitle;
                } else {
                    props.unauthorize();
                    throw new Error("API response: unauthorized")
                }
            })
            .catch((error: any) => {
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

export default connect((state: IReduxState) => ({
    counter: state.counter,
    isAuthenticated: state.isAuthenticated,
    message: state.message,
    currentUser: state.currentUser,
    apiResponse: state.apiResponse,
    pageTitle: state.pageTitle
}), {authorize, unauthorize})(App);
// Другая запись:

// export default connect(
//     (state: AppState) => ({
//         user: state.auth.user,
//         isLoggedIn: state.auth.isLoggedIn,
//     }),
//     {},
// )(SystemStatus);
