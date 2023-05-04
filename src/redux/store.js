import {legacy_createStore as createStore,applyMiddleware} from 'redux'

import reducer from "./reducer"
//redux中间件处理异步操作
import thunk from "redux-thunk"

const store = createStore(reducer,applyMiddleware(thunk));

export default store;

