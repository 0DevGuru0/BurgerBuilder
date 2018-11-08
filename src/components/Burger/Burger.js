import React from 'react';
import {withRouter} from 'react-router-dom';
import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredients/BurgerIngredient';

const burger = (props) => {

  let Ingredients = Object.keys(props.ingredients)
    .map(Ing => (
        [...Array(props.ingredients[Ing])]
        .map((j, i) =>(
          <BurgerIngredient key = {Ing + i} type = {Ing} />
      ))
    ))
    .reduce(
      (arr,el)=>arr.concat(el),
      []
    );


    if(Ingredients.length === 0){
      Ingredients= <p>Please start adding ingredients.</p>
    }
  // console.log(Ingredients)
    //can import array in return section reat convert it dynamically
  return (<div className = {classes.Burger}>
    <BurgerIngredient type = "bread-top" />
    {Ingredients}
    <BurgerIngredient type = "bread-bottom" />
    </div>
  );
};
export default withRouter(burger);
