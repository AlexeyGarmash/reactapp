import { CREATE_POST, CREATE_POST_ERROR} from '../constants'

const initState = {
    posts: [
        
    ],
    user: null
}

const postReducer = (state = initState, action) => {
    switch (action.type) {
        case CREATE_POST:
            console.log('created post', action.post)
            return state;

        case CREATE_POST_ERROR:
            console.log('created post ERROR', action.err)
            return state;
        
        case 'POST_AUTHOR_SUCCESS':
            const userData = action.user
            console.log('get post author success ' + userData)
            return {
                ...state,
                user: action.user
            }

        default:
            return state;
    }
}

export default postReducer
