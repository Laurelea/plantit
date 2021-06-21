// import logo from './logo.svg';
import React from 'react';
import './css/App.css';
import Newheader from "./partials/Newheader";
import ShowBase from "./partials/showBase";
import AllBase from "./partials/allBase";
import Vegs from "./partials/vegs"
import Fruit from "./partials/fruit"
import Herbs from "./partials/herbs"
import Decs from "./partials/decs"
import Noauth from "./partials/no_auth";
import Auth from "./partials/auth";
import Footer from "./partials/footer";
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
import {NavLink} from "react-router-dom";
import Addplant from "./partials/addPlant";
import Newuser from "./partials/newUser";
import MainStore from "./stores/MainStore";
import { observer } from 'mobx-react';
import Account from "./partials/lk";

// import Cookies from 'universal-cookie';
//
// const cookies = new Cookies();

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
                url: '/api',
                // responseType: 'json'
            })
                .then((response) => {
                    console.log("get.response.data: ", response.data);
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
                        console.log("APP MainStore.currentUser.userName", MainStore.currentUser.userName)
                        MainStore.isAuthenticated = true
                        document.title = this.state.pageTitle;
                    } else {
                        MainStore.isAuthenticated = false
                        throw new Error
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
                                {/*Это показывать только если авторизован*/}
                                <ShowBase/>
                                {/*Иначе текст: авторизуйтесь для доступа к базе растений*/}
                            </div>
                            <div id="centralContainer" className="center">
                                {/*Если не авторизован*/}
                                {/*Текст приветствия для неавторизованных, ссылка на регистрацию*/}
                                {/*<Noauth/>*/}
                                {/*Если авторизован*/}
                                {/*Текст, приглашающий посмотреть существующую базу или добавить что-то своё-->*/}
                                {/*<Hasauth/>*/}

                                {/*<Router>*/}
                                <Switch>
                                    <Route path="/" exact render={() =>
                                        <React.Fragment>
                                            <h1>Home Page</h1>
                                            {/*<button onClick={this.goToHomePage}>Click</button>*/}
                                            <h2>{this.state.pageTitle}</h2>


                                        </React.Fragment>
                                    }/>
                                    <Route path="/addPlant" exact component={Addplant}/>
                                    {/*        {Addplant}*/}
                                    {/*</Route>*/}
                                    <Route path="/newUser" exact component={Newuser}/>
                                    {/*<Route path="/auth/login" exact component={Noauth}/>*/}
                                    <Route path="/logout" exact component={Noauth}/>
                                    <Route path="/showBase" exact component={AllBase}/>
                                    <Route path="/lk" exact component={Account}/>
                                    <Route path="/vegs" exact component={Vegs}/>
                                    <Route path="/fruit" exact component={Fruit}/>
                                    <Route path="/herbs" exact component={Herbs}/>
                                    <Route path="/decs" exact component={Decs}/>
                                    <Route render={() => <h2>404 not found</h2>}/>
                                </Switch>
                                {/*</Router>*/}
                                <p>User Name is: {MainStore.currentUser.userName}</p>
                                <p>Message from API: {this.state.apiResponse}</p>
                                <p>"MainStore.isAuthenticated:
                                    " {MainStore.isAuthenticated.toString()}</p>
                                <p>"MainStore.currentUser:
                                    " {MainStore.currentUser.userName}</p>
                                <p>"MainStore.currentUser ID:
                                    " {MainStore.currentUser.userID}</p>
                                {
                                        MainStore.isAuthenticated
                                            // true
                                            ? <span className="errorspan"
                                                    id="authSuccessSpan">{this.state.apiResponse} {"\n"} You're logged in as {MainStore.currentUser.userName}</span>
                                            : <span className="errorspan"
                                                    id="authErrorSpan">{this.state.apiResponse}</span>
                                }

                            </div>
                            <div id="authContainer" className="totheright">
                                {/*Это показывать только если не авторизован*/}
                                {
                                    MainStore.isAuthenticated
                                        ? <span className="errorspan"
                                                id="authSuccessSpan">{this.state.apiResponse} {"\n"} You're logged in as {MainStore.currentUser.userName}</span>
                                        : <Auth/>
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
