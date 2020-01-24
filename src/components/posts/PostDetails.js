import React from 'react'
import {connect} from 'react-redux'
import {firestoreConnect} from 'react-redux-firebase'
import {compose} from 'redux'
import {Redirect} from 'react-router-dom'
import moment from './momentConf'
import PostedBy from './PostedBy'
import Likes from './Likes'

const PostDetails = (props) => {
    const {post, auth, postId} = props
    if(!auth.uid) return <Redirect to='/signin'/>
    //console.log(post)//
    if(post){
        console.log(post)
        return (
            <div className="container section post-details">
                <div className="card z-depth-0">
                    <div className="card-content">
                        <span className="card-title">{post.title}</span>
                        <p>{post.content}</p>
                    </div>
                    <div className="card-action gret lighten-4 grey-text">
                        <div><PostedBy uid={post.authorId}/></div>
                        <div>{moment(post.createdAt.toDate()).calendar()}</div>
                        <Likes post={post} postId={postId} />
                            
                        
                    </div>
                </div>
            </div>
    )}
    else 
    return (
        <div className="container center">
            <p>Loading post...</p>
        </div>
    )
}

const mapStateToProps = (state, ownProps) => {
    //console.log(state)
    const id = ownProps.match.params.id
    const posts = state.firestore.data.posts
    const post = posts ? posts[id] : null
    //console.log(post)
    return {
        post: post,
        postId: id,
        auth: state.firebase.auth
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        {collection: 'posts'}
    ])
)(PostDetails)
