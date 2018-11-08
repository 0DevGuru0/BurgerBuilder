import React, {Component} from 'react';
import Order from '../../../components/UI/Order/Order';
import axios from '../../../axios_orders'
import Spinner from '../../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler'
import {connect} from 'react-redux';
import * as actionCreaters from '../../../store/actions/index';
class orders extends Component{
  componentDidMount(){
    this.props.onFetchOrders(this.props.token,this.props.userId)
  }
  render(){
    console.log(this.props)
  let orders = this.props.orders.map(order=>(    
    <Order key={order.id} {...order}/>
  ))
  if(this.props.loading){
    orders=<Spinner/>
  }
    return(
      <div>
        {orders}
      </div>
    )
  }
}
const mapStateToProps = (state)=>({
  token:state.auth.token,
  orders:state.order.order,
  loading:state.order.loading,
  userId:state.auth.userId
})
const mapDispatchToProps = (dispatch)=>({
  onFetchOrders:(token,userId)=>dispatch(actionCreaters.fetchOrders(token,userId))
})

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(orders,axios));