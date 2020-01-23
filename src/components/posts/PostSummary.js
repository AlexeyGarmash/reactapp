import React from 'react'
import moment from './momentConf'
import PostedBy from './PostedBy'

const PostSummary = ({post}) => {
    console.log(post.authorId)
        return(
            <div className="card z-depth-0 post-summary">
                <div className="card-content grey-text text-darken-3">
                    <span className="card-title">{post.title}</span>
                    <PostedBy uid={post.authorId}/>
                    <p className="grey-text">{moment(post.createdAt.toDate()).calendar()}</p>
                </div>
            </div>
        )
}



export default PostSummary