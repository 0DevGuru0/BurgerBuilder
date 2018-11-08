import axios from '../../axios_orders';
import {put} from 'redux-saga/effects';
import * as actions from '../actions/index';

export function* initIngredientsSaga(){
    try{
        const res = yield axios.get('https://burger-cf798.firebaseio.com/ingredients.json')
        yield put(actions.setIngredients(res.data))
    }catch(err){
        yield put(actions.fetchIngredientsFailed())
    }
}