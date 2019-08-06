import axios from 'axios'
import history from '../history'
// ACTION TYPES
const GET_CART = 'GET_CART'
const INCREMENT_QTY = 'INCREMENT_QTY'
const DECREMENT_QTY = 'DECREMENT_QTY'
const ADD_CART_ITEM = 'ADD_ITEM'
const DELETE_CART_ITEM = 'DELETE_ITEM'
const CHECKOUT = 'CHECKOUT'
const NEW_ORDER = 'NEW_ORDER'

// ACTION CREATORS
const newOrder = () => ({
  type: NEW_ORDER
})

const checkout = () => ({
  type: CHECKOUT
})

const getCartItems = items => ({
  type: GET_CART,
  items
})
// qty increase
const incrementQty = id => ({
  type: INCREMENT_QTY,
  id
})
// qty decrease
const decrementQty = items => ({
  type: DECREMENT_QTY,
  items
})
const addCartItem = items => ({
  type: ADD_CART_ITEM,
  items
})
const deleteCartItem = id => ({
  type: DELETE_CART_ITEM,
  id
})

//THUNKS
export const newOrderThunk = order => async dispatch => {
  await axios.post(`/api/order/`, order)
  dispatch(newOrder())
}

export const getCartItemsThunk = () => async dispatch => {
  try {
    let {data} = await axios.get(`/api/cart`)
    dispatch(getCartItems(data))
  } catch (error) {
    console.error(error)
  }
}

export const incrementQtyThunk = id => async dispatch => {
  try {
    await axios.put(`/api/cart`, {data: {itemId: id, type: 'add'}})
    dispatch(incrementQty(id))
  } catch (error) {
    console.log(err)
  }
}
export const decrementQtyThunk = item => async dispatch => {
  try {
    await axios.put(`/api/cart`, {item: item})
    let {data} = await axios.get(`/api/cart`)
    dispatch(decrementQty(data))
  } catch (error) {
    console.log(err)
  }
}
export const addCartItemThunk = item => async dispatch => {
  try {
    await axios.put(`/api/shop/${item.id}`)
    let {data} = await axios.get(`/api/cart`)
    dispatch(addCartItem(data))
  } catch (error) {
    console.error(error)
  }
}
export const deleteCartItemThunk = item => async dispatch => {
  try {
    await axios.delete(`/api/cart/`, {data: {item: item}})
    dispatch(deleteCartItem(item.id))
  } catch (error) {
    console.error(error)
  }
}

export const checkoutThunk = order => async dispatch => {
  //*toggling current order isCart to false
  await axios.put(`/api/orders/${order}`)

  //*create new order for user
  await axios.post(`/api/orders/`)

  dispatch(checkout())
}

// REDUCER
const reducer = (cart = [], action) => {
  switch (action.type) {
    case GET_CART:
      return action.items.items
    case ADD_CART_ITEM:
      return action.items.items
    case DECREMENT_QTY:
      return action.items.items

    case DELETE_CART_ITEM:
      return cart.filter(item => item.id !== action.id)
    case CHECKOUT:
      return []
    default:
      return cart
  }
}
export default reducer
