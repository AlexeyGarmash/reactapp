import React, { Component } from 'react'
import {connect} from 'react-redux'
import {getPostAuthor} from '../../store/actions/postActions'

export class PostedBy extends Component {

    componentWillMount() {
        console.log(this.props)
        this.props.getPostAuthor(this.props.uid)
    }

    componentDidUpdate(prevProps, prevState) {
        if(prevProps.user !== this.props.user){
            console.log('props updated')
            console.log(this.props)
        }
    }
    
    render() {
        const {user} = this.props
        if(user)
            return (
                <p>Posted by the { user.firstName  } { user.lastName }</p>
            )
        else
        return (
            <p>User loading...</p>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        user: state.post.user
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getPostAuthor: (uid) => dispatch(getPostAuthor(uid))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostedBy)