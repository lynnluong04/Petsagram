from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from .like import likes

class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    bio = db.Column(db.String(150), nullable=True)
    photo_url = db.Column(db.String(1000), nullable=True, default="https://cdn140.picsart.com/297361716279211.png?to=crop&type=webp&r=1456x1388&q=85")

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'name': self.name,
            'email': self.email,
            'bio': self.bio,
            'photo_url': self.photo_url
        }

    owner_posts = db.relationship("Post", back_populates="owner")
    comments = db.relationship("Comment", back_populates="owner")
    liked_posts = db.relationship("Post",
    secondary=likes,
    back_populates='users_who_liked'
)
