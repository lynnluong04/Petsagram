from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, DateTimeField
from wtforms.validators import DataRequired


class DMForm(FlaskForm):
    sender_id = IntegerField('sender_id', validators=[DataRequired()])
    recipient_id = IntegerField('recipient_id', validators=[DataRequired()])
    message_body = StringField('message_body', validators=[DataRequired()])
    created_at = DateTimeField('created_at', format="%Y-%m-%d %H:%M:%S", validators=[DataRequired()])
