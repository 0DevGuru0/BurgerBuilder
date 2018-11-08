import { put,call } from "redux-saga/effects";
import { delay } from "redux-saga";
import * as actionTypes from './../actions/actionTypes';
import * as actions from '../actions/index'
import axios from 'axios';

export function* logoutSaga(action){
    yield call([sessionStorage,'removeItem'],'token')
    yield call([sessionStorage,'removeItem'],'expirationDate')
    yield call([sessionStorage,'removeItem'],'userId')
    yield put({type:actionTypes.AUTH_LOGOUT})
}
export function* checkAuthTimeoutSaga(action){
    yield delay(action.expirationTime*1000);
    yield put(actions.logout());
}
export function* authUserSaga(action){
    yield put(actions.authStart());
    const authData = {
        email            : action.email,
        password         : action.password.value,
        returnSecureToken: true
    }

    let url ="https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyAACxhZ8KdLaF-vWl-zO_f4OJKXgMBWkKU";
    if(!action.isSingup){
        url ="https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyAACxhZ8KdLaF-vWl-zO_f4OJKXgMBWkKU";
    }

    try{
        const res = yield axios.post(url,authData)
        let expirationDate = yield new Date(
            new Date().getTime() + res.data.expiresIn *1000
        );

        yield sessionStorage.setItem('token',res.data.idToken)
        yield sessionStorage.setItem('expirationDate',expirationDate)
        yield sessionStorage.setItem('userId',res.data.localId)
        yield put(actions.authSuccess(res.data.idToken,res.data.localId))
        yield put(actions.checkAuthTimeout(res.data.expiresIn))
    }catch(err){
        yield put(actions.authFail(err.response.data.error))
    }
}
export function* authCheckStateSaga (action){
    const token = yield sessionStorage.getItem('token')
    if(!token){
        yield put(actions.logout())
    }else{
        const expirationDate = yield new Date(sessionStorage.getItem('expirationDate'))
        if(expirationDate <= new Date()){
            yield put(actions.logout())
        }else{
            const userId = yield sessionStorage.getItem('userId')
            yield put(actions.authSuccess(token,userId));
            yield put(actions.checkAuthTimeout(
                ( expirationDate.getTime() - new Date().getTime() ) / 1000
            ))
        }
    }
}

