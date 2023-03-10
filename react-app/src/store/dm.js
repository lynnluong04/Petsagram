const LOAD = '/chat/LOAD';
const SEND_LC = '/chat/SEND_LC';
const LOADDM = '/dm/LOADDM'
const SAVEDM = '/dm/SAVEDM'

const load = list => ({
  type: LOAD,
  list
})

const send = message => ({
  type: SEND_LC,
  message
})
const loadDM = list => ({
  type: LOADDM,
  list
})

const saveDM = message => ({
  type: SAVEDM,
  message
})

export const loadLiveChatHistory = (channelId) => async dispatch => {
    const res = await fetch(`/api/chat/live_chat/${channelId}`);

    if (res.ok) {
      const list = await res.json();
      dispatch(load(list));
      return list;
    }
  }

  export const sendLiveChatMessage = payload => async dispatch => {

    // add type key to payload object so that the reducer can discern if live chat or dm
    // payload['type'] = 'live-chat';

    // console.log('hitting sendLiveChatMessage thunk', payload);

    const res = await fetch('/api/chat/live_chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    // console.log('sendLiveChatMessage thunk res: ', res);

    if (res.ok) {
      const message = await res.json();
      // console.log('sendLiveChatMessage res.ok, message: ', message);
      dispatch(send(message));
      // console.log('after sendLiveChatMessage dispatch');
      return message;
    }
  }

  export const loadDMHistory = (senderId, recipientId) => async dispatch => {
    // console.log("LOAD DM HISTORY", senderId, recipientId)

    // fetching all the dms the sender & recipient have sent to anyone
    const senderRes = await fetch(`/api/chat/dms/${senderId}`);
    const recipientRes = await fetch(`/api/chat/dms/${recipientId}`);

    if (senderRes.ok && recipientRes.ok) {
      const senderList = await senderRes.json()
      const recipientList = await recipientRes.json()

      // all the dms the sender has sent to the recipient
      const sendList = senderList.dm_messages.filter(message => {
        return message['recipient_id'] === recipientId;
      })

      // all the dms the recipient has sent to the sender
      const recList = recipientList.dm_messages.filter(message => {
        return message['recipient_id'] === senderId;
      })

      // spreading the dm objects into a list array, then sorting that list by dm id
      const list = [...sendList, ...recList];
      list.sort((a, b) => {
        return a.id - b.id;
      })
      // console.log('list', list);

      // the argument passed into the action here has to be structured like this because the
      // reducer is expecting action.list['dm_messages']
      dispatch(loadDM({ 'dm_messages': list }));
      return list;
    }
  }

  export const sendDmMessage = (payload) => async dispatch => {
    // console.log('INSIDE THUNK send', payload)
    const res = await fetch('/api/chat/dms', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    // console.log('INSIDE THUNK, AFTER RES, res', res)

    if (res.ok) {
      const message = await res.json();
      dispatch(saveDM(message));
      return message;
    }
  }

  let newState;


  export default function chatReducer(state = {}, action) {
    switch (action.type) {
      case LOAD:
        newState = { ...state };

        // store chat history in live_chat_history or dm_history based on which key is in action
        const chatHistory = action.list['live_chat_history'];
        newState['live-chat-history'] = {};
        chatHistory.forEach(message => {
          newState['live-chat-history'][message.id] = message;
        })

        return newState;

      case SEND_LC:
        newState = { ...state };
        // console.log('IN REDUCER', action, action.type)
        newState['live-chat-history'][action.message.id] = action.message;

        return newState;


      case LOADDM:
        newState = {}
        const dmHistory = action.list['dm_messages'];
        if (!newState['dm-messages']) newState['dm-messages'] = {};
        // console.log('REDUCER', action, action.list)
        dmHistory.forEach(message => {
          newState['dm-messages'][message.id] = message
        })
        return newState;

      case SAVEDM:

        newState = { ...state };
        // console.log('IN REDUCER', action, action.type)
        // if (!newState['dm-messages'])  newState['dm-messages'] = {};
        newState['dm-messages'][action.message.id] = action.message
        return newState

      default:
        return state;
    }
  }
