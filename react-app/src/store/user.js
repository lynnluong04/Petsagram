const LOAD = '/users/LOAD';
const EDIT = '/users/EDIT';
const REMOVE = '/users/REMOVE';
const FOLLOW = '/users/FOLLOW'
const UNFOLLOW = '/users/UNFOLLOW'


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

const addToFollow = user => ({
    type: FOLLOW,
    user
})

const removeFollow = user => ({
    type: UNFOLLOW,
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
        console.log("RETURN FROM FOLLOW ROUTE", user)
        dispatch(edit(user))
    }
}
export const thunkUnfollowUser = userId => async dispatch => {
    const res = await fetch(`/api/users/${userId}/unfollow`, {
        method: 'POST'
    });

    if (res.ok) {
        const user = await res.json()
        dispatch(edit(user))
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

        // case FOLLOW:
        //     newState = {...state};
        //     console.log("ACTION STUFF", action.userId)
        //     const currentUser = newState[action.userId.currentUser.id]
        //     const addedUser = newState[action.userId.addedUser.id]
        //     console.log("NEWSTATE", state)
        //     currentUser.following.push(addedUser)
        //     return newState;

        // case UNFOLLOW:
        //     newState = {...state};
        //     return newState;


        default:
            return state;
    }

}
