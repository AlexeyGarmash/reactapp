import React from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import { Component } from 'react'
import {editProfile, retreviewProfile} from '../../store/actions/profileActions'

export class ProfileDetails extends Component {

    state = {
        firstName: '',
        lastName: ''
    }
    
    /*componentDidUpdate(prevProps, prevState) {
        //this.props.retreviewProfile()
        const prof = prevProps.profile
        console.log(prof)
        this.setState({
            firstName: prof.firstName,
            lastName: prof.lastName
        })
    }*/
    

    componentDidMount() {
        
        
    }

    componentDidUpdate(prevProps, prevState) {
        console.log('component did update')
        //console.log(this.props.profile.firstName + ' from component')
        if (this.props.profile.firstName !== prevProps.profile.firstName ){
            this.setState({
                firstName: this.props.profile.firstName,
                lastName: this.props.profile.lastName
            })
        }
        
    }
    componentWillMount() {
        //this.props.retreviewProfile()
        console.log(this.props.profile)
        this.setState({
            firstName: this.props.profile.firstName,
            lastName: this.props.profile.lastName
        })
        
    }
    
    

    handleSubmit = (e) => {
        e.preventDefault()
        //console.log(this.state)
        //this.props.signUp(this.state)
        this.props.saveChanges(this.state)
        this.props.history.push('/')
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    render() {
        console.log('render run')
        const {auth, profile, editError} = this.props
        if(!auth.uid) return <Redirect to='/signin'/>
        
        //console.log(post)
        if(profile){
            
            return (
                <div className="container">
                <form onSubmit={this.handleSubmit} className="white">
                    <h5 className="grey-text text-darken-3">Profile details</h5>
                    <div className="input-field">
                        <input id="disabled" className="validate" disabled type="email" value={auth.email} />
                        <label htmlFor="disabled" className="active">Email</label>
                    </div>
                    <div className="input-field">
                        <label className="active" htmlFor="firstName">First name</label>
                        <input type="text" id="firstName" value={this.state.firstName} onChange={this.handleChange}/>
                    </div>
                    <div className="input-field">
                        <label className="active" htmlFor="lastName">Last name</label>
                        <input type="text" id="lastName" value={this.state.lastName}  onChange={this.handleChange}/>
                    </div>
                    <div className="input-field">
                        <button className="btn pink lighten-1 z-depth-0">Save</button>
                        <div className="red-text center">
                            {editError ? <p> {editError} </p> : null}
                        </div>
                    </div>
                </form>
            </div>
        )
    }
        else 
        return (
            <div className="container center">
                <p>Loading profile...</p>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
        profile: state.firebase.profile,
        //profile: state.profile,
        editError: state.profile.editError
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        saveChanges : (user) => dispatch(editProfile(user)),
        retreviewProfile: () =>dispatch(retreviewProfile())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileDetails)
