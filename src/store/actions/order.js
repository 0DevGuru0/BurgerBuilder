import * as actionsType from '../actions/actionTypes'

export const purchaseBurgerSuccess = (id,orderData)=>(
    {
        type:actionsType.PURCHASE_BURGER_SUCCESS,
        orderId:id,
        orderData:orderData
    }
)
export const purchaseBurgerFail = (err)=>(
    {
        type:actionsType.PURCHASE_BURGER_FAIL,
        error:err
    }
)
export const purchaseBurgerStart  = ()=>(
    {
        type:actionsType.PURCHASE_BURGER_START
    }
)
export const purchaseBurgerOrdered  = ()=>(
    {
        type:actionsType.PURCHASE_BURGER_ORDERED
    }
)
export const purchaseBurger = (order,token)=>(
    {
        type:actionsType.ORDER_PURCHASE_BURGER,
        order,
        token
    }
)
export const fetchOrdersSuccess =(orders)=>(
    {
        type:actionsType.FETCH_ORDERS_SUCCESS,
        orders:orders
    }
)
export const fetchOrdersFail =(err)=>(
    {
        type:actionsType.FETCH_ORDERS_FAIL,
        error:err
    }
)
export const fetchOrdersStart = ()=>(
    {
        type:actionsType.FETCH_ORDERS_START
    }
)
export const fetchOrders = (token, userId) => (
    {
        type:actionsType.FETCH_ORDERS,
        token,
        userId
    }
)