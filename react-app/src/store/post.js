const LOAD = '/posts/LOAD';
const LOADUSERPOSTS = '/posts/LOADUSERPOSTS';
const ADD = '/posts/ADD';
const EDIT = '/posts/EDIT';
const REMOVE = '/posts/REMOVE';

const load = list => ({
    type: LOAD,
    list
})
const loadUserPosts = list => ({
    type: LOADUSERPOSTS,
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
        dispatch(loadUserPosts(list))
    }
}


export const thunkCreatePost = formData => async dispatch => {
    const res = await fetch('/api/posts/', {
        method: 'POST',
        body: formData
    });

    if (res.ok) {
        const post = await res.json();
        dispatch(add(post));
        return null;
    } else if (res.status < 500) {
        const data = await res.json();
        if (data.errors) {
            return data.errors;
        }
    } else {
        return ['An error occurred. Please try again.']
    }
}

export const thunkEditPost = payload => async dispatch => {
    const res = await fetch(`/api/posts/${payload.id}/`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    });

    if (res.ok) {
        const post = await res.json();
        dispatch(edit(post));
        return null;
    } else if (res.status < 500) {
        const data = await res.json();
        if (data.errors) {
            return data.errors;
        }
    } else {
        return ['An error occurred. Please try again']
    }
}

export const thunkDeletePost = postId => async dispatch => {
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
            // newState['comment-count'] = {};
            const allPosts = action.list['posts']
            allPosts.forEach(post => {
                newState[post.id] = post
                // newState['comment-count'][post.id] = post.comments_num
            });
            return newState;

        case LOADUSERPOSTS:
            newState = {};
            const allUserPosts = action.list['posts']
            allUserPosts.forEach(post => {
                newState[post.id] = post;
            });
            return newState;


        case ADD:
            newState = { ...state };
            newState[action.post.id] = action.post;
            return newState;

        case EDIT:
            newState = { ...state };
            newState[action.post.id] = action.post;
            return newState

        case REMOVE:
            newState = { ...state };
            delete newState[action.postId];
            return newState;

        default:
            return state;
    }
}
