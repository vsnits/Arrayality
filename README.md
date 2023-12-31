
# !
# Not active brunch
# For recent changes refer
# github.com/vsnits
# 
# 

# Arrayality intro
    A logical game JavaScript (open source) powered & light-weight

# Gameplay
 Compose the numbers in the array to get the highest score in the fewest moves. <br>
 The score is calculated by multiplying a series of the same numbers. <br>
 Units shall be next to each other, deuces through one, three through two, and so on.

# Scores
  Arrays generated randomly (with a low starting score), so the maximum score is a kind of question. <br>
  A typical score (for `4c16` board) is `192` while `216` and `256` is usually possible. <br>
  The score `288` perfect for the most sets, rarely `340` also possible. <br>
  The theoretical maximum score has no proof at this time.

# Battle

* Clone game source code and open index.html
* Sync sets running in console
```js
 insert([]) // write array manually
```
* Choose time and claim refery
* Start countdown & competition

### Rules:

When someone is ready, refery stops countdown, records score, moves and time. <br>
Then, countdown will continue untill all players are ready or the time is out, then results compared. <br>

Wins player who: <br>

  1) Made the best score
  2) Completed in fewest moves
  3) Done in the best time
  4) Wins tie-break fight
   
# Running offline
 ```shell
  # locate the directory
  $ git clone https://github.com/vsnits/Arrayality/ [destination]
  # open Arrayality/index.html
 ```

# Custom sets
  By default arrayality loads `4c16` board which contains four colors and sixteen positions. <br>
  It's also possible to generate random four color sets on any board using
  ```js
   tune(width=Number) // e.g tune(10) sets 4c10 board
  ```
 And even solve custom sets which are used for tournaments
 ```js
 insert(set=Array) // e.g insert([1,1,2,2,3,3,2,1]) builds 3c8 board
 ```

 # Lisence
   The Unlicense
   
