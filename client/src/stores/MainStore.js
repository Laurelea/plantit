import { action, observable, makeAutoObservable} from 'mobx';
import {observer} from "mobx-react";

class MainStore {
    title = "From Server With Love";
    isAuthenticated = false;
    message = "default message";
    currentUser = {
        userName: "Default",
        userEmail: "default@default.ru",
        userID: 0
    };
    dbToPrint = []
    constructor() {
        // this.isAuthenticated = false;
        makeAutoObservable(this)
    }
    @action
    setUser(id, name, email, number) {
        this.currentUser = {
            userID: id,
            userName: name,
            userEmail: email,
            numberOfPlants: number
        }
    }
    @action
    dropUser() {
        this.currentUser = {
            userName: "Default",
            userEmail: "default@default.ru",
            userID: 0
        }
    }
}

// const StoreContext = React.createContext();
//
// export const StoreProvider = ({ children, store }) => {
//     return (
//         <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
//     );
// };
//
// export const useStore = () => React.useContext(StoreContext);
//
// export const withStore = (Component) => (props) => {
//     return <Component {...props} store={useStore()} />;
// };
export default new MainStore