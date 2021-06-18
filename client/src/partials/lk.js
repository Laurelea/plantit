import React from "react";
import MainStore from "../stores/MainStore";
import { observer } from 'mobx-react';
import {NavLink} from "react-router-dom";


const Account = observer(
    class Account extends React.Component {
        constructor(props) {
            super(props);
            this.state = {}
        }

        render() {
            return (
                <>
                <div> LK</div>
                <div>Всего растений добавлено:</div>
                    <NavLink to="/currentPlants" exact>ЧТО РАСТЁТ</NavLink>
                </>

            )
        }
    }
)

export default Account;