import React, { useEffect } from 'react';
import './css/grid.css';
import { API_URL } from "./config";
import { connect } from 'react-redux';
import { authorize, unauthorize } from "./store/actions";
import { ICat, IReduxState, IUser} from "./store/types";
import Newheader from "./partials/header";
import Footer from "./partials/footer";
import { Route, Switch } from "react-router-dom";
import { AddNew } from "./partials/addNew";
import Newuser from "./partials/newUser";
import Account from "./partials/lk";
import Chat from "./partials/chat";
import ShowBase from "./partials/showBase";
import Auth from "./partials/auth";
import BaseTable from "./partials/baseTable";
import Cards from "./partials/cards";

const axios = require('axios').default;
axios.defaults.withCredentials = true
axios.defaults.headers.common['Authorization'] = document.cookie

interface IAppProps {
    authorize: (userID: number, userName: string, userEmail: string, numberOfPlants: number) => void,
    unauthorize: () => void,
    isAuthenticated: boolean,
    currentUser: IUser,
    cats: undefined | Array<ICat>,
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
    console.log('APP:', props)
    // console.log('41 cookies from browser:', document.cookie)
    useEffect(() => {
        axios({
            method: 'get',
            url: API_URL +'api',
        })
            .then( (response: ICheckAuth) => {
                console.log("48 App get.response.data: ", response.data);
                if (response.data.isAuthenticated) {
                    console.log('50 App authorized!')
                    props.authorize(response.data.userID, response.data.userName, response.data.userEmail, response.data.numberOfPlants);
                } else {
                    console.log('53 got fail in auth')
                    props.unauthorize();
                    throw new Error("API response: unauthorized")
                }
            })
            .catch((error: any) => {
                console.log(error);
            })
    }, [])  //props

    return (
        <div className="App">
            <div className="gridMainContainer">
                <header className="header mainElement">
                    <Newheader/>
                </header>
                <div className="showbase mainElement">
                    {
                        props.isAuthenticated
                            ? <ShowBase/>
                            : <div>
                                <span className="errorspan"> Please, log in to see the plant base </span>
                            </div>
                    }
                </div>
                <div className="center mainElement">
                    <div id="centralContainer" className="center">
                        <Switch>
                            <Route path="/" exact render={() =>
                                <React.Fragment>
                                    <h1>Home Page</h1>
                                    <p id="welcomep">
                                        PlantIt! - это удобный инструмент для огородника, позволяющий вести историю посадок и применения различных садовых технологий,
                                        а также общаться с единомышленниками.
                                    </p>
                                </React.Fragment>
                            }/>
                            <Route path="/addNew" exact component={AddNew}/>
                            <Route path="/newUser" exact component={Newuser}/>
                            <Route path="/showBase" exact><BaseTable sortkey = {'all'}/> </Route>
                            <Route path="/lk" exact component={Account}/>
                            {props.cats
                                ? props.cats.map(cat => {
                                const catLink = "/cat-" + cat.cat_id;
                                return (
                                <Route path={catLink} exact key={cat.cat_id}><Cards cat = {cat.cat_id}/> </Route>
                            )})
                                : null}
                            {/*<Route path="/cat-1" exact><Cards cat = {1}/> </Route>*/}
                            <Route path="/chat" exact component={Chat}/>
                            <Route render={() => <h2>404 not found</h2>}/>
                        </Switch>
                    </div>
                </div>
                <div className="auth mainElement">
                    {
                        props.isAuthenticated
                            ? <div className="chatSection">
                                <span className="errorspan" id="authSuccessSpan">
                                    You're logged in as {props.currentUser.userName}
                                </span>
                                <Chat/>
                            </div>
                            :
                            <Auth/>
                    }
                </div>
                <div className="footer mainElement">
                    <Footer/>
                </div>
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
    pageTitle: state.pageTitle,
    cats: state.cats,
}), {authorize, unauthorize})(App);
// Другая запись:

// export default connect(
//     (state: AppState) => ({
//         user: state.auth.user,
//         isLoggedIn: state.auth.isLoggedIn,
//     }),
//     {},
// )(SystemStatus);
