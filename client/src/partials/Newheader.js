import React, {Component} from 'react';
import '../css/App.css';
import {BrowserRouter as Router, NavLink, Route, Switch, Link} from "react-router-dom";
import {Observer, observer} from 'mobx-react';
import cn from 'classnames';
import MainStore from '../stores/MainStore';
// import ul from "./ul"
// const home = (
//     <>
//         <h1>Home Page </h1>
//     </>
// )


const Newheader = observer(
    class Newheader extends Component {
        render() {

            return (
                <header className="Newheader">
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
                                        ? <li className="active"><NavLink to="/logout" exact>ВЫЙТИ</NavLink></li>
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