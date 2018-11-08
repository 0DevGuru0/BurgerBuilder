import React from 'react';
import Aux from '../../../hoc/AUX/AU';
import Button from '../../UI/Button/Button';
//normal function
const orderSummary = (props)=>{
  const ingredientSummary = Object.keys(props.ingredients)
    .map(igkey=>{
      return (
        <li key={igkey}>
          <span style={{textTransform:'capitalize'}}>
           {igkey} : {props.ingredients[igkey]}
          </span>
        </li>
      )
    })
    return (
      <Aux>
      <h3 style={{fontFamily: 'Baloo Tammudu'}}>Your Order</h3>
      <p>A delicious burger with the following ingredients:</p>
      <ul>
        {ingredientSummary}
      </ul>
      <p><strong>Total Price: <span style={{color:'red'}}>{props.price.toFixed(2)} $</span></strong></p>
      <p>Continue to Checkout?</p>
      <Button btnType='Danger' clicked={props.purchaseCancelled}>CANCEL</Button>
      <Button btnType='Success' clicked={props.purchaseContinued}>CONTINUE</Button>
      </Aux>
      
      
    )
}
export default orderSummary;