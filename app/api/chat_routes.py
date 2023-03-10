from flask import Blueprint, request
from app.forms.dm_form import DMForm
from app.models import DirectMessage, db, User

chat_routes = Blueprint('chat', __name__)

@chat_routes.route('/dms/<int:user_id>', methods=['GET'])
def get_dms(user_id):
  sender = User.query.get(user_id)
  print('backend route!!!!!!!-------------------')
  print(sender.messages_sent)
  messages_sent = sender.messages_sent
  return {'dm_messages': [message.to_dict() for message in messages_sent]}

@chat_routes.route('/dms', methods=['GET','POST'])
def post_dm_messages():
  print('HITTING BACKEND ROUTE!!!!')
  form = DMForm()
  print('FORM DATA', form.data)
  form['csrf_token'].data = request.cookies['csrf_token']
  if form.validate_on_submit():
    message = DirectMessage(
      sender_id=form.data['sender_id'],
      recipient_id=form.data['recipient_id'],
      message_body =form.data['message_body'],
      created_at=form.data['created_at']
    )
    db.session.add(message)
    db.session.commit()
    print('message', message.to_dict())
    return message.to_dict()
