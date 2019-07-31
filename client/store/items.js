import axios from 'axios'
import history from '../history'

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
    selectedItem: {}
}

/**
 * ACTION CREATORS
 */
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

const getAllItems = items => ({
    type: GET_ITEMS,
    items,
});

/**
 * REDUCER
 */
// export default function (state = defaultItem, action) {
//     switch (action.type) {
//         case GET_ITEM:
//             return action.item
//         case DELETE_ITEM:
//             return defaultItem
//         default:
//             return state
//     }
// }

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_STUDENTS:
            return {
                ...state,
                students: action.students,
            };
        case GET_SINGLE_STUDENT:
            return {
                ...state,
                selectedStudent: action.student,
            };
        case ADD_STUDENT:
            return {
                ...state,
                students: [...state.students, action.student],
            };
        case DELETE_STUDENT:
            return {
                ...state,
                students: state.students.filter(student => student.id !== action.id),
            };

        default:
            return state;
    }
};

export default reducer;

