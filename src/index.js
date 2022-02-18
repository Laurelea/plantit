import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { applyMiddleware, createStore, compose } from "redux";
import rootReducer from "./store/rootReducer";
import { Provider } from 'react-redux';
import ThunkMiddleware from 'redux-thunk';

//промежуточная функция
const sampleMiddleWare = store => next => action => {
    const result = next(action);
    console.log('test MW: ', store.getState());
    return result
}

const composeEnhancers =
    typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
        ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
            // Specify extension’s options like name, actionsDenylist, actionsCreators, serialize...
        })
        : compose;

// applyMiddleware - применение некой промежуточной функции/ Функция будет вызываться каждый раз, когда срабатывает триггер из rootReducer
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(sampleMiddleWare, ThunkMiddleware)));

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <Provider store={store}>
                <App />
            </Provider>
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root')
);

reportWebVitals();
