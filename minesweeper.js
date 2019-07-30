document.addEventListener('DOMContentLoaded', startGame)

// Define your `board` object here!
var board = {}
board.cells = []
boardHeight = 6

function createCell(num){
  for (r=0; r<num; r++){
    for(c=0; c<num; c++){
      newCell = {}
      newCell.row = r
      newCell.col = c
      newCell.isMine = Math.random() < 0.25
      newCell.isMarked = false
      newCell.hidden = true
      board.cells.push(newCell)
    }
  }
}

createCell(boardHeight)

function startGame () {
  // Don't remove this function call: it makes the game work!
   for(var i=0; i<board.cells.length; i++){
    board.cells[i].surroundingMines = countSurroundingMines(board.cells[i])
   }
   document.addEventListener("click", checkForWin)
   document.addEventListener("contextmenu", checkForWin)
   document.getElementById("board").addEventListener("click", checkForLoss)
   document.getElementById("reset").addEventListener("click", resetBoard)
  lib.initBoard()
}

function checkForLoss(){
  for(i=0;i<board.cells.length;i++){
    if(board.cells[i].isMine === true && board.cells[i].isMarked === false && board.cells[i].hidden === false){
      var audio = new Audio('audio/explosion-3.wav')
      audio.play()
      }
   }
}

// Define this function to look for a win condition:
//
// 1. Are all of the cells that are NOT mines visible?
// 2. Are all of the mines marked?
function checkForWin () {
  for(i=0;i<board.cells.length;i++){
    if (board.cells[i].hidden === true && board.cells[i].isMine === false){
      return
    } else if (board.cells[i].isMine === true && board.cells[i].isMarked === false){
      return
    }
  } lib.displayMessage("You're a hero!")
  let audio = new Audio('audio/win-music.wav')
  audio.play()

  // You can use this function call to declare a winner (once you've
  // detected that they've won, that is!)
  //   lib.displayMessage('You win!')
}

// Define this function to count the number of mines around the cell
// (there could be as many as 8). You don't have to get the surrounding
// cells yourself! Just use `lib.getSurroundingCells`: 
//
//   var surrounding = lib.getSurroundingCells(cell.row, cell.col)
//
// It will return cell objects in an array. You should loop through 
// them, counting the number of times `cell.isMine` is true.
function countSurroundingMines (cell) {
  var surrounding = lib.getSurroundingCells(cell.row, cell.col)
  var count = 0
  for(i=0;i<surrounding.length;i++){
    if (surrounding[i].isMine === true)
    count +=1
  } return count
}

function resetBoard (){
  var boardNode = document.getElementById("board")
  boardNode.innerHTML = ""
  board.cells = []
  createCell(boardHeight)
  startGame()
}
 
