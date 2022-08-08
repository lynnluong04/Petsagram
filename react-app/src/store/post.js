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
        console.log("FROM GET POST THUNK", list)
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
    console.log("Hitting Create Post Thunk", payload)
    const res = await fetch('/api/posts/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    });

    if (res.ok) {
        const post = await res.json();
        console.log("POST FROM THUNK?", post)
        dispatch(add(post));
        return post;
    }
}

export const thunkEditPost = payload => async dispatch => {
    console.log("PAYLOAD FROM EDIT THUNK", payload.id)
    const res = await fetch(`/api/posts/${payload.id}/`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    });

    if (res.ok) {
        const post = await res.json();
        console.log("POST FROM EDIT THUNK", post)
        dispatch(edit(post));
    }
}

export const thunkDeletePost = postId => async dispatch => {
    console.log("DELETE POST THUNK", postId)
    const res = await fetch(`/api/posts/${postId}`, {
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
        const allPosts = action.list['posts']
        allPosts.forEach(post => {
            newState[post.id] = post
        });
        return newState;

    case ADD:
        newState = {...state};
        newState[action.post.id] = action.post;
        return newState;

    case EDIT:
        newState = {...state};
        newState[action.post.id] = action.post;
        return newState

    case REMOVE:
        newState = {...state};
        delete newState[action.postId];
        return newState;

    default:
        return state;
    }
}
