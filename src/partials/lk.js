import React from "react";
import MainStore from "../store/MainStore";
import {NavLink} from "react-router-dom";
import {authorize, setMessage, smthAsync, unauthorize} from "../store/actions";
import {connect} from "react-redux";
const axios = require('axios').default;

// let result;
//
async function numberOfPlantsAdded  () {
    console.log("LK MainStore.currentUser.userID", MainStore.currentUser.userID)
    console.log("LK MainStore.currentUser.userID", MainStore.currentUser.userName)
    const data = {id: MainStore.currentUser.userID}
    await axios.post('/api/getNumberOfPlants', data)
        .then(response => {
                console.log("LK Got Plants: response.data: ", response.data)
                    // this.setState({dbToPrint: response.data.rows})
                // return response.data.rows
                // data = response.data.rows;
                // MainStore.dbToPrint = response.data.rows;
                MainStore.currentUser.numberOfPlants = response.data;
            }
        )
        .catch(error => {
            console.log("numberOfPlantsAdded error: ", error);
        })
}
// numberOfPlantsAdded()

// console.log("MainStore.currentUser.numberOfPlants", MainStore.currentUser.numberOfPlants)
// console.log("MainStore.currentUser.numberOfPlants", MainStore.currentUser.userName)

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
export {numberOfPlantsAdded};
