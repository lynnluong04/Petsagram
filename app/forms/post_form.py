from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, DateTimeField
from wtforms.validators import DataRequired, ValidationError, Length



class PostForm(FlaskForm):
    owner_id = IntegerField("Owner Id", validators=[DataRequired()])
    media_url = StringField("Media Url", validators=[DataRequired()])
    caption = StringField("Caption", validators=[Length(min=0, max=2200, message="Caption cannot be more than 2,000 characters")])
    created_at = DateTimeField('created_at', format="%Y-%m-%d %H:%M:%S", validators=[DataRequired()])
