# Petsagram

Petsagram is a fullstack web application modeled after the popular social media app, Instagram. Signed up users have the ability to post images of pets or animals, comment on and like other users posts.

Visit the live site here :https://petsagram-solo.herokuapp.com/

## Technologies Used
* **Languages:** Javascript, Python, HTML/CSS
* **Backend:** Flask
* **Frontend:** React, Redux
* **Database:** PostgreSQL
* **Hosting:** Heroku
* **Cloud Computing Service:** AWS

## Links
* [Visit Live Site](https://petsagram-solo.herokuapp.com/)
* [Feature List](https://github.com/lynnluong04/Petsagram/wiki/Features)
* [Database Schema](https://github.com/lynnluong04/Petsagram/wiki/DB-Schema)
* [User Stories](https://github.com/lynnluong04/Petsagram/wiki/User-Stories)


## How to Start the Development Environment
1. Clone this repository
    git clone https://github.com/lynnluong04/Petsagram.git
2. Install dependencies
    pipenv install --dev -r dev-requirements.txt && pipenv install -r requirements.txt
3. Create a **.env** file based on the example with the proper settings for your development environment
4. Setup your PostgresSQL user,password, and database and make sure it matches with your **.env** file
5. Enter your environment, migrate your database, seed your database, and run your flask app
    * pipenv shell
    * flask db upgrade
    * flask seed all
    * flask run
6. Go into your react app directory and install dependencies and run the app
    * npm install
    * npm start
7. Open your browser and go to the localhost address your are running the app in


## Future Features to Implement
* Followers
* Direct Messaging
* Discover
* Hashtags
* Tagging
* Saving posts
* Videos
