// work by Edward. Mailny copy from Junior-Phase project. And match and replace from students to items


import axios from 'axios'
import history from '../history' // existed as default.

/**
 * ACTION TYPES
 */

const GET_ITEMS = 'GET_ITEMS';
const GET_SINGLE_ITEM = 'GET_SINGLE_ITEM';
const ADD_ITEM = 'ADD_ITEM';
const DELETE_ITEM = 'DELETE_ITEM';

/**
 * INITIAL STATE
 */
const defaultItem = {
    items: [],
    //selectedItem: {}

}

/**
 * ACTION CREATORS
 */
const getAllItems = items => ({
    type: GET_ITEMS,
    items,
});

const getSingleItem = item => ({
    type: GET_SINGLE_ITEM,
    item,
});

const addItem = item => ({
    type: ADD_ITEM,
    item,
});

const deleteItem = id => ({
    type: DELETE_ITEM,
    id,
})

//THUNKS

export const getAllItemsThunk = () => async dispatch => {
    try {
        let { data } = await axios.get('/api/items');
        dispatch(getAllItems(data));
    } catch (error) {
        console.error(error);
    }
};

export const getSingleItemThunk = id => async dispatch => {
    try {
        let res = await axios.get(`/api/items/${id}`);

        dispatch(getSingleItem(res.data));
    } catch (error) {
        console.error(error);
    }
};

export const addItemThunk = newItem => async dispatch => {
    try {
        let { data } = await axios.post('/api/items', newItem);
        dispatch(addItem(data));
    } catch (error) {
        console.error(error);
    }
};

export const deleteItemThunk = id => async dispatch => {
    try {
        await axios.delete(`/api/items/${id}`);
        dispatch(deleteItem(id));
    } catch (error) {
        console.error(error);
    }
};

/**
 * REDUCER
 */


const reducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ITEMS:
            return {
                item: action.items,
            };
        case GET_SINGLE_ITEM:
            return {
                items: state.items.filter(item => item.id === action.id)
            };
        case ADD_ITEM:
            return {
                items: [...state.items, action.item],
            };
        case DELETE_ITEM:
            return {
                items: state.items.filter(item => item.id !== action.id),
            };

        default:
            return state;
    }
};

export default reducer;

