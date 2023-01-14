from app.models import db, User
from app.models.db import db, environment, SCHEMA


# Adds a demo user, you can add other users here if you want
def seed_users():
    demouser = User(
        username='User', name="Demo User", email='demouser@aa.io', password='password', bio="I am a demo user")
    jadepets = User(
        username='JADEpets', name="88's pets", email='jadepets@aa.io', password='password', bio="Room 88's Pets")
    axelthelotl = User(
        username='axel', name="Axel", email='axelotl@aa.io', password='password', bio="Hi I'm Axel, the axolotl")

    db.session.add(demouser)
    db.session.add(jadepets)
    db.session.add(axelthelotl)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")

    else:
        db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
