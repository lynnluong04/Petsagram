from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, DateTimeField
from wtforms.validators import DataRequired

class CommentForm(FlaskForm):
    post_id = IntegerField("Post Id", [DataRequired()])
    owner_id = IntegerField("Owner Id", [DataRequired()])
    content = StringField("Content", [DataRequired()])
    created_at = DateTimeField('created_at', format="%Y-%m-%d %H:%M:%S", validators=[DataRequired()])
