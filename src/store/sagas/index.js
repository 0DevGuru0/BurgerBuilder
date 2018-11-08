import { takeEvery, all } from "redux-saga/effects";
import { takeLatest } from "redux-saga/effects";

import * as actionTypes from '../actions/actionTypes';

import {
    logoutSaga,
    checkAuthTimeoutSaga,
    authUserSaga,
    authCheckStateSaga  } from "./auth";

import {
    purchaseBurgerSaga,
    fetchOrdersSaga     } from './order';

import {
    initIngredientsSaga } from './burgerBuilder';

export function* watchAuth(){
    //all method make generators run simultaneously
    yield all([
        takeEvery(actionTypes.AUTH_CHECK_TIMEOUT   , checkAuthTimeoutSaga ),
        takeEvery(actionTypes.AUTH_INITIATE_LOGOUT , logoutSaga           ),
        takeEvery(actionTypes.AUTH_USER            , authUserSaga         ),
        takeEvery(actionTypes.AUTH_CHECK_STATE     , authCheckStateSaga   )
    ])
}
export function* watchOrder(){
    yield all([
        takeLatest(actionTypes.ORDER_PURCHASE_BURGER , purchaseBurgerSaga ),
        takeEvery(actionTypes.FETCH_ORDERS           , fetchOrdersSaga )
    ])
}
export function* watchBurger(){
    yield takeEvery(actionTypes.INIT_INGREDIENTS     , initIngredientsSaga )
}
