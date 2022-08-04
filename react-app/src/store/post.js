const LOAD = '/posts/LOAD';
const ADD = '/posts/ADD';
const EDIT = '/posts/EDIT';
const REMOVE = '/posts/REMOVE';

const load = list => ({
    type: LOAD,
    list
})

const add = post => ({
    type: ADD,
    post
})

const edit = post => ({
    type: EDIT,
    post
})

const remove = postId => ({
    type: REMOVE,
    postId
})

export const thunkLoadPosts = () => async (dispatch) => {
    const res = await fetch('/api/posts/');
    if (res.ok) {
        const list = await res.json();
        dispatch(load(list));
    }
}

export const thunkLoadUserPosts = (userId) => async (dispatch) => {
    const res = await fetch(`/api/posts/${userId}`);
    if (res.ok) {
        const list = await res.json();
        dispatch(load(list))
    }
}


export const thunkCreatePost = payload => async dispatch => {
    const res = await fetch('/api/posts/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    });

    if (res.ok) {
        const post = await res.json();
        dispatch(add(post));
        return post;
    }
}

export const thunkEditPost = payload => async dispatch => {
    const res = await fetch(`/api/posts/${payload.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    });

    if (res.ok) {
        const post = await res.json();
        dispatch(edit(post));
    }
}

export const thunkDeletePost = postId => async dispatch => {
    const res = await fetch(`/api/servers/${postId}`, {
        method: 'DELETE'
    })

    if (res.ok) {
        dispatch(remove(postId))
    }
}






let newState;

export default function postReducer(state = {}, action) {
    switch (action.type) {
    case LOAD:
        newState = {};
        console.log("FROM THE REDUCER", action.list['posts'])
        const allPosts = action.list['posts']
        allPosts.forEach(post => {
            newState[post.id] = post
        })
        return newState

    default:
        return state;
    }
}
