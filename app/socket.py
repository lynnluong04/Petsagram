from flask_socketio import SocketIO, emit, join_room, leave_room, send
from flask import request
import os

if os.environ.get("FLASK_ENV") == "production":
    origins = [
        "http://petsagram.onrender.com/",
        "https://petsagram.onrender.com/"
    ]
else:
    origins = "*"

# create your SocketIO instance
socketio = SocketIO(cors_allowed_origins=origins)

# handle chat messages
@socketio.on("chat")
def handle_chat(data):
    emit("chat", data, broadcast=True)


@socketio.on("dm_chat")
def on_dm_chat(data):
#   print('-------------DATA--------------\n',
#       'data:', data,
#       '\n-------------DATA-------------')
  emit('dm_chat', data, to=data['dm_room_id'])

@socketio.on("dm_join")
def on_dm_join(data):
  username = data['username']
  # sender = data['sender']
  # recipient = data['recipient']
  dm_room_id = data['dm_room_id']
  join_room(dm_room_id)
  send(username + ' has entered the room.', to=dm_room_id)

@socketio.on("dm_leave")
def on_dm_leave(data):
  username = data['username']
  # sender = data['sender']
  # recipient = data['recipient']
  dm_room_id = data['dm_room_id']
  leave_room(dm_room_id)
  send(username + ' has left the room.', to=dm_room_id)
