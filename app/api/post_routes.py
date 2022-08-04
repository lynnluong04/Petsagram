from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.forms.post_form import PostForm
from app.models import Comment, Post, db

post_routes = Blueprint('posts', __name__)

@post_routes.route('/')
def all_posts():
    posts = Post.query.all()
    # print("FROM THE BACKEND ROUTE----------------------------------------")
    # print([post.to_dict() for post in posts])
    # print("-----------------------------------------------------------")
    return {'posts': [post.to_dict() for post in posts]}

@post_routes.route('/<int:userId>')
def user_posts(userId):
    posts = Post.query.filter_by(owner_id=userId).all()
    # print("FROM THE BACKEND ROUTE----------------------------------------")
    # print([post.to_dict() for post in posts])
    # print("-----------------------------------------------------------")
    return {'posts': [post.to_dict() for post in posts]}

# @post_routes.route('/', methods=['POST'])
# def create_post():
#     form = PostForm()
#     form['csrf_token'].data = request.cookies['csrf_token']
#     if form.validate_on_submit():
#         post = Post(owner_id=form.data['owner_id'],
#                     media_url=form.data['media_url'],
#                     caption=form.data['caption'],
#                     created_at=form.data['created_at']
#         )
#         db.session.add(post)
#         db.session.commit()
#         return post.to_dict()
