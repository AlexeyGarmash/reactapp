import {PROFILE_EDIT_SUCCESS, PROFILE_EDIT_ERROR, PROFILE_GET_ERROR, PROFILE_GET_SUCCESS} from '../constants'

export const editProfile = (user) => {
    return (dispatch, getState, {getFirestore}) => {
        const firestore = getFirestore()
        const uid = getState().firebase.auth.uid
        firestore.collection('users').doc(uid).set({
            firstName: user.firstName,
            lastName: user.lastName,
            initials: user.firstName[0] + user.lastName[0]
        }).then(() => {
            dispatch({type:PROFILE_EDIT_SUCCESS})
        }).catch((err) => {
            dispatch({type:PROFILE_EDIT_ERROR, err})
        })
    }
}


export const retreviewProfile = () => {
    return (dispatch, getState, {getFirestore}) => {
        /*const uid = getState().firebase.auth.uid
        console.log('current uid = ' + uid)
        const firestore = getFirestore()
        firestore.collection('users').doc(uid).get()
        .then((profile) =>{
            dispatch({type:PROFILE_GET_SUCCESS, profile})
        }).catch((err)=>{
            dispatch({type:PROFILE_GET_ERROR, err})
        })*/
        const profile = getState().firebase.profile
        console.log(profile + ' from prof acions')
        dispatch({type:PROFILE_GET_SUCCESS, profile})
        //console.log(profile + ' from prof acions')
        //dispatch({type:PROFILE_GET_SUCCESS, profile})
        
    }
}