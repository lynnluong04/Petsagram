# from tkinter import CASCADE
from .db import db
from sqlalchemy.sql import func
from .user import User
# from .comment import Comment

# likes = db.Table(
#     "likes",
#     db.Model.metadata,
#     db.Column('owner_id', db.Integer, db.ForeignKey('users.id'), primary_key=True),
#     db.Column('post_id', db.Integer, db.ForeignKey('posts.id'), primary_key=True)
# )


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
            'owner': User.query.get(self.owner_id).username,
            'profile': User.query.get(self.owner_id).photo_url,
            # 'comments_num': len(Comment.query.filter_by(post_id=self.id).all()),
        }



    owner = db.relationship("User", back_populates="owner_posts")
    all_comments = db.relationship("Comment", back_populates="post", cascade="all, delete-orphan")
