import React, { Component } from 'react'
import {setLikeOnly} from '../../store/actions/postActions'
import {connect} from 'react-redux'

const btnLikeNeutral = {
    color: "grey",
  };

const btnLikeSet = {
    color: "red",
  };

export class Likes extends Component {

    state = {
        isLiked: false
    }

    componentWillMount() {
        console.log('componentWillMount')
        this.props.setLike(this.props.postId, false)
    }
    
    componentDidUpdate(prevProps, prevState) {
        
        if(prevState.isLiked !== this.props.isLiked){
            this.setState({isLiked:this.props.isLiked})
            console.log('componentDidUpdate')
        }
    }

    setLikeOrDislike = (e) => {
        //e.preventDefault()
        console.log('like clicked')
        this.props.setLike(this.props.postId, true)
    }

    render() {
        const likesCount = this.props.post.likes.length
        const isLiked = this.props.isLiked
        //console.log(this.props.post.likes.length)
        return (
            <div className="row">
                <div className="col s1 offset-s11"><a onClick={this.setLikeOrDislike}><i className="fa fa-thumbs-up small" style={this.state.isLiked?btnLikeSet:btnLikeNeutral}/> {likesCount}</a></div>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setLike: (postId, setupLike) => dispatch(setLikeOnly(postId, setupLike))
    }
}

const mapStateToProps = (state) => {
    return {
        isLiked : state.post.like
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Likes)