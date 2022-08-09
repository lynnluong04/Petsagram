from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError
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
        raise ValidationError('This username isn\'t available. Please try another.')


def username_length(form, field):
    username = field.data
    if len(username) > 40:
        raise ValidationError('Username must be 40 characters or less')

def name_length(form, field):
    name =field.data
    if len(name) > 40:
        raise ValidationError('Name must be 100 characters or less')


class SignUpForm(FlaskForm):
    username = StringField(
        'username', validators=[DataRequired(), username_exists, username_length])
    name = StringField('name', validators=[DataRequired(), name_length])
    email = StringField('email', validators=[DataRequired(), user_exists, Email()])
    password = StringField('password', validators=[DataRequired()])
