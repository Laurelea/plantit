import { NavLink } from "react-router-dom";
import { setMessage, unauthorize } from "../store/actions";
import { connect} from "react-redux";
import Main from './useContext_example' // useContext example
import { Alert } from "./useContext_example";  // useContext example
import { ContextProvider } from "../context";
import {IReduxState, IUser} from "../store/types"; // useContext example

interface IAccountProps {
    currentUser: IUser,
}

const Account = (props: IAccountProps) => {
    return (
        <ContextProvider> {/*useContext example*/}
            <div className="account-main-container">
                <div> LK</div>
                <div> Вы вошли как: {props.currentUser.userName}</div>
                <div>Всего растений добавлено: {props.currentUser.numberOfPlants}</div>
                <NavLink to="/currentPlants" exact>ЧТО РАСТЁТ</NavLink>
                    <Alert /> {/*useContext example*/}
                    <Main /> {/*useContext example*/}
            </div>
        </ContextProvider> // useContext example
    )
}

export default connect((state: IReduxState) => ({
    counter: state.counter,
    isAuthenticated: state.isAuthenticated,
    message: state.message,
    currentUser: state.currentUser
}), {
    unauthorize,
    setMessage
})(Account);
