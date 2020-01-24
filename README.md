# The Pokemon Drinking Game
The not to well known drinking board game brought to the web! Keep track of where you are, what to do, and play when you don't have a board or dice. Regardless of how you play, this will help in those times when you get too wasted to keep track of anything!


[![](https://i.imgur.com/7nf8gp2.png)](https://i.imgur.com/7nf8gp2.png)
[![](https://i.imgur.com/tRqMKep.png)](https://i.imgur.com/tRqMKep.png)



## Technologies Used
React.js; Node.js; Express; Socket.io; Mongoose.js; MongoDB; Atlas; Heroku; CSS; JSONWebToken
### Getting Started
Follow my progress on Trello!
[Trello](https://trello.com/b/VVrzHGDH/pokemon-gamehttp:// "Trello")
Play below!
[Pokemon Drinking Game](http://https://pokemon-drinking-game.herokuapp.com/ "Pokemon Drinking Game")
### How to Play
Each player chooses a starter pokemon. How you determine who goes first is up to you. Once everyone has a selected pokemon, a player rolls a single dice. Whatever square they land on, they must do whatever that square dictates. Then the next person may go.

If 2 players land on the same square, they must battle. A battle is determined by who rolls the higher number. The loser takes 2 drinks (sips, or shots, or however you want to determine this), or both players take 1 drink if it is a tie. If the player has a type advantage on another player, they may roll the dice twice (the two rolls are not added, it is just a reroll). If a player lands on a square with multiple players on them, he or she must battle each of them. 

Grey squares have an effect which is described on the first square of a grey zone. The effect will be active as long as the player is on the square. 

Players must stop at each gym or yellow square regardless of a roll and defeat the gym leader or boss.

Get to the end, and you will win, but you probably won't remember it.

### Unsolved Problems
- Some routes still lack authentication checks and will throw an error if accessed directly via the url.
- Some AJAX requests have not yet been coded to properly handle errors.

## Future Enhancements
1.  Include a dice svg that can be animated instead of a button that will generate a random number for users that do not have a dice.
2.  Prompt users to add or generate, based on the square, an effect that remains active during the game when landed on that is displayed in an expandable sidebar (expandable because the whole point is to get people to mess up on these active effects, and it being visible all the time will reduce those chances)
3.  Allow users to click on their player card to see any current active effects on them.
4.  Implement a "undo" feature incase users misclick
5.  Allow users to join a game session via the game's keyCode and play a game updated in real time via socket.io (or another package)
6.  Allow users to resume a game session from their 'My Games' page. 
7.  Automatically save the game to the user's "My Games" if they log in during the middle of a game instead of only saving the game to the "My Games" of a logged in creator.
8.  Convert the board to SVG so it can be made modular instead of an image.
9.  Allow Players to select their pokemon type and have a visual cue to indicate which pokemon they have.
10.  Include pieces on the board for each player that can move and animate.
11.  Include a high scores page.
12.  Include an event display on the top that will display the square that was just landed on.
13.  Allow players to select unique pokemon pieces based on the three type advantages water, grass, and fire.
14.  Give players the option to choose what type of drink they are using for a "full drink" if they want to keep track of it in their "My Games" page.
15.  Include "Pokemon Masters" in the High Scores Page.
16.  Allow users to change the order of who goes when adding players.