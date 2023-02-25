from .db import db, environment, SCHEMA, add_prefix_for_prod

from sqlalchemy.sql import func


class DirectMessage(db.Model):
    __tablename__ = "direct_messages"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    recipient_id = db.Column(db.Integer, nullable=False)
    message_body = db.Column(db.String(1000), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, server_default=func.now())

    def to_dict(self):
        return {
            'id': self.id,
            'sender_id': self.user_id,
            'recipient_id': self.recipient_id,
            'message_body': self.message_body,
            'created_at': self.created_at,
        }

    sender = db.relationship("User", back_populates="messages_sent")
