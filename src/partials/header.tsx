import React from 'react';
import '../css/App.css';
import { NavLink }  from "react-router-dom";
import { connect } from "react-redux";
import { unauthorize } from "../store/actions";
import { IReduxState } from "../store/types";

// authorize: (userID: number, userName: string, userEmail: string, numberOfPlants: number) => IAuthorizeAction

interface IHeaderProps {
    unauthorize: () => void;
    isAuthenticated: boolean;
}

const Newheader = (props: IHeaderProps) =>  {
    const LogoutHandler = async(event: React.MouseEvent<HTMLElement>): Promise<void> => {
        event.preventDefault();
        await props.unauthorize();
        await window.location.replace("/");
    };
    return (
        <header className="Newheader">
            <h1 id="mainheader" className="logo">
                <NavLink to="/"> Моя Дача. Проект по посадке растений.</NavLink>
            </h1>
            <nav className="Nav">
                <div className="nav-wrapper">
                    <ul className="nav-mobile">
                        <li className="active"><NavLink to="/" exact>ГЛАВНАЯ</NavLink></li>
                        {props.isAuthenticated
                            ? <React.Fragment>
                                <li className="active"><NavLink to="/showBase" exact>БАЗА</NavLink></li>
                                <li className="active"><NavLink to="/addPlant" exact>ДОБАВИТЬ</NavLink></li>
                                <li className="active"><NavLink to="/currentPlants" exact>ЧТО РАСТЁТ</NavLink></li>
                                <li className="active"><NavLink to="/lk" exact>ЛК</NavLink></li>
                                <li className="active"><NavLink to="/logout" exact onClick = {LogoutHandler}>ВЫЙТИ</NavLink></li>
                            </React.Fragment>
                            : <li className="active"><NavLink to="/" exact>ВОЙТИ</NavLink></li>
                        }
                    </ul>
                </div>
            </nav>
        </header>
    )
}

export default connect((state: IReduxState) => ({
    isAuthenticated: state.isAuthenticated,
}), { unauthorize })(Newheader);

