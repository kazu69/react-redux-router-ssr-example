import { combineReducers } from 'redux'
import books from './books'
import { routerReducer } from 'react-router-redux'

export default combineReducers({
    books,
    routing: routerReducer,
})
