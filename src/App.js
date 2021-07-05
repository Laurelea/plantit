import React from 'react';
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
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Addplant from "./partials/addPlant";
import Newuser from "./partials/newUser";
import MainStore from "./stores/MainStore";
import { observer } from 'mobx-react';
import Account from "./partials/lk";
import { createBrowserHistory } from "history";
import Chat from "./partials/chat"
import {API_URL} from "./config";

const customHistory = createBrowserHistory();

const axios = require('axios').default;
// const authStatus = observer(() => {
//     return MainStore.isAuthenticated
// });


const App = observer(
    class App extends React.Component {

        constructor(props) {
            super(props);
            this.state = {
                apiResponse: "",
                pageTitle: "React Components",
                isAuthenticated: MainStore.isAuthenticated
                // isAuthenticated: false
            };
        }


        componentDidMount = async() => {
            // console.log("MainStore.isAuthenticated:  " , this.state.isAuthenticated)

            await axios({
                method: 'get',
                url: API_URL +'api',
                // responseType: 'json'
            })
                .then((response) => {
                    // console.log("get.response.data: ", response.data);
                    this.setState({
                        apiResponse: response.data.message,
                    });
                    if (response.data.isAuthenticated) {
                        this.setState({
                            pageTitle: response.data.title,
                            userName: response.data.userName,
                            userEmail: response.data.userEmail,
                        });
                        MainStore.setUser(response.data.userID, response.data.userName, response.data.userEmail, response.data.numberOfPlants);
                        // console.log("APP MainStore.currentUser.userName", MainStore.currentUser.userName)
                        MainStore.isAuthenticated = true
                        document.title = this.state.pageTitle;
                    } else {
                        MainStore.isAuthenticated = false
                        throw new Error("Auth problems")
                    }
                })
                .catch(function (error) {
                    // handle error
                    console.log(error);
                })
            // console.log("document.title: ", document.title)
            // console.log("this.state.pageTitle: ", this.state.pageTitle)

            // console.log(cookies.get("SID"))
        }

        render() {

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
                                    MainStore.isAuthenticated
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
                                    <Router history={customHistory} />

                                </Switch>
                                {/*<p>User Name is: {MainStore.currentUser.userName}</p>*/}
                                {/*<p>Message from API: {this.state.apiResponse}</p>*/}
                                {/*<p>"MainStore.isAuthenticated:*/}
                                {/*    " {MainStore.isAuthenticated.toString()}</p>*/}
                                {/*<p>"MainStore.currentUser:*/}
                                {/*    " {MainStore.currentUser.userName}</p>*/}
                                {/*<p>"MainStore.currentUser ID:*/}
                                {/*    " {MainStore.currentUser.userID}</p>*/}
                                {/*{*/}
                                {/*        MainStore.isAuthenticated*/}
                                {/*            // true*/}
                                {/*            ? <span className="errorspan"*/}
                                {/*                    id="authSuccessSpan">{this.state.apiResponse} {"\n"} You're logged in as {MainStore.currentUser.userName}</span>*/}
                                {/*            : <span className="errorspan"*/}
                                {/*                    id="authErrorSpan">{this.state.apiResponse}</span>*/}
                                {/*}*/}


                            </div>
                            <div id="authContainer" className="totheright">
                                {/*Это показывать только если не авторизован*/}
                                {
                                    MainStore.isAuthenticated
                                        ? <div className="chat_section">
                                            <span className="errorspan"
                                                id="authSuccessSpan">You're logged in as {MainStore.currentUser.userName}</span>
                                            <Chat/>
                                        </div>
                                        :
                                        // <div> span className="errorspan">{this.state.apiResponse}</span>
                                        <Auth/>
                                // </div>

                                }
                            </div>
                        </div>
                        <Footer/>
                    </div>
                </div>
            );
        }
    })
export default App;

export {customHistory};