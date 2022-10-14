from flask import Blueprint, request
from flask_login import current_user, login_required
from app.forms.edit_post import EditPost
from app.forms.post_form import PostForm
from sqlalchemy import or_
from app.models import Post, db
from app.s3_helpers import (
    upload_file_to_s3, allowed_file, get_unique_filename)
from app.models.follow import follows
post_routes = Blueprint('posts', __name__)

@post_routes.route('/')
@login_required
def followed_posts():
    posts = Post.query.join(
        follows, (follows.c.followee == Post.owner_id)).filter(or_(
        follows.c.follower == current_user.id,
        Post.owner_id == current_user.id)).order_by(Post.id.desc()).all()

    # following_posts = Post.query.join(
    # follows, (follows.c.followee == Post.owner_id)).filter(
    #     follows.c.follower == current_user.id).all()
    # my_posts = Post.query.filter_by(owner_id=current_user.id).all()

    # posts = my_posts + following_posts

    return {'posts': [post.to_dict() for post in posts]}

@post_routes.route('/<int:userId>')
@login_required
def user_posts(userId):
    ("----------HITTING GET ROUTE-----------------")
    posts = Post.query.filter_by(owner_id=userId).all()
    # print("FROM THE BACKEND ROUTE----------------------------------------")
    # print([post.to_dict() for post in posts])
    # print("-----------------------------------------------------------")
    return {'posts': [post.to_dict() for post in posts]}

@post_routes.route('/', methods=['POST'])
def create_post():
    print("----------HITTING POST ROUTE-----------------")
    # form = PostForm()
    # form['csrf_token'].data = request.cookies['csrf_token']
    # if form.validate_on_submit():
    #     post = Post(owner_id=form.data['owner_id'],
    #                 media_url=form.data['media_url'],
    #                 caption=form.data['caption'],
    #                 created_at=form.data['created_at']
    #     )

    if "image" not in request.files:
        return {"errors": "image required"}, 400

    image = request.files["image"]

    if not allowed_file(image.filename):
        return {"errors": "file type not permitted"}, 400

    image.filename = get_unique_filename(image.filename)

    upload = upload_file_to_s3(image)

    if "url" not in upload:
        # if the dictionary doesn't have a url key
        # it means that there was an error when we tried to upload
        # so we send back that error message
        return upload, 400

    url = upload["url"]

    post = Post(owner_id=current_user.id, media_url=url, caption=request.form.get('caption'))
    db.session.add(post)
    db.session.commit()
    # print("from backend after validate ", post)
    return post.to_dict()

@post_routes.route('/<int:postId>/', methods=['PUT'])
def edit_post(postId):
    ("----------HITTING PUT ROUTE-----------------")
    form = EditPost()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        # print("FORMDATA", form.data)
        post = Post.query.get(postId)
        data = request.json
        post.caption = data['caption']
        db.session.commit()
        return post.to_dict()

@post_routes.route("/<int:postId>", methods=['DELETE'])
def delete_post(postId):
    post = Post.query.get(postId)
    db.session.delete(post)
    db.session.commit()
    return f'{postId}'


@post_routes.route("/<int:postId>/like", methods=['POST'])
def like_post(postId):
    print("----------HITTING LIKE ROUTE-----------------")
    post = Post.query.get(postId)
    post.users_who_liked.append(current_user)
    db.session.commit()
    return post.to_dict()

@post_routes.route("/<int:postId>/unlike", methods=['PUT'])
def unlike_post(postId):
    print("----------HITTING UNLIKE ROUTE-----------------")
    post = Post.query.get(postId)
    post.users_who_liked.remove(current_user)
    db.session.commit()
    return post.to_dict()
