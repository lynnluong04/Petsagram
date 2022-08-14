from app.models import db, User


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='Demo', name="Demo User", email='demo@aa.io', password='password', bio="I am a demo user")
    fallpets = User(
        username='FallPets', name="88's pets", email='fallpets@aa.io', password='password', bio="Room 88's Pets")
    axel = User(
        username='axelotl', name="Axel", email='axel@aa.io', password='password', bio="Hi I'm Axel, the axolotl")

    db.session.add(demo)
    db.session.add(fallpets)
    db.session.add(axel)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
