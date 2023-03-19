import {applyMiddleware, combineReducers, createStore, compose} from 'redux';
import thunk from 'redux-thunk';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Reducer from './reducers'; // Redux Debugger

let composeEnhancer = compose;

//Passing enhancer to debug redux state in react devtools
if (__DEV__) {
  composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}

//Passing all the reducers into appdata
const Reducers = {
  appData: Reducer,
};

//Persist the state when app restarts. Here we use async storage to remember the state
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  blacklist: ['navigation'], // navigation will not be persisted
};


const persistedReducer = persistReducer(
  persistConfig,
  combineReducers(Reducers),
);

export const Store = createStore(
  persistedReducer,
  composeEnhancer(applyMiddleware(thunk)),
);

export const persistor = persistStore(Store);
