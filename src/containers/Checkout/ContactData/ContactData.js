import React,{Component} from 'react';
import {connect} from 'react-redux';
import classes from './ContactData.css';
import { withRouter} from 'react-router-dom'
import Button from  '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import {checkValidity} from '../../../utility/utility'
import * as actionCreators from '../../../store/actions/index'
class ContactData extends Component{
  state={
    orderForm:{
      name:{
        elementType:'input',
        elementConfig:{
          type:'text',
          placeholder:'Your Name'
        },
        validation:{
            required:true,
        },
        valid:false,
        touched:false,
        value:''
      },
      street:{
        elementType:'input',
        elementConfig:{
          type:'text',
          placeholder:'Street'
        },
        validation:{
            required:true,
        },
        valid:false,
        touched:false,
        value:''
      },
      Zipcode:{
       elementType:'input',
       elementConfig:{
         type:'text',
         placeholder:'Zipcode'
       },
       validation:{
           required:true,
           minlength:5,
           maxlength:6
       },
       valid:false,
       touched:false,
       value:''
      },
      country:{
        elementType:'input',
        elementConfig:{
          type:'text',
          placeholder:'Country'
        },
        validation:{
            required:true,
        },
        valid:false,
        touched:false,
        value:''
      },
      email:{
        elementType:'input',
        elementConfig:{
          type:'email',
          placeholder:'Your Email'
        },
        validation:{
            required:true,
        },
        valid:false,
        touched:false,
        value:''
      },
      deliveryMethod:{
        elementType:'select',
        elementConfig:{
          options:[
            {value:'fastest',displayValue:'Fastest'},
            {value:'cheapest',displayValue:'Cheapest'},
          ]
        },
        value:'Fastest',
        validation:{},
        valid:true
      }
    },
    formIsValid:false,
  }
  clearFormHandler(){
    //clone original orderForm into one variable(form_data)
    const form_data = {
      ...this.state.orderForm
    }
    //clone the object inside the each original orderForm(form_data_element)
    //loop through the form_data and find value of each object init and replace with ''
    //if inputtype is select replace value with first option value inside select input.
    for(let key in form_data){
      let form_data_element = {
        ...this.state.orderForm[key]
      }
      if(form_data_element.elementType === 'select'){
          form_data_element.value = form_data_element.elementConfig.options[0].value
      }else{
        form_data_element.value = '';
      }
      form_data[key] = form_data_element
    }
    //use setstate to replace form_data with original orderForm
    this.setState({orderForm:form_data})  
  }
  orderHandler=(e)=>{
    e.preventDefault()
     const formData={}
     for(let key in this.state.orderForm){
       formData[key]=this.state.orderForm[key].value 
     }
    const order ={
      ingredients:this.props.ings,
      price:this.props.totalPrice,
      orderTime:new Date(),
      orderData:formData,
      userId:this.props.userId
    }
    this.clearFormHandler()
    this.props.onOrderBurger(order,this.props.token)
  }  
  homePagehandler=()=>{
    this.props.history.replace('/')
  }
  orderManageHandler=()=>{
    this.props.history.replace('/Orders')
  }
  inputChangeHandler=(e,ele)=>{
    const updatedOrderForm={
      ...this.state.orderForm
    }
    const updateFormElement={
      ...updatedOrderForm[ele],
      value   : e.target.value,
      valid   : checkValidity(e.target.value,updatedOrderForm[ele].validation),
      touched : true
    }
    updatedOrderForm[ele] = updateFormElement
    let formIsValid = true;
    for(let ele in updatedOrderForm){
      formIsValid = updatedOrderForm[ele].valid && formIsValid
    }
    this.setState({ orderForm:updatedOrderForm , formIsValid:formIsValid })
  }
  
  render(){
    let formElementArray = [];
    for(let key in this.state.orderForm){
      formElementArray.push({
        id:key,
        config:this.state.orderForm[key]
      })
    }
    
    let form =(
      <form>
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
      </form>
    )  
    if(this.props.loading){form = <Spinner/>}

    let butt =<Button 
      btnType='Success' 
      clicked={(e)=>this.orderHandler(e)}
      disabled={!this.state.formIsValid} >ORDER</Button>
   
    if(this.props.ordered){
      butt = (
        <span>
          <p className={classes.success}>Ordered Successfully</p>
          <Button btnType="Success" clicked={this.homePagehandler}>NEW BURGER</Button>
          <Button btnType="Success" clicked={this.orderManageHandler}>MANAGE ORDERS</Button>
        </span>  
      )
    }
    return (
      <div className={classes.ContactData}>
        <h4>Enter your Contact Data</h4>
        {form}
        {butt}
      </div>
    )
  }
}
const mapStateToProps= state =>({
  ings:state.burger.ingredients,
  totalPrice:state.burger.totalPrice,
  loading:state.order.loading,
  ordered:state.order.ordered,
  token:state.auth.token,
  userId:state.auth.userId
})

const mapDispatchToProps = (dispatch)=>({
  onOrderBurger : (order,token)=> dispatch (actionCreators.purchaseBurger(order,token)),
  onresetOrdered: ()           => dispatch (actionCreators.resetOrdered()             )
})

export default connect(mapStateToProps,mapDispatchToProps)(withRouter(ContactData));

