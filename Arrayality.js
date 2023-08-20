
  
  /* core */
  function score(b) {
      var s = 1
      for(var i = 1; i <= mx; i++) {
          for(var p = 0; p < b.length; p++) {
              var c = 0
              for(var e = p; e < b.length; e = e + i) {
                  if(b[e] == i.toString() && !b[e].mark && b[e].mark != i) {
                      b[e].mark = i
                      c++
                      } else { break }
                  }
              c? (s *= c) : 0
              }
          }
      return s
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
      board.splice(p1, 1, i2)
      board.splice(p2, 1, i1)
      makeboard()
      };

  function entergame() { // slow
      moves = 0;
      do {
          board = Array.from({ length: width }, () => new String(Math.floor(Math.random() * mx)+1))
          } 
      while(score(board) > mx);
      
      origin = Array.from(board)
      makeboard()
      };

  function playback() {
      moves = 0
      board = Array.from(origin)
      makeboard()
      };

  /* graphics */
  
  function makeboard() {
      clear()
      var sc = score(board)
      draw(sc)
      document.getElementById("score").innerHTML = `Score ${sc}`
      document.getElementById("moves").innerHTML = `Moves ${moves}`  
      };

  function draw(s) {
      ctx.clearRect(0,0,canv.width, canv.height)
      for(var i = 0; i < board.length; i++) {
          // switch case glitches! (because of string type)
          if(board[i] == "1") { dr("white", i); }
          if(board[i] == "2") { dr("violet", i); }   
          if(board[i] == "3") { dr("khaki", i); }
          if(board[i] == "4") { dr("red", i); }   
          }
      };

  function dr(color, i) { 
      ctx.fillStyle = color
      ctx.fillText(board[i].toString(), (i+0.3)*clwidth, clwidth*0.8)
      };

  /* events */
  
  function X(e) {
      return e.pageX-canv.offsetLeft
      };

  /*
    Watch out! Mouse events may affect touch simulator!
    Keep using `e.preventDefault()`
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
          canv.style.cursor = "default"
          canv.style.borderBottom = ""
          var p = Math.floor(X(e) / clwidth)
          if(p != action) {
              swap(action, p)
              }; action = false
          }
      };

  document.addEventListener("mouseup", function(e) { e.preventDefault(); mup(e, "mouse"); return false })
  
  canv.addEventListener("touchstart", function(e) {
      e.preventDefault() // important for testing, good for gameplay
      if(action || action === 0) { mup(e.touches[0], "touch") } else { mdn(e.touches[0], "touch") }
      return false // reduces noise events on some engines
      })
  
  function resize() {
      canv.style.marginLeft = (innerWidth-canv.width)/2 + "px"
      canv.style.marginTop = (innerHeight-canv.height)/2 - 110 + "px"
      };

  window.onresize = function() { resize() };

  window.onload = function() {  
      makeboard(); entergame(); resize()
      };

