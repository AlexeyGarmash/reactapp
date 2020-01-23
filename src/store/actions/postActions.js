import {CREATE_POST, CREATE_POST_ERROR}from '../constants'

export const createPost = (post) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        //make call DB
        const firestore = getFirestore()
        const profile = getState().firebase.profile
        const authorId = getState().firebase.auth.uid
        firestore.collection('posts').add({
            ...post,
            authorFirstName: profile.firstName,
            authorLastName: profile.lastName,
            authorId: authorId,
            createdAt: new Date()
        }).then(() => {
            dispatch({type: CREATE_POST, post})
        }).catch((err) => {
            dispatch({type: CREATE_POST_ERROR, err})
        })
    }
}

export const getPostAuthor = (uid) => {
    return(dispatch, getState, {getFirestore}) => {
        const firestore = getFirestore()
        firestore.collection('users').doc(uid).get()
        .then((userData) => {
            dispatch({type: 'POST_AUTHOR_SUCCESS', user:userData.data()})
        })
        .catch((err) =>{
            console.log(err.message)
        })
    }
}