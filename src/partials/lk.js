import React from "react";
import {NavLink} from "react-router-dom";
import {authorize, setMessage, smthAsync, unauthorize} from "../store/actions";
import {connect} from "react-redux";

const Account = (props) => {
    return (
        <div className="account-main-container">
        <div> LK</div>
        <div> Вы вошли как: {props.currentUser.userName}</div>

        <div>Всего растений добавлено: {props.currentUser.numberOfPlants}</div>
        <NavLink to="/currentPlants" exact>ЧТО РАСТЁТ</NavLink>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        counter: state.counter,
        isAuthenticated: state.isAuthenticated,
        message: state.message,
        currentUser: state.currentUser
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        authorize: (userID, userName, userEmail, numberOfPlants) => dispatch(authorize(userID, userName, userEmail, numberOfPlants)),
        unauthorize: () => dispatch(unauthorize()),
        smthAsync: (userID, userName, userEmail, numberOfPlants) => dispatch(smthAsync(userID, userName, userEmail, numberOfPlants)),
        setMessage: message => dispatch(setMessage(message))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Account);
