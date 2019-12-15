import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import reduxThunk from "redux-thunk";
import reducers from "./reducers";
import reduxMulti from 'redux-multi'
import { batchedSubscribe } from 'redux-batched-subscribe'
import * as serviceWorker from "./serviceWorker";
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const createStoreWithMiddleware = composeEnhancers(applyMiddleware(
    reduxThunk,
    reduxMulti,
))(createStore);

const createStoreWithBatching = batchedSubscribe(
    fn => fn()
)(createStoreWithMiddleware);

const store = createStoreWithBatching(reducers);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector("#root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
