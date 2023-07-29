
  let board, origin, mx = 4, width = 16, moves = 0
  let clwidth = Math.ceil(innerWidth*0.8 / (width))
  
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

  function entergame() {
      board = Array.from({ length: width }, () => new String(Math.floor(Math.random() * mx)+1))
      while(score(board) > mx) {
          board =  Array.from({ length: width }, () => new String(Math.floor(Math.random() * mx)+1))
          }
      origin = Array.from(board)
      makeboard()
      };

  function playback() {
      moves = 0
      board = Array.from(origin)
      makeboard()
      };

  /* graphics */
  var canv = document.getElementById("canv")
  canv.height = clwidth
  canv.width = width*clwidth
  var ctx = canv.getContext("2d")
  ctx.font = `${clwidth*0.8}px serif`
  
  function makeboard() {
      clear()
      var sc = score(board)
      draw(sc)
      document.getElementById("score").innerHTML = `Score ${sc}`
      document.getElementById("moves").innerHTML = `Moves ${moves}`  
      };

 // canv.style.border = "1px solid"
  function draw(s) {
      ctx.clearRect(0,0,canv.width, canv.height)
    /*  for(var i = clwidth; i < canv.width; i += clwidth) {
          ctx.beginPath()
          ctx.fillStyle = "black"
          ctx.fillRect(i, 0, 1, clwidth)
          ctx.closePath()
          } */
      for(var i = 0; i < board.length; i++) {
          // switch case glitches!
          if(board[i] == "1") { dr("blue", i); }
          if(board[i] == "2") { dr("orange", i); }   
          if(board[i] == "3") { dr("green", i); }
          if(board[i] == "4") { dr("red", i); } 
          if(board[i] == "5") { dr("purple", i); }  
          }
      };

  function dr(color, i) { 
      ctx.fillStyle = color
      ctx.fillText(board[i].toString(), (i+0.3)*clwidth, clwidth*0.8)
      };

  /* events */
  
  function X(e) {
      console.log(e)
      return e.pageX-canv.offsetLeft
      };

  /*
    Heads up! Mouse events may affect touch simulator!
   */
  var action = false
  function mdn(e) {
      // console.error(action)
      canv.style.cursor = "grab"
      var p = Math.floor(X(e)/ clwidth)
      action = p
      };
  canv.onmousedown = mdn

  function mup(e) {
      if(action || action === 0) { // keep in mind (0 == false) returns (true)
          canv.style.cursor = "default"
          var p = Math.floor(X(e) / clwidth)
          swap(action, p)
          action = false
          }
       };
  document.onmouseup = mup
 
  canv.addEventListener("touchstart", function(e) {
      (action || action === 0)? mup(e.touches[0]) : mdn(e.touches[0])
      })

  function resize() {
      canv.style.marginLeft = (innerWidth-canv.width)/2 + "px"
      canv.style.marginTop = (innerHeight-canv.height)/2 - 2*clwidth + "px"   
      };

  window.onresize = function() { resize() };

  window.onload = function() {   entergame(); resize() };

