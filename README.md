# Color-Code-Game
# Teamwork-JS

* The website includes the following pages:
    - Home page
    - Sign up
    - Sign in
    - Game
    - Scores


1. Home page:
    - On this page, the player must select the level of the game. and then go to the game page by clicking on the start of the game. 

    - The player should not be allowed to start the game before login.

    - After login, the player's name and score should be displayed on this page.

    - If the player is login, the sign-in or sign-up should not be shown.


2. Sign-up page:
    - Includes input of name and email, password and password repetition.

    - If the email was duplicated, it should be announced that the email is available.

    - If the password and password repetition are not the same, it should give an error.

    - After signing up, the user must go to the Sign-in page.


3. Sign-in page:
    - If it is a new email, it must be announced, register first..

    - If the password is wrong, it should be announced that the password is wrong.

    - After signing in, this user must go to the home page.


4. Game page:
    - On this page, there should be a number of colors for the user to choose. (red, yellow, orange, green, purple and blue)

    - We have a timer on this page, which has a different time based on the level selected by the user. (easy: 5 minutes, medium: 10 minutes, hard: 15 minutes)

    - When we reach the last 10 seconds, the timer should turn red.

    - If the time runs out and the user does not find the password, the game ends and the player loses.

    - The player can try 10 times if after 10 guesses he is with the loser and the game ends.

    - The player must see the previous guesses.

    - In each guess, the player must be told how many colors are correct and how many colors are correct but in the wrong place.

    - A random password must be generated with colors(red, yellow, orange, green, purple and blue) for the player to guess. 

    - The length of the password depends on the chosen level of the player. (easy: 6, medium: 8 and hard: 10)

    - The player is not allowed to choose more or less than the specified color.

   -  When the user loses, the password should be shown, then return to the home page.

    - If the player guesses the password correctly, he must get the score of that game and his score will be updated.

    - The amount of points is based on the level of the game. (easy: 5 points, medium: 10 points and hard: 20 points)


5. Points Scores:
    - On this page, there should be the names and points of the players who have the most points.

    - It should be possible to see 10 players with the lowest points.


**hint: You can use the (https://mockapi.io/) website to create an API.
