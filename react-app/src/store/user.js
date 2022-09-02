const LOAD = '/users/LOAD';
const EDIT = '/users/EDIT';
const REMOVE = '/users/REMOVE';

const load = list => ({
    type: LOAD,
    list
})


const edit = user => ({
    type: EDIT,
    user
})

const remove = userId => ({
    type: REMOVE,
    userId
})


export const thunkLoadUsers = () => async (dispatch) => {
    const res = await fetch('/api/users/');
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
        return null;
    } else if (res.status < 500) {
        const data = await res.json();
        if (data.errors) {
            return data.errors
        }
    } else {
        return ['An error occurred. Please try again']
    }
}

export const uploadProfilePhoto = formData => async dispatch => {
    console.log("FORMDATE FROM THUNK PROF PIC", formData)
    const res = await fetch('/api/users/profile-pic', {
        method: 'POST',
        body: formData
    });

    if (res.ok) {
        const user = await res.json();
        dispatch(edit(user));
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
