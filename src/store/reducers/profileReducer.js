import {PROFILE_EDIT_ERROR, PROFILE_EDIT_SUCCESS,
    PROFILE_GET_ERROR, PROFILE_GET_SUCCESS} from '../constants'

const initState = {
    editError: null,
    getError: null,
    profile: null
}

const profileReducer = (state = initState, action) => {
    switch (action.type) {
        case PROFILE_EDIT_SUCCESS:
            return {
                ...state,
                editError: null
            }
        case PROFILE_EDIT_ERROR:
            return {
                ...state,
                editError: action.err.message
            }
        case PROFILE_GET_ERROR:
            console.log('get profile error ' + action.err.message)
            return {
                ...state,
                getError: action.err.message
            }
        case PROFILE_GET_SUCCESS:
            console.log('get profile success ' + action.profile)
            return {
                ...state,
                getError: null,
                profile: action.profile
            }
    
        default:
            return state
    }
}

export default profileReducer