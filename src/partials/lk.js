import React from "react";
import MainStore from "../stores/MainStore";
import { observer } from 'mobx-react';
import {NavLink} from "react-router-dom";
// const controller = require('../../../db/controller')
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

const Account = observer(
    class Account extends React.Component {
        constructor(props) {
            super(props);
            this.state = {}
        }

        render() {
            return (
                <div className="account-main-container">
                <div> LK</div>
                <div> Вы вошли как: {MainStore.currentUser.userName}</div>

                <div>Всего растений добавлено: {MainStore.currentUser.numberOfPlants}</div>
                <NavLink to="/currentPlants" exact>ЧТО РАСТЁТ</NavLink>
                </div>

            )
        }
    }
)

export default Account;
export {numberOfPlantsAdded};