from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, DateTimeField

class EditPost(FlaskForm):
    caption = StringField("Caption")
