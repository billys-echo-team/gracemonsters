import axios from 'axios'
import history from '../history'

const ORDER_HIST = 'ORDER_HIST'

const orderHistory = user => ({
  type: ORDER_HIST,
  user
})

export const orderHistoryThunk = id => async dispatch => {
  const orderHistory = await axios.get(`api/orders/${id}`)
}

const reducer = (orders = [], action) => {
  switch (action.type) {
    case ORDER_HIST:
      return action.user
    default:
      return orders
  }
}
export default reducer
