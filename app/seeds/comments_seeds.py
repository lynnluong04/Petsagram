from app.models import db, Comment
from datetime import datetime
from app.models.db import db, environment, SCHEMA


def seed_comments():
    comment1 = Comment(post_id=1, owner_id=2, content='so cute!', created_at=datetime.now())
    comment2 = Comment(post_id=1, owner_id=3, content='cutest cat!', created_at=datetime.now())

    db.session.add(comment1)
    db.session.add(comment2)
    db.session.commit()

def undo_comments():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.comments RESTART IDENTITY CASCADE;")
    else:
        db.session.execute('TRUNCATE comments RESTART IDENTITY CASCADE;')
    db.session.commit()
