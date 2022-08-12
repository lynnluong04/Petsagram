from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError, EqualTo
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
                               DataRequired(message="You must enter a username"),
                               username_exists,

                           ])
    name = StringField('name',
                       validators=[
                           DataRequired(message="You must enter your full name"),


                       ])
    email = StringField('email',
                        validators=[
                            DataRequired(message="You must enter an email"),
                            user_exists,
                            Email(),


                        ])
    password = StringField('password',
                           validators=[
                               DataRequired(message="You must enter a password"),
                               EqualTo('confirm',
                                       message='Passwords must match'),


                           ])
    confirm = StringField('confirm',
                                   validators=[
                                       DataRequired(message="Please confirm your password"),
                                   ]
                                   )
