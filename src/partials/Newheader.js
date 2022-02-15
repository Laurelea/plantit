import React, {Component} from 'react';
import '../css/App.css';
import {NavLink}  from "react-router-dom";
import {connect} from "react-redux";
import {authorize, setMessage, smthAsync, unauthorize} from "../store/actions";

const Newheader = (props) =>  {
    const LogoutHandler = async(event) => {
        event.preventDefault();
        console.log("This is logout, babe");
        await props.unauthorize()
        await window.location.replace("/")
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
                            : <li className="active"><NavLink to="/" exact>ТЕСТ</NavLink></li>}
                    </ul>
                </div>
            </nav>
        </header>
    )
}

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.isAuthenticated
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        unauthorize: () => dispatch(unauthorize())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Newheader);

