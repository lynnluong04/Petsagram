const LOAD = '/users/LOAD';
const EDIT = '/users/EDIT';
const REMOVE = '/users/REMOVE';
const FOLLOWING = '/users/FOLLOWING';


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

const updateFollow = user => ({
    type: FOLLOWING,
    user
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

// export const uploadProfilePhoto = formData => async dispatch => {
//     // console.log("FORMDATE FROM THUNK PROF PIC", formData)
//     const res = await fetch('/api/users/profile-pic', {
//         method: 'POST',
//         body: formData
//     });

//     if (res.ok) {
//         const user = await res.json();
//         dispatch(edit(user));
//     }
// }

export const thunkDeleteUser = userId => async dispatch => {
    const res = await fetch(`/api/users/${userId}`, {
        method: 'DELETE'
    });

    if (res.ok) {
        dispatch(remove(userId))
    }
}

export const thunkFollowUser = userId => async dispatch => {
    const res = await fetch(`/api/users/${userId}/follow`, {
        method: 'POST',
    });

    if (res.ok) {
        const user = await res.json()
        dispatch(updateFollow(user))
    }
}
export const thunkUnfollowUser = userId => async dispatch => {
    const res = await fetch(`/api/users/${userId}/unfollow`, {
        method: 'POST'
    });

    if (res.ok) {
        const user = await res.json()
        dispatch(updateFollow(user))
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
            newState = { ...state };
            newState[action.user.id] = action.user;
            return newState;

        case REMOVE:
            newState = { ...state };
            delete newState[action.userId];
            return newState;

        case FOLLOWING:
            newState = { ...state };
            newState[action.user.currentUser.id] = action.user.currentUser;
            newState[action.user.otherUser.id] = action.user.otherUser;
            return newState;

        default:
            return state;
    }

}
