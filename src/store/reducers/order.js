import * as actionTypes  from '../actions/actionTypes' 
const initialState = {
    order:[],
    loading:false,
    ordered:false
}
const purchaseBurgerSuccess = (state,action)=>{
    const newOrder={
        ...action.orderData,
        id:action.orderId
    }
    return {
        ...state,
        loading:false,
        order:state.order.concat(newOrder)
    }
}
const purchaseBurgerFail = (state,action)=>(
    {
        ...state,
        loading:false
    }
)
const purchaseBurgerStart = (state,action)=>(
    {
        ...state,
        loading:true
    }
)
const purchaseBurgerOrdered = (state,action)=>(
    {
        ...state,
        ordered:true
    }
)
const fetchOrdersSuccess = (state,action)=>(
    {
        ...state,
        order:action.orders,
        loading:false
    }
)
const fetchOrdersStart =(state,action)=>(
    {
        ...state,
        loading:true
    }
)
const fetchOrdersFail = (state,action)=>(
    {
        ...state,
        loading:false
    }
)
const Order = (state=initialState,action)=>{
    switch(action.type){
        case actionTypes.PURCHASE_BURGER_SUCCESS : return purchaseBurgerSuccess   (state,action)
        case actionTypes.PURCHASE_BURGER_FAIL    : return purchaseBurgerFail      (state,action)
        case actionTypes.PURCHASE_BURGER_START   : return purchaseBurgerStart     (state,action)
        case actionTypes.PURCHASE_BURGER_ORDERED : return purchaseBurgerOrdered   (state,action)
        case actionTypes.FETCH_ORDERS_SUCCESS    : return fetchOrdersSuccess      (state,action)
        case actionTypes.FETCH_ORDERS_START      : return fetchOrdersStart        (state,action)
        case actionTypes.FETCH_ORDERS_FAIL       : return fetchOrdersFail         (state,action)
        default                                  : return state;
    }
}

export default Order;