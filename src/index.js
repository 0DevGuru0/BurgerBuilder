import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

//router
import {BrowserRouter} from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';

//redux
import {combineReducers,createStore,applyMiddleware,compose} from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import burger from './store/reducers/burgerBuilder';
import order from './store/reducers/order';
import auth from './store/reducers/auth';

//redux-Saga
import createSagaMidddleware from 'redux-saga';
import { watchAuth,watchOrder,watchBurger } from './store/sagas';

//*******************************************************************/

const composeEnhancers = process.env.NODE_ENV ==="development"
        ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
        : null || compose;

const sagaMiddleware = createSagaMidddleware();

//________________________________________________________
const store = createStore(
    combineReducers({burger , order , auth}),
    composeEnhancers(
        applyMiddleware(thunk,sagaMiddleware)
    )
)
//subscribe method:
//  add callback handler to invoke each time state change.
// const Un_Subscribe = store.subscribe(()=>console.log(store.getState()))
window.store = store;
//________________________________________________________
sagaMiddleware.run(watchAuth)
sagaMiddleware.run(watchOrder)
sagaMiddleware.run(watchBurger)

const app = (
  <Provider store={store}>
      <BrowserRouter>
          <App />
      </BrowserRouter>
  </Provider>
)

ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();
