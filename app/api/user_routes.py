from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from flask_wtf.csrf import validate_csrf
from app.forms.edit_user import EditUserForm
from app.forms.empty_form import EmptyForm
from app.models import User, db
from app.s3_helpers import (
    upload_file_to_s3, allowed_file, get_unique_filename)

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
    # print("--------HITTING BACKEND EDIT USER------------")
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

@user_routes.route('/profile-pic', methods=['POST'])
def profile_pic():
        print("REACHING BACKEND PROF PIC-----------------------------------")
    # try:
    #     validate_csrf(request.cookies['csrf_token'])
        if "image" not in request.files:
            return {"errors": "image required"}, 400

        image = request.files["image"]

        if not allowed_file(image.filename):
            return {"errors": "file type not permitted"}, 400

        image.filename = get_unique_filename(image.filename)

        upload = upload_file_to_s3(image)

        if "url" not in upload:
            return upload, 400

        url = upload["url"]
        print("IMAGE URL FROM BACKEND!!!!!!!!!!!!!!!!!!", url)

        user = User.query.get(current_user.id)
        user.photo_url=url
        db.session.commit()
        return user.to_dict();
    # except:
    #     return {'errors': 'Invalid csrf token'}, 400

@user_routes.route('/<int:id>/follow', methods=['POST'])
def follow():
    form = EmptyForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        user = User.query.get(id)
        current_user.follow(user)
        db.session.commit()
        return "not sure yet"


@user_routes.route('/<int:id>/unfollow', methods=['POST'])
def unfollow():
    form = EmptyForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        user = User.query.get(id)
        current_user.unfollow(user)
        db.session.commit()
        return "not sure yet"
