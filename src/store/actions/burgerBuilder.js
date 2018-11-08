import * as actionTypes from './actionTypes';

export const
    addIngredient = (ingName)=>(
        {
            type: actionTypes.ADD_INGREDIENT,
            ingredientName: ingName
        }
    ),
    removeIngredient = (ingName)=>(
        {
            type: actionTypes.REMOVE_INGREDIENT,
            ingredientName: ingName
        }
    ),
    setIngredients = (ingredients)=>(
        {
            type:actionTypes.SET_INGREDIENTS,
            ingredients:ingredients
        }
    ),
    fetchIngredientsFailed=()=>(
        {
            type:actionTypes.FETCH_INGREDIENTS_FAILED
        }
    ),
    initIngredients = ()=>(
        {
            type:actionTypes.INIT_INGREDIENTS
        }
    )