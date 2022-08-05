from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import Comment

comment_routes = Blueprint('comments', __name__)

@comment_routes.route('/<int:postId>')
def all_comments(postId):
    print("ALL COMMENTS BACKEND!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
    # print("FROM THE BACKEND ROUTE----------------------------------------")
    comments = Comment.query.filter_by(post_id=postId).all()
    # print([post.to_dict() for post in posts])
    # print("-----------------------------------------------------------")
    return {'comments': [comment.to_dict() for comment in comments]}
