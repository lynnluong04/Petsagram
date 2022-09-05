# from tkinter import CASCADE
from .db import db
from .user import User
from .comment import Comment
from sqlalchemy.sql import func
from .like import likes



class Post(db.Model):
    __tablename__ = 'posts'

    id = db.Column(db.Integer, primary_key=True)
    owner_id = db.Column(db.Integer, db.ForeignKey('users.id') ,nullable=False)
    media_url = db.Column(db.String(1000), nullable=False)
    caption = db.Column(db.String(2200), nullable=True)
    created_at = db.Column(db.DateTime, nullable=False, server_default=func.now())

    def to_dict(self):
        return {
            'id': self.id,
            'owner_id': self.owner_id,
            'media_url': self.media_url,
            'caption': self.caption,
            'created_at': self.created_at,
            'owner': self.owner.username,
            'profile': self.owner.photo_url,
            'comments_num': len(Comment.query.filter_by(post_id=self.id).all()),
            'liked_users': [user.id for user in self.users_who_liked]
        }





    owner = db.relationship("User", back_populates="owner_posts")
    all_comments = db.relationship("Comment", back_populates="post", cascade="all, delete-orphan")
    users_who_liked = db.relationship("User",
    secondary=likes,
    back_populates='liked_posts'
)
