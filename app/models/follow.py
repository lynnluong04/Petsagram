from .db import db

follows = db.Table(
    'follows',
    db.Model.metadata,
    db.Column('follower', db.Integer, db.ForeignKey('users.id'), primary_key=True ),
    db.Column('followee', db.Integer, db.ForeignKey('users.id'), primary_key=True )
)
