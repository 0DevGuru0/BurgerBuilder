import React,{Component} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import * as action from '../../../store/actions/index'
class logout extends Component{
    componentDidMount(){
        this.props.onLogOut()
    } 
    render(){
        return(
            <Redirect to='/'/>
        )
    }
} 
const mapDispatchTOProps = (dispatch)=>{
    return{
        onLogOut:()=>dispatch(action.logout())
    }
}
export default connect(null,mapDispatchTOProps)(logout);