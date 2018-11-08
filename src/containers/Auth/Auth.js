import React,{ Component } from "react";
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from './Auth.css';
import Aux from '../../hoc/AUX/AU';
import {checkValidity} from '../../utility/utility'
import Spinner from '../../components/UI/Spinner/Spinner'
import * as actions from '../../store/actions/index'; 
class Auth extends Component{
    state={
        controls : {
            email:{
                elementType:'input',
                elementConfig:{
                  type:'email',
                  placeholder:'Mail Address...'
                },
                validation:{
                    required:true,
                    isEmail:true
                },
                valid:false,
                touched:false,
                value:''
            },
            password:{
                elementType:'input',
                elementConfig:{
                    type:'password',
                    placeholder:'your password'
                },
                validation:{
                    required:true,
                    minlength:6
                },
                valid:false,
                touched:false,
                value:''
            }
        },
        formIsValid:false,
        isSignup:true
    }
    componentDidMount(){
        if(!this.props.BuildingBurger&& this.props.authRedirectPath !=='/'){
            this.props.onSetAuthRedirectPath()
        }
    }
    
    inputChangeHandler=(event,ele)=>{
        var updateControls = {
            ...this.state.controls,
            [ele]:{
                ...this.state.controls[ele],
                value:event.target.value,
                valid:checkValidity(event.target.value,this.state.controls[ele].validation), 
                touched:true
            }
        }
        this.setState({controls:updateControls})
    }
    submitHandler=(e)=>{
        e.preventDefault()
        this.props.onAuth(
            this.state.controls.email.value,
            this.state.controls.password,
            this.state.isSignup)
    }
    switchAuthModeHandler=()=>{
        this.setState((state)=>{
            return {isSignup:!state.isSignup}
        })
    }
    render(){
        let formElementArray = [];
        for(let key in this.state.controls){
          formElementArray.push({
            id:key,
            config:this.state.controls[key]
          })
        }
        let form =
            <Aux>
                <form onSubmit={this.submitHandler}>
                {formElementArray.map(ele=>(
                <Input
                    key={ele.id}
                    elementType={ele.config.elementType}
                    elementConfig={ele.config.elementConfig}
                    value={ele.config.value}
                    invalid={!ele.config.valid}
                    shouldValidate={ele.config.validation}
                    touched = {ele.config.touched}
                    changed={(e)=>this.inputChangeHandler(e,ele.id)}/>
                ))}
                <Button btnType='Success'>
                    {this.state.isSignup ? 'SIGNUP' : 'LOGIN' }
                    </Button>
                </form>
                    <Button 
                    btnType='Danger'
                    clicked={this.switchAuthModeHandler}
                    >SWITCH TO {this.state.isSignup ? 'SIGNIN' : 'SIGNUP' }</Button>
            </Aux>

        if(this.props.loading){
            form = <Spinner/>
        }

        let errorMessage = null
        if(this.props.error){
            errorMessage = <p className={classes.error}>{this.props.error.message}</p>
        } 

        let authRedirect = null
        if(this.props.isAuthenticate){
          authRedirect = <Redirect to={this.props.authRedirectPath}/> 
        }
        
        return (
            <div className={classes.Auth}>
                {authRedirect}
                {errorMessage}
                {form}
            </div>

        )
    }
}
const mapStateToProps = (state)=>({
    loading:state.auth.loading,
    error:state.auth.error,
    BuildingBurger:state.burger.building,
    authRedirectPath:state.auth.authRedirectPath,
    isAuthenticate:state.auth.token !== null
})
const mapDispatchToProps = (dispatch)=>({
    onAuth:(email,password,isSignup)=>dispatch(actions.auth(email,password,isSignup)),
    onSetAuthRedirectPath:()=>dispatch(actions.setAuthRedirectPath('/'))
})
export default connect(mapStateToProps,mapDispatchToProps)(Auth);