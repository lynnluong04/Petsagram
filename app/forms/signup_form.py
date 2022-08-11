from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError, EqualTo, Length
from app.models import User


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Another account is using the same email.')


def username_exists(form, field):
    # Checking if username is already in use
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user:
        raise ValidationError(
            'This username isn\'t available. Please try another.')


class SignUpForm(FlaskForm):
    username = StringField('username',
                           validators=[
                               DataRequired("You must enter a username"),
                               username_exists,
                               Length(
                                   min=5, max=40, message="Username must be between 5 and 40 characters")
                           ])
    name = StringField('name',
                       validators=[
                           DataRequired("You must enter your full name"),
                           Length(
                               min=5, max=40, message="Name must be between 2 and 100 characters")

                       ])
    email = StringField('email',
                        validators=[
                            DataRequired("You must enter an email"),
                            user_exists,
                            Email(),
                            Length(
                                min=5, max=255, message="Email must be between 5 and 255 characters")

                        ])
    password = StringField('password',
                           validators=[
                               DataRequired("You must enter a password"),
                               EqualTo('confirm_password',
                                       message='Passwords must match'),
                               Length(
                                   min=8, max=255, message="Password must be between 8 and 255 characters")

                           ])
    confirm_password = StringField('confirm',
                                   validators=[
                                       DataRequired(
                                           "Please confirm your password"),
                                   ])
