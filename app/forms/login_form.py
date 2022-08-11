from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if not user:
        raise ValidationError(
            'The email you entered doesn\'t belong to an account. Please check your email and try again')


def password_matches(form, field):
    # Checking if password matches
    password = field.data
    email = form.data['email']
    user = User.query.filter(User.email == email).first()
    if not user:
        raise ValidationError('No such user exists.')
    if not user.check_password(password):
        raise ValidationError(
            'Sorry, your password was incorrect. Please double-check you password')


class LoginForm(FlaskForm):
    email = StringField('email',
                        validators=[
                            DataRequired("You must enter an email"),
                            user_exists,
                            Email()])
    password = StringField('password',
                           validators=[
                               DataRequired("You must enter a password"),
                               password_matches])
