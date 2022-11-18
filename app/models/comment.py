from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.sql import func
from .user import User


class Comment(db.Model):
    __tablename__ = 'comments'
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    owner_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    post_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('posts.id')), nullable=False)
    content = db.Column(db.String(2200), nullable=True)
    created_at = db.Column(db.DateTime, nullable=False, server_default=func.now())

    def to_dict(self):
        return {
            'id': self.id,
            'post_id': self.post_id,
            'owner_id': self.owner_id,
            'content': self.content,
            'created_at': self.created_at,
            'owner': self.owner.username,
            'owner_profile': self.owner.photo_url
        }

    owner = db.relationship("User", back_populates="comments")
    post = db.relationship("Post", back_populates="all_comments")
