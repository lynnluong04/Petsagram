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

export const thunkLoadComments = (postId) => async (dispatch) => {
    const res = await fetch(`/api/comments/${postId}`);
    if (res.ok) {
        const list = await res.json();
        dispatch(load(list));
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
