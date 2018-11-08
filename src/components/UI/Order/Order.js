import React from 'react';
import classes from './Order.css';
const order = (props)=>{
  const ingredients = []
  for(let ingred in props.ingredients){
    ingredients.push({
      name:ingred,
      amount:props.ingredients[ingred]
    })
  }
const output = ingredients.map(ingred=>(
    <span 
      style={{
        textTransform:'Capitalize',
        display:'inline-block',
        margin:'0 8px',
        border:'1px solid #ccc',
        padding:'5px',
        borderRadius:'5px',
        background:'deepskyblue',
        color:'white',
        fontWeight:'bolder'
      }} 
      key={ingred.name}
      >{ingred.name}:[{ingred.amount}] </span>
  ))
console.log(output)

  return(
    <div className={classes.Order}>
      <p>ingredients: ({output})</p>
      <p>Price:<strong>USD {parseFloat(props.price).toFixed(2)}</strong></p>
    </div>
  )
}
export default order