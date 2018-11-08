import * as actionTypes from '../actions/actionTypes'

const initialState = {
        loading:false,
        token:null,
        userId:null,
        error:null,
        authRedirectPath:'/'
}
const auth_Start = (state,action)=>({
        ...state,
        error:null,
        loading:true
})

const auth_Sucess = (state,action)=>({
        ...state,
        token:action.token,
        userId:action.userId,
        loading:false
})

const auth_Fail = (state,action)=>({
        ...state,
        error:action.error,
        loading:false
})

const auth_logout = (state,action)=>(
    {
        ...state,
        token:null,
        userId:null
    }
)

const setAuthRedirectPath = (state,action)=>({
        ...state,
        authRedirectPath:action.path
})
const store = (state=initialState,action)=>{
    switch(action.type){
        case actionTypes.AUTH_START             : return auth_Start(state,action)
        case actionTypes.AUTH_SUCCESS           : return auth_Sucess(state,action)
        case actionTypes.AUTH_FAIL              : return auth_Fail(state,action)
        case actionTypes.AUTH_LOGOUT            : return auth_logout(state,action)
        case actionTypes.SET_AUTH_REDIRECT_PATH : return setAuthRedirectPath(state,action)
        default                                 : return state
    }
}

export default store;