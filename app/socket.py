import os
from flask_socketio import SocketIO

if os.environ.get("FLASK_ENV") == "production":
    origins = [
        "http://petsagram-solo.herokuapp.com/",
        "https://petsagram-solo.herokuapp.com/"
    ]
else:
    origins = "*"

socketio = SocketIO(cors_allowed_origins=origins, logger=True, engineio_logger=True)
