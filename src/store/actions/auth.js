import * as actionTypes from './actionTypes';

//Sync action section________________________________
export const authStart=()=>(
    {
        type:actionTypes.AUTH_START
    }
),
authSuccess=(token,userId)=>(
    {
        type:actionTypes.AUTH_SUCCESS,
        token:token,
        userId:userId
    }
),
authFail=(error)=>(
    {
        type:actionTypes.AUTH_FAIL,
        error:error
    }
),
logout = ()=>(
    {
        type:actionTypes.AUTH_INITIATE_LOGOUT
    }
),
setAuthRedirectPath = (path)=>(
    {
        type:actionTypes.SET_AUTH_REDIRECT_PATH,
        path:path
    }
),
//Async action section________________________________
checkAuthTimeout = (expirationTime)=>(
    {
        type:actionTypes.AUTH_CHECK_TIMEOUT,
        expirationTime:expirationTime
    }
)
,auth = (email,password,isSingup)=>(
    {
        type:actionTypes.AUTH_USER,
        email:email,
        password:password,
        isSingup:isSingup
    }
),
authCheckState=()=>(
    {
        type:actionTypes.AUTH_CHECK_STATE
    }
)