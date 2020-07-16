import authReducer from './authReducer'
import userReducer from './userReducer'
import packageReducer from './packageReducer'
import {combineReducers} from 'redux'
import retailerReducer from './retailerReducer'

const rootReducer = combineReducers({

    auth : authReducer,
    package : packageReducer,
    retailer : retailerReducer,
    user : userReducer
});

export default rootReducer;