import {observer} from "mobx-react";
import {NavLink} from "react-router-dom";
import MainStore from "../stores/MainStore";
import React from "react";

const showUL = observer( () => {
    return (
        <ul className="nav-mobile">
            <li className="active"><NavLink to="/" exact>ГЛАВНАЯ</NavLink></li>
            <li className="active"><NavLink to="/addPlant" exact>ДОБАВИТЬ</NavLink></li>
            {/*{stateApp.state.isLoggedIn*/}
            {/*    ? <li className="active"><NavLink to="/currentPlants" exact>ЧТО РАСТЁТ</NavLink></li>*/}
            {/*    : null}*/}
            {MainStore.isAuthenticated
                ? <li className="active"><NavLink to="/currentPlants" exact>ЧТО РАСТЁТ</NavLink></li>
                : null}
            {!MainStore.isAuthenticated
                ? <li className="active"><NavLink to="/" exact>ВОЙТИ</NavLink></li>
                : null}
            {MainStore.isAuthenticated
                ? <li className="active"><NavLink to="/lk" exact>ЛК</NavLink></li>
                : null}
            {MainStore.isAuthenticated
                ? <li className="active"><NavLink to="/logout" exact>ВЫЙТИ</NavLink></li>
                : null}
            {/*<li className="active"><NavLink to="/auth/logout" exact>ВЫЙТИ</NavLink></li>*/}
        </ul>
    )
})

export default showUL()