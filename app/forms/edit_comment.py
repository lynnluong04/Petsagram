from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired

class EditComment(FlaskForm):
    content = StringField("Content", [DataRequired(message="You tried submitting an empty comment or invalid data")])
