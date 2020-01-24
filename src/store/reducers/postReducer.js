import { CREATE_POST, CREATE_POST_ERROR} from '../constants'

const initState = {
    posts: [
        
    ],
    user: null,
    like: false
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
        case 'LIKE_SET_SUCCESS':
            console.log('like set successful')
            return {
                ...state,
                like: action.like
            }

        case 'LIKE_SET_ERROR':
            console.log('like set error')
            return state

        case 'LIKE_OUT_SUCCESS':
            console.log('like out successful')
            return {
                ...state,
                like: action.like
            }

        case 'LIKE_OUT_ERROR':
            console.log('like out error')
            return state

        default:
            return state;
    }
}

export default postReducer
