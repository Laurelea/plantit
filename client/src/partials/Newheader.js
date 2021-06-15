import React, {Component} from 'react';
import '../App.css';
import {BrowserRouter as Router, NavLink, Route, Switch, Link} from "react-router-dom";
// import Cookies from 'universal-cookie';

// const cookies = new Cookies();
import { observer } from 'mobx-react';
import cn from 'classnames';
import MainStore from '../stores/MainStore';

const home = (
    <>
        <h1>Home Page </h1>
    </>
)

// const stateApp = App
export default class Newheader extends Component{
    render () {
        // const Menu = observer(() => (
        //     <nav className={cn(styles.menu, { [styles.active]: MainStore.show })}>
        //         <div className={styles['toggle-btn']}>☰</div>
        //     </nav>
        // ));
    return (
        <header className="Newheader">
            <h1 id="mainheader" className="logo">
                <NavLink to="/"> Моя Дача. Проект по посадке растений.</NavLink>
            </h1>
                <nav className="Nav">
                    <div className="nav-wrapper">
                        <ul className="nav-mobile">
                            <li className={MainStore.isAuthenticated ? "active" : null}><NavLink to="/" exact>ГЛАВНАЯ</NavLink></li>
                            <li className="active"><NavLink to="/addPlant" exact>ДОБАВИТЬ</NavLink></li>
                            {/*{stateApp.state.isLoggedIn*/}
                            {/*    ? <li className="active"><NavLink to="/currentPlants" exact>ЧТО РАСТЁТ</NavLink></li>*/}
                            {/*    : null}*/}
                            <li className="active"><NavLink to="/currentPlants" exact>ЧТО РАСТЁТ</NavLink></li>
                            <li className="active"><NavLink to="/auth/login" exact>ВОЙТИ</NavLink></li>
                            <li className="active"><NavLink to="/lk" exact>ЛК</NavLink></li>
                            <li className="active"><NavLink to="/auth/logout" exact>ВЫЙТИ</NavLink></li>
                        </ul>
                    </div>
                </nav>
        </header>

    )
}
}