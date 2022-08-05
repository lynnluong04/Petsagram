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
        console.log("POST FROM THUNK?", comment)
        dispatch(add(comment));
        return comment;
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
        default:
            return state;
    }
}
