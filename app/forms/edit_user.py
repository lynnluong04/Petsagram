from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, ValidationError, Length, Email
from flask_login import current_user
from app.models import User


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user and user != current_user:
        raise ValidationError('Another account is using the same email.')


def username_exists(form, field):
    # Checking if username is already in use
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user and user != current_user:
        raise ValidationError(
            'This username isn\'t available. Please try another.')


class EditUserForm(FlaskForm):
    name = StringField('name',
                       validators=[
                           DataRequired(
                               message="You must enter a name"),
                           Length(
                               min=1, max=100, message="Name must be between 1 to 100 characters")
                       ])
    username = StringField('username',
                           validators=[
                               DataRequired(
                                   message="You must enter a username"),
                                   username_exists,
                               Length(
                                   min=3, max=40, message="Username must be between 3 to 40 characters")
                           ])
    email = StringField('email',
                        validators=[
                            DataRequired(message="You must enter an email"),
                            user_exists,
                            Email(),
                            Length(
                                min=6, max=255, message="Email must be between 6 to 255 characters")
                        ])
    bio = StringField('bio',
                        validators=[
                            Length(min=0, max=150, message="Your bio must be 150 characters or fewer.")
                        ])
