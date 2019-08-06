import React, {Component} from 'react'
import {orderHistoryThunk} from '../store/order'
import {connect} from 'react-redux'

class orderHistory extends Component {
  componentDidMount() {
    // let userId = this.props.orders[0].userId
    this.props.orderHistory(userId)
  }

  render() {
    // console.log(this.props)
    return (
      <div className="orderHistory">
        <h1>Order History</h1>
        <div className="column-display" />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {orders: state.orders}
}

const mapDispatchToProps = dispatch => {
  return {
    orderHistoryThunk: id => {
      dispatch(orderHistoryThunk(id))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(orderHistory)
