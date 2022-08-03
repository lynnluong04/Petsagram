from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, DateTimeField
from wtforms.validators import DataRequired

class PostForm(FlaskForm):
    owner_id = IntegerField("Owner Id", [DataRequired()])
    media_url = StringField("Media Url", [DataRequired()])
    caption = StringField("Caption")
    created_at = DateTimeField('created_at', format="%Y-%m-%d %H:%M:%S", validators=[DataRequired()])
