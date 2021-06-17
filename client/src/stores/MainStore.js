import { action, observable, makeAutoObservable} from 'mobx';
import {observer} from "mobx-react";

class MainStore {
    title = "From Server With Love";
    isAuthenticated = false;
    message = "default message";
    currentUser = {
        userName: "Default",
        userEmail: "default@default.ru"
    };
    constructor() {
        // this.isAuthenticated = false;
        makeAutoObservable(this)
    }
    @action
    setUser(name, email) {
        this.currentUser = {
            userName: name,
            userEmail: email
        }
    }
    @action
    dropUser() {
        this.currentUser = {
            userName: "Default",
            userEmail: "default@default.ru"
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