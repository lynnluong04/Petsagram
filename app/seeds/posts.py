from app.models import db, Post
from datetime import datetime


def seed_posts():
    post1 = Post(owner_id=1, media_url="https://www.linkpicture.com/q/LPic62eab987e02431653264354.jpg", caption="Hi, I'm Gimo the cat", created_at=datetime.now())
    post2 = Post(owner_id=1, media_url="https://www.linkpicture.com/q/LPic62eaba93dad51453966762.jpg", caption="I like fish", created_at=datetime.now())
    post3 = Post(owner_id=1, media_url="https://www.linkpicture.com/q/LPic62eabac148831993770366.jpg", caption="", created_at=datetime.now())

    db.session.add(post1)
    db.session.add(post2)
    db.session.add(post3)
    db.session.commit()


def undo_posts():
    db.session.execute('TRUNCATE posts RESTART IDENTITY CASCADE;')
    db.session.commit()
