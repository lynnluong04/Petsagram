from app.models import db, Post
from datetime import datetime


def seed_posts():
    post1 = Post(owner_id=1, media_url="https://petsagram-content.s3.amazonaws.com/LPic62eaba93dad51453966762.png", caption="Hi, I'm Gimo the cat", created_at=datetime.now())
    post2 = Post(owner_id=1, media_url="https://petsagram-content.s3.amazonaws.com/LPic62eabac148831993770366.png", caption="I like fish", created_at=datetime.now())
    post3 = Post(owner_id=1, media_url="https://petsagram-content.s3.amazonaws.com/ezgif.com-gif-maker.jpg", caption="", created_at=datetime.now())

    db.session.add(post1)
    db.session.add(post2)
    db.session.add(post3)
    db.session.commit()


def undo_posts():
    db.session.execute('TRUNCATE posts RESTART IDENTITY CASCADE;')
    db.session.commit()
