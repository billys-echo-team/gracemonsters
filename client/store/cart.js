import axios from 'axios'
import history from '../history'
// ACTION TYPES
const GET_CART = 'GET_CART'
const INCREMENT_QTY = 'INCREMENT_QTY'
const DECREMENT_QTY = 'DECREMENT_QTY'
const ADD_CART_ITEM = 'ADD_ITEM'
const DELETE_CART_ITEM = 'DELETE_ITEM'

// ACTION CREATORS
const getCartItems = items => ({
  type: GET_CART,
  items
})
// qty increase
const incrementQty = item => ({
  type: INCREMENT_QTY,
  item
})
// qty decrease
const decrementQty = item => ({
  type: DECREMENT_QTY,
  item
})
const addCartItem = item => ({
  type: ADD_CART_ITEM,
  item
})
const deleteCartItem = id => ({
  type: DELETE_CART_ITEM,
  id
})
//THUNKS
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
    let {data} = await axios.put(`/api/cart`, {data: {itemId: id}})
    dispatch(incrementQty(data))
  } catch (error) {
    console.log(err)
  }
}
export const decrementQtyThunk = id => async dispatch => {
  try {
    const {data} = await axios.put(`/api/cartItems/${id}`)
    dispatch(decrementQty(data))
  } catch (error) {
    console.log(err)
  }
}
export const addCartItemThunk = id => async dispatch => {
  try {
    let {data} = await axios.put(`/api/shop/${id}`)
    if (data) {
      dispatch(addCartItem(data))
    }
  } catch (error) {
    console.error(err)
  }
}
export const deleteCartItemThunk = id => async dispatch => {
  try {
    await axios.delete(`/api/cart/`, {data: {itemId: id}})
    dispatch(deleteCartItem(id))
  } catch (error) {
    console.error(err)
  }
}
// REDUCER
const reducer = (cart = [], action) => {
  switch (action.type) {
    case GET_CART:
      return action.items.items

    // case INCREMENT_QTY:
    //   return {
    //     ...state,
    //     cartItems: state.cartItems.map(item => {
    //       if (item.id !== action.item.id) {
    //         return item
    //       } else return action.item
    //     })
    //   }
    // case DECREMENT_QTY:
    //   return {
    //     ...state,
    //     cartItems: state.cartItems.map(item => {
    //       if (item.id !== action.item.id) {
    //         return item
    //       } else return action.item
    //     })
    //   }
    // case ADD_CART_ITEM:
    //   return {
    //     cartItems: [...state.items, action.item]
    //   }
    case DELETE_CART_ITEM:
      return cart.filter(item => item.id !== action.id)
    default:
      return cart
  }
}
export default reducer
