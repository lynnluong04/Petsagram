from flask import Blueprint, jsonify, request
from app.models import Comment, db
from app.forms.edit_comment import EditComment

comment_routes = Blueprint('comments', __name__)

@comment_routes.route('/')
def all_comments():
    print("ALL COMMENTS BACKEND!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
    # print("FROM THE BACKEND ROUTE----------------------------------------")
    comments = Comment.query.all()
    # print([post.to_dict() for post in posts])
    # print("-----------------------------------------------------------")
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
        print("from backend after validate ", comment)
        return comment.to_dict()

@comment_routes.route('/<int:commentId>/', methods=['PUT'])
def edit_comment(commentId):
    print("FROM THE BACKEND ROUTE----------------------------------------", request.json)
    form = EditComment()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        print("FORMDATA", form.data)
        comment = Comment.query.get(commentId)
        data = request.json
        comment.content = data['content']
        db.session.commit()
        return comment.to_dict()
