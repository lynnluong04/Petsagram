from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.forms.edit_user import EditUserForm
from app.models import User, db

user_routes = Blueprint('users', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{error}')
            # errorMessages.append(f'{field} : {error}')
    return errorMessages

@user_routes.route('/')
@login_required
def users():
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    user = User.query.get(id)
    return user.to_dict()


@user_routes.route('/<int:id>', methods=['PUT'])
def edit_user(id):
    print("--------HITTING BACKEND EDIT USER------------")
    form = EditUserForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        user = User.query.get(id)
        data = request.json

        user.name = data['name']
        db.session.commit()

        user.username = data['username']
        db.session.commit()

        user.email = data['email']
        db.session.commit()

        user.bio = data['bio']
        db.session.commit()

        return user.to_dict()

    return {'errors':validation_errors_to_error_messages(form.errors)}, 401
