const LOAD = '/comments/LOAD';
const ADD = '/comments/ADD';
const EDIT = '/comments/EDIT';
const REMOVE = '/comments/REMOVE';

const load = list => ({
    type: LOAD,
    list
})

const add = comment => ({
    type: ADD,
    comment
})

const edit = comment => ({
    type: EDIT,
    comment
})

const remove = commentId => ({
    type: REMOVE,
    commentId
})

export const thunkLoadComments = () => async (dispatch) => {
    const res = await fetch('/api/comments/');
    if (res.ok) {
        const list = await res.json();
        dispatch(load(list));
    }
}

export const thunkCreateComment = payload => async dispatch => {
    console.log("Hitting Create Comment Thunk", payload)
    const res = await fetch('/api/comments/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    });

    if (res.ok) {
        const comment = await res.json();
        console.log("RES FROM CREATE COMMENT THUNK?", comment)
        dispatch(add(comment));
        return comment;
    }
}

export const thunkEditComment = payload => async dispatch => {
    const res = await fetch(`/api/comments/${payload.id}/`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    });

    if (res.ok) {
        const comment = await res.json();
        console.log("POST FROM EDIT THUNK", comment)
        dispatch(edit(comment));
    }
}

export const thunkDeleteComment = commentId => async dispatch => {
    console.log("DELETE POST THUNK", commentId)
    const res = await fetch(`/api/comments/${commentId}`, {
        method: 'DELETE'
    })

    if (res.ok) {
        dispatch(remove(commentId))
    }
}



let newState;

export default function commentReducer(state = {}, action) {
    switch(action.type) {
        case LOAD:
            newState = {...state};
            const allComments = action.list['comments']
            allComments.forEach(comment => {
                newState[comment.id] = comment
            });
            return newState;

        case ADD:
            newState = {...state};
            newState[action.comment.id] = action.comment;
            return newState;

        case EDIT:
            newState = { ...state};
            newState[action.comment.id] = action.comment;
            return newState;

        case REMOVE:
            newState = {...state};
            delete newState[action.commentId]
            return newState;

        default:
            return state;
    }
}
