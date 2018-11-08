import * as actions from '../actions/index';
import axios from '../../axios_orders';
import {put} from 'redux-saga/effects';

export function* purchaseBurgerSaga(action){
    try{
        yield put(actions.purchaseBurgerStart())
        const res  = yield axios.post('/orders.json?auth='+action.token,action.order)
        yield put(actions.purchaseBurgerOrdered())
        yield put(actions.purchaseBurgerSuccess(res.data.name,action.order))

    }catch(err){
        yield put(actions.purchaseBurgerFail(err))
    }
}

export function* fetchOrdersSaga(action){
    try{
        yield put(actions.fetchOrdersStart());
        const queryParams = '?auth=' +action.token + '&orderBy="userId"&equalTo="' + action.userId + '"';
        const res = yield axios.get( '/orders.json' + queryParams)
        const fetchedOrders = [];
        for ( let key in res.data ) {
            fetchedOrders.push({...res.data[key],id: key});
        }
        yield put(actions.fetchOrdersSuccess(fetchedOrders));
    }catch(err){
        yield put(actions.fetchOrdersFail(err));
    }
};