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

def no_whitespace(form, field):
    password = field.data
    if password.__contains__(" "):
        raise ValidationError ("Password cannot contain whitespace")

class SignUpForm(FlaskForm):
    username = StringField('username',
                           validators=[
                               DataRequired(message="You must enter a username"),
                               username_exists,
                               Length(min=3, max=40, message="Username must be between 3 to 40 characters")
                           ])

    name = StringField('name',
                       validators=[
                           DataRequired(message="You must enter your full name"),
                           Length(min=1, max=100, message="Name must be between 1 to 100 characters")
                       ])
    email = StringField('email',
                        validators=[
                            DataRequired(message="You must enter an email"),
                            user_exists,
                            Email(),
                            Length(min=6, max=255, message="Email must be between 6 to 255 characters")
                        ])
    password = StringField('password',
                           validators=[
                               DataRequired(message="You must enter a password"),
                               EqualTo('confirm',
                                       message='Passwords must match'),
                                Length(min=6, max=255, message="Password must be between 6 to 255 characters"),
                                no_whitespace
                           ])
    confirm = StringField('confirm',
                                   validators=[
                                       DataRequired(message="Please confirm your password"),
                                   ]
                                   )
