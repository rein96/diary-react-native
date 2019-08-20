import { combineReducers, createStore, compose } from 'redux'

const initialState = {
    uid: '',
    email : ''
}

const authReducer = (state = initialState , action) => {
    switch(action.type) {
        case 'LOGIN_SUCCESS':
            return {
                uid:action.payload.uid,
                email: action.payload.email
            }

        case 'LOGOUT' : 
            return {
                uid : '',
                email : ''
            }

        default :
            return state;
    }
}

// Redux Dev Tools Setup on React-Native-Debugger
let composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
// window.blabla = development process, kalo gak lagi dev = compose

const reducers = combineReducers({
    auth: authReducer
})

//
const STORE = createStore(reducers, composeEnhancers() )

export default STORE