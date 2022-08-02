from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import Comment

post_routes = Blueprint('posts', __name__)
