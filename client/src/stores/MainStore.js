import { action, observable, makeAutoObservable} from 'mobx';

class MainStore {
    @observable title = "From Server With Love";
    @observable isAuthenticated = false;
    @observable message = "default message";
    @observable currentUser = {
        userName: "Default",
        userEmail: "default@default.ru"
    };
    constructor() {
        // this.isAuthenticated = false;
        makeAutoObservable(this)
    }
    setUser(name, email) {
        this.currentUser = {
            userName: name,
            userEmail: email
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