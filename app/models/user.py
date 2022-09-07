from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from .like import likes
from .follow import follows
# from .post import Post


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    bio = db.Column(db.String(150), nullable=True)
    photo_url = db.Column(db.String(1000), nullable=True)

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict_follows(self):
        return {
            'id': self.id,
            'username': self.username,
            'name': self.name,
            'photo_url': self.photo_url,
        }

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'name': self.name,
            'email': self.email,
            'bio': self.bio,
            'photo_url': self.photo_url,
            'followers': [user.to_dict_follows() for user in self.followers],
            'following': [user.to_dict_follows() for user in self.following]
        }

    def is_following(self, user):
        return self.following.filter(
            follows.c.followee == user.id).count() > 0

    def follow(self, user):
        if not self.is_following(user):
            self.following.append(user)

    def unfollow(self, user):
        if self.is_following(user):
            self.following.remove(user)

    def followed_posts(self):
        followed = db.Post.query.join(
            follows, (follows.c.followee == db.Post.user_id)).filter(
                follows.c.follower == self.id)
        own = db.Post.query.filter_by(user_id=self.id)
        return followed.union(own).order_by(db.Post.timestamp.desc())



    owner_posts = db.relationship("Post", back_populates="owner")
    comments = db.relationship("Comment", back_populates="owner")
    liked_posts = db.relationship("Post",
                                  secondary=likes,
                                  back_populates='users_who_liked'
                                  )
    following = db.relationship(
        'User', secondary=follows,
        primaryjoin=(follows.c.follower == id),
        secondaryjoin=(follows.c.followee == id),
        backref=db.backref('followers', lazy='dynamic'), lazy='dynamic')
