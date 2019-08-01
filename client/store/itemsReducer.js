// work by Edward. Mailny copy from Junior-Phase project. And match and replace from students to items

import axios from 'axios'
import history from '../history' // existed as default.

/**
 * ACTION TYPES
 */

const GET_ITEMS = 'GET_ITEMS'
const GET_SINGLE_ITEM = 'GET_SINGLE_ITEM'
const ADD_ITEM = 'ADD_ITEM'
const DELETE_ITEM = 'DELETE_ITEM'

/**
 * ACTION CREATORS
 */
const getItems = items => ({
  type: GET_ITEMS,
  items
})

const getSingleItem = item => ({
  type: GET_SINGLE_ITEM,
  item
})

const addItem = item => ({
  type: ADD_ITEM,
  item
})

const deleteItem = id => ({
  type: DELETE_ITEM,
  id
})

//THUNKS

export const getItemsThunk = () => {
  return async function(dispatch, getState) {
    const {data} = await axios.get('/api/shop')
    dispatch(getItems(data))
  }
}

export const getSingleItemThunk = id => async dispatch => {
  try {
    let res = await axios.get(`/api/shop/${id}`)

    dispatch(getSingleItem(res.data))
  } catch (error) {
    console.error(error)
  }
}

export const addItemThunk = newItem => async dispatch => {
  try {
    let {data} = await axios.post('/api/shop', newItem)
    dispatch(addItem(data))
  } catch (error) {
    console.error(error)
  }
}

export const deleteItemThunk = id => async dispatch => {
  try {
    await axios.delete(`/api/shop/${id}`)
    dispatch(deleteItem(id))
  } catch (error) {
    console.error(error)
  }
}

/**
 * REDUCER
 */

const itemReducer = (items = [], action) => {
  switch (action.type) {
    case GET_ITEMS:
      return action.items
    case GET_SINGLE_ITEM:
      let allItems = items.filter(item => item.id !== action.item.id)
      items.push(action.item)
      return allItems
    // case ADD_ITEM:
    //   return {
    //     items: [...items, action.item]
    //   }
    case DELETE_ITEM:
      return items.filter(item => item.id !== action.id)
    default:
      return items
  }
}

export default itemReducer
