import {CREATE_POST, CREATE_POST_ERROR}from '../constants'

export const createPost = (post) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        //make call DB
        const firestore = getFirestore()
        const profile = getState().firebase.profile
        const authorId = getState().firebase.auth.uid
        firestore.collection('posts').add({
            ...post,
            authorId: authorId,
            createdAt: new Date(),
            likes:[]
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

export const setLikeOnly = (postId, setupLike) => {
    return(dispatch, getState, {getFirebase, getFirestore}) => {
        const firestore = getFirestore()
        const firebase = getFirebase()
        const uid = getState().firebase.auth.uid
        //console.log('author id = '+ uid)

        

        firestore.collection('posts').doc(postId).get()
        .then((postSnap) => {
            var likesArr = postSnap.get('likes')
            var isLikeSet = false

            for (let i = 0; i < likesArr.length; i++) {
                const userId = likesArr[i];
                if(userId === uid){
                    isLikeSet = true
                    break
                }
            }

            if(!isLikeSet){
                if(setupLike){
                    postSnap.ref.update({
                        likes: firebase.firestore.FieldValue.arrayUnion(uid)
                    })
                    .then(()=>{
                        dispatch({type: 'LIKE_SET_SUCCESS', like:true})
                    })
                    .catch((err)=> {
                        dispatch({type: 'LIKE_SET_ERROR', err})
                    })
                }
                else{
                    dispatch({type: 'LIKE_SET_SUCCESS', like:false})
                }
            }
            else{
                if(setupLike){
                    postSnap.ref.update({
                        likes: firebase.firestore.FieldValue.arrayRemove(uid)
                    })
                    .then(()=>{
                        dispatch({type: 'LIKE_OUT_SUCCESS', like:false})
                    })
                    .catch((err)=> {
                        dispatch({type: 'LIKE_OUT_ERROR', err})
                    })
                }
                else{
                    dispatch({type: 'LIKE_SET_SUCCESS', like:true})
                }
            }

        })
        /*post.update({
            likes: firebase.firestore.FieldValue.arrayUnion(uid)
        })
        .then(()=>{
            dispatch({type: 'LIKE_SET_SUCCESS'})
        })
        .catch((err)=> {
            dispatch({type: 'LIKE_SET_ERROR', err})
        })*/
    }
}