  
  /* core */
  function score(b) { // count composition
      var s = 1
      for(var i = 1; i <= mx; i++) {
          for(var p = 0; p < b.length; p++) {
              var c = 0
              for(var e = p; e < b.length; e = e + i) {
                  if(b[e] == i.toString() && !b[e].mark && b[e].mark != i) {
                      b[e].mark = i // marked numbers are in some sequence
                      c++ // count the sequence length
                      } else { break }
                  }
              c? (s *= c) : 0 // compose if something is to
              }
          }
      return s // return current score
      };

  function clear() {
      for(var i = 0; i < board.length; i++) {
          board[i].mark = null
          }
      };

  function swap(p1, p2) {
      moves++
      var i1 = board[p1]
      var i2 = board[p2]
      board.splice(p1, 1, i2) // replace the positions of board
      board.splice(p2, 1, i1)
      };

  function pairs(brd) { // check every item has at least similar one
      let paired = []
      for(var x = 0; x < brd.length; x++) {
          let e = JSON.parse(brd[x]) // fix problem with types (new String(1) == new String(1)) is false
          if(!paired.includes(e)) {
              for(var i = 0; i < brd.length; i++) {
                  if(e == JSON.parse(brd[i]) && x != i) { paired.push(e); break }
                  }
              }
          if(paired.length == mx) { return true }
          };
      };

  function entergame() { // slow random board generator
      moves = 0;
      do { // finally needed
          board = Array.from({ length: width }, () => new String(Math.floor(Math.random() * mx)+1))
          } 
      while(score(board) > mx || !pairs(board));
      
      origin = Array.from(board) // Avoid legacy
      makeboard()
      drop()
      };

  function playback() {
      moves = 0
      board = Array.from(origin)
      makeboard()
      drop()
      };

  /* graphics */  
  function makeboard() {
      clear() // marks should be updated
      var sc = score(board)
      draw(board)
      document.getElementById("score").innerHTML = `Score ${sc}`
      document.getElementById("moves").innerHTML = `Moves ${moves}`  
      };

  function draw(brd) {
      ctx.clearRect(0,0,canv.width, canv.height)
      for(let i = 0; i < board.length; i++) {
          var r = board[i]
          if(r==1) { dr("white", i) } // lol (1 == "1") still works
          if(r==2) { dr("violet", i) }
          if(r==3) { dr("khaki", i) }
          if(r==4) { dr("red", i) }
          }
      };

  function dr(color, i) { // separation is good for testing
      ctx.fillStyle = color;
      if((action || action ===0) && board[i].mark == JSON.parse(board[action])) { 
          ctx.fillStyle = "rgba(255,255,255, 0.1)"; ctx.fillRect(i*clwidth, 0, clwidth, clwidth)
       }
      ctx.fillText(board[i].toString(), (i+0.3)*clwidth, clwidth*0.8)
      };

  /* events */
  
  function X(e) {
      return e.pageX-canv.offsetLeft
      };

  /*
    Important to use `e.preventDefault()`, because Mouse event affect touch simulator!
    Mobile devices also combine touch with mouse!
    */
  
  var action = false
  function mdn(e, tp) {
      canv.style.cursor = "grab"
      var p = Math.floor(X(e)/ clwidth)
      action = p
      canv.style.borderBottom = "2px solid #2b827a"
      };

  canv.addEventListener("mousedown", function(e) { e.preventDefault(); mdn(e, "mouse"); return false })
  
  function mup(e, tp) {
      if( action || action === 0 ) { // keep in mind (0 == false) returns (true)
          var p = Math.floor(X(e) / clwidth)
          if(p != action) { 
              var u = action; action = p; swap(p, u);
              };
          makeboard()
          drop()
          return true // need for touch events
          }; 
      };

  function drop() {
      canv.style.cursor = "default"
      canv.style.borderBottom = "" // border is already set by css
      action = false
      };

  document.addEventListener("mouseup", function(e) { e.preventDefault(); mup(e, "mouse"); return false })
  
  canv.addEventListener("touchstart", function(e) {
      e.preventDefault() // important for testing
      if(!mup(e.touches[0], "touch")) { mdn(e.touches[0], "touch") };
      return false // reduces noise events on some engines
      })

  document.addEventListener("keydown", function(e) {
     if(e.key == "@") { playback() }
     if(e.key == "#") { entergame() }
    })

  window.onresize = function() { resize() };

  window.onload = function() {  
      makeboard(); entergame(); resize()
      };
 // How small peace of code meets all JavaScript problems? I don't really kow ;)

