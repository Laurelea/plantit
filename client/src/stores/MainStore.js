import { action, observable} from 'mobx';

class MainStore {
    @observable title = "From Server With Love";
    @observable isAuthenticated;
    constructor() {
        this.isAuthenticated = false;
    }

    @observable message = "default message";
    @observable currentUser = {
        userName: "Default",
        userEmail: "default@default.ru"
    };
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
export default MainStore