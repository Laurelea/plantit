import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from 'react-router-dom';
import {observer, Provider} from "mobx-react";
import MainStore from "./stores/MainStore";

// const store = new MainStore();

const application = (
    <BrowserRouter>
        <App />
    </BrowserRouter>
)

// ReactDOM.render(
//     <Provider store = {store}>
//         <BrowserRouter>
//             <App />
//         </BrowserRouter>
//     </Provider>,
//     document.getElementById('root')
// );

@observer
class RunApp extends React.Component<{}, {}> {
    // store: Store;

    constructor(props) {
        super(props);
        this.store = new MainStore();
    }

    render() {
        return (
            <Provider store = {this.store}>
                {application}
                {/*<BrowserRouter>*/}
                {/*    <App />*/}
                {/*</BrowserRouter>*/}
            </Provider>
        );
    }
}

ReactDOM.render(<RunApp />, document.getElementById("root"));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
