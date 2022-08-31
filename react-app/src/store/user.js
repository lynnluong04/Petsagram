const LOAD = '/users/LOAD';
const EDIT = '/users/EDIT';
const REMOVE = '/users/REMOVE';

const load = list => ({
    type: LOAD,
    list
})


const edit = comment => ({
    type: EDIT,
    comment
})

const remove = commentId => ({
    type: REMOVE,
    commentId
})


export const thunkLoadUsers = () => async (dispatch) => {
    const res = await fetch('/api/users');
    if (res.ok) {
        const list = await res.json();
        dispatch(load(list));
    }
}

export const thunkEditUser = payload => async dispatch => {
    const res = await fetch(`/api/users/${payload.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    });

    if (res.ok) {
        const user = await res.json();
        dispatch(edit(user))
    }
}

export const thunkDeletePost = userId => async dispatch => {
    const res = await fetch(`/api/users/${userId}`, {
        method: 'DELETE'
    });

    if (res.ok) {
        dispatch(remove(userId))
    }
}


let newState;

export default function userReducer(state = {}, action) {

    switch (action.type) {
        case LOAD:
            newState = {};
            const allUsers = action.list['users']
            allUsers.forEach(user => {
                newState[user.id] = user
            })
            return newState;

        case EDIT:
            newState = {...state};
            newState[action.user.id] = action.user;
            return newState;

        case REMOVE:
            newState = {...state };
            delete newState[action.userId];
            return newState;

        default:
            return state;
    }

}
