from flask import Blueprint, jsonify, request
from app.models import Comment, db
from app.forms.edit_comment import EditComment
from app.forms.comment_form import CommentForm

comment_routes = Blueprint('comments', __name__)

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

@comment_routes.route('/')
def all_comments():
    comments = Comment.query.all()
    return {'comments': [comment.to_dict() for comment in comments]}

@comment_routes.route('/', methods=['POST'])
def create_comment():
    form = CommentForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        comment = Comment(post_id=form.data['post_id'],
                    owner_id=form.data['owner_id'],
                    content=form.data['content'],
                    created_at=form.data['created_at']
        )
        db.session.add(comment)
        db.session.commit()
        # print("from backend after validate ", comment)
        return comment.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

@comment_routes.route('/<int:commentId>/', methods=['PUT'])
def edit_comment(commentId):
    form = EditComment()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        comment = Comment.query.get(commentId)
        data = request.json
        comment.content = data['content']
        db.session.commit()
        return comment.to_dict()
    return {'errors':validation_errors_to_error_messages(form.errors)}, 401

@comment_routes.route("/<int:commentId>", methods=['DELETE'])
def delete_comment(commentId):
    comment = Comment.query.get(commentId)
    # print("DELETE COMMENT API ROUTE", comment)
    db.session.delete(comment)
    db.session.commit()
    return f'{commentId}'
