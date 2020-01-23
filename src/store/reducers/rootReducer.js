import authReducer from './authReducer'
import postReducer from './postReducer'
import profileReducer from './profileReducer'
import {combineReducers} from 'redux'
import {firestoreReducer} from 'redux-firestore'
import {firebaseReducer} from 'react-redux-firebase'

const rootReducer = combineReducers({
    auth: authReducer,
    post: postReducer,
    profile: profileReducer,
    firestore: firestoreReducer,
    firebase: firebaseReducer
})

export default rootReducer