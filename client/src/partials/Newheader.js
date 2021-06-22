import React, {Component} from 'react';
import '../css/App.css';
import {BrowserRouter as Router, NavLink, Route, Switch, Link}  from "react-router-dom";
import {useHistory} from "react-router-dom";
import {observer} from 'mobx-react';
import MainStore from '../stores/MainStore';
import Logout from "./no_auth";
const App = require ("../App")
// const { match, history } = props
// import { createBrowserHistory } from "history";
//
// const customHistory = createBrowserHistory();
// type Props = RouteComponentProps

async function LogoutHandler (event) {
    event.preventDefault()
    // const history = useHistory();
    console.log("This is logout, babe")
    await Logout()
    // window.location.replace("/")

    // this.history.pushState(null, '/')
    // history.push('/');
    // // return (<Redirect to="/" />)
    App.customHistory.push('/');
    // return null
}

const Newheader = observer(
    class Newheader extends Component {
        render() {
            return (

                <header className="Newheader">
                    {/*<Switch>*/}
                    {/*<Router history={customHistory} />*/}
                    {/*</Switch>*/}
                    <h1 id="mainheader" className="logo">
                        <NavLink to="/"> Моя Дача. Проект по посадке растений.</NavLink>
                    </h1>
                    <nav className="Nav">
                        <div className="nav-wrapper">
                            {/*<Observer>{() =>*/}
                            <ul className="nav-mobile">
                                <li className="active"><NavLink to="/" exact>ГЛАВНАЯ</NavLink></li>
                                {MainStore.isAuthenticated
                                    ? <li className="active"><NavLink to="/showBase" exact>БАЗА</NavLink>
                                    </li>
                                    : null}
                                {MainStore.isAuthenticated
                                    ? <li className="active"><NavLink to="/addPlant" exact>ДОБАВИТЬ</NavLink>
                                    </li>
                                    : null}
                                {MainStore.isAuthenticated
                                    ? <li className="active"><NavLink to="/chat" exact>ЧАТ</NavLink>
                                    </li>
                                    : null}
                                {/*{MainStore.isAuthenticated*/}
                                {/*        ?*/}
                                {/*        <li className="active"><NavLink to="/currentPlants" exact>ЧТО РАСТЁТ</NavLink>*/}
                                {/*        </li>*/}
                                {/*        : null}*/}
                                {!MainStore.isAuthenticated
                                        ? <li className="active"><NavLink to="/" exact>ВОЙТИ</NavLink></li>
                                        : null}
                                {MainStore.isAuthenticated
                                    ? <li className="active"><NavLink to="/lk" exact>ЛК</NavLink></li>
                                    : null}
                                {MainStore.isAuthenticated
                                        ? <li className="active"><NavLink to="/logout" exact onClick = {LogoutHandler}>ВЫЙТИ</NavLink></li>
                                        // ? <a href="" onClick="$(document.body).append($('<form method=POST action=/logout>'));$('form').submit();return false">Выйти</a>
                                        // ? <a href="" onClick="$('<form method=POST action=/logout>').submit();return false">Выйти</a>
                                        : null}
                                {/*<li className="active"><NavLink to="/auth/logout" exact>ВЫЙТИ</NavLink></li>*/}
                            </ul>
                        </div>
                    </nav>
                </header>
            )
        }
    })
export default Newheader