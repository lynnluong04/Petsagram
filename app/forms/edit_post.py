from flask_wtf import FlaskForm
from wtforms import StringField

class EditPost(FlaskForm):
    caption = StringField("Caption")
