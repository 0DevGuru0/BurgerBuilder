import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import Aux from '../../hoc/AUX/AU';
import axios from '../../axios_orders';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'; 
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import * as actionCreators from '../../store/actions/index';


export class BurgerBuilder extends PureComponent {
  state = {
    purchasing:false
  }
  componentWillMount(){
   this.props.onIngredientInit()
  }
  updatePurchaseState(ingredients) {
    const sum = Object.keys(ingredients)
      .map(key => ingredients[key])
      .reduce((sum, el) => {
        return sum + el;
      }, 0)
      return sum > 0
  }
  purchaseHandler =()=>{
    if(this.props.isAuthenticate){
      this.setState({purchasing:true})
    }else{
      this.props.onSetAuthRedirectPath('/checkout')
      this.props.history.push('/login')
    }
  }
  purchaseCancelHandler = ()=>{
    this.setState({purchasing:false})
  }
  purchaseContinueHandler=()=>{
    this.props.history.push('/checkout')
  }

  render() {
    const disabledInfo = {...this.props.ings}
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    let burger = this.props.error
        ? <p style={{textAlign:"center"}}>Ingredients can't loaded!</p>
        : <Spinner/>;
    let orderSummary = null

    if(this.props.ings){
        burger = (
          <Aux>
            <Burger ingredients = {this.props.ings}/>
            <BuildControls
                ingredientAdded   = {this.props.onIngredientAdded}
                ingredientRemoved = {this.props.onIngredientRemoved}
                purchaseble       = {this.updatePurchaseState(this.props.ings)}
                orderd            = {this.purchaseHandler}
                disabled          = {disabledInfo}
                isAuth            = {this.props.isAuthenticate}
                price             = {this.props.totalPrice}
            />
          </Aux>
        )
        orderSummary = <OrderSummary
          ingredients       = {this.props.ings}
          price             = {this.props.totalPrice}
          purchaseCancelled = {this.purchaseCancelHandler}
          purchaseContinued = {this.purchaseContinueHandler}/>;
    }
    return (
      <Aux>
          <Modal
            show={this.state.purchasing}
            modalClosed={this.purchaseCancelHandler}>
            {orderSummary}
          </Modal>
          {burger}
      </Aux>
    );
  }
}
const mapStateToProps = state=>({
  ings           : state.burger.ingredients,
  totalPrice     : state.burger.totalPrice,
  error          : state.burger.error,
  isAuthenticate : state.auth.token !== null
})
const mapDispatchToProps = dispatch => ({
  onIngredientAdded     : (ingName) => dispatch(actionCreators.addIngredient(ingName))    ,
  onIngredientRemoved   : (ingName) => dispatch(actionCreators.removeIngredient(ingName)) ,
  onIngredientInit      : ()        => dispatch(actionCreators.initIngredients())         ,
  onSetAuthRedirectPath : (path)    => dispatch(actionCreators.setAuthRedirectPath(path))
})

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(BurgerBuilder,axios));
