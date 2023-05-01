class Box {
    constructor(element) {
        this.element = element
        this.number = 0
    }
}

const one = new Box(document.querySelector("main #grid .box#one"))
const two = new Box(document.querySelector("main #grid .box#two"))
const three = new Box(document.querySelector("main #grid .box#three"))
const four = new Box(document.querySelector("main #grid .box#four"))
const five = new Box(document.querySelector("main #grid .box#five"))
const six = new Box(document.querySelector("main #grid .box#six"))
const seven = new Box(document.querySelector("main #grid .box#seven"))
const eight = new Box(document.querySelector("main #grid .box#eight"))
const nine = new Box(document.querySelector("main #grid .box#nine"))

const availableSlots = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine"]
let twoPlayers = false
let firstPlayersMove = true
let gamePaused = false

const boxes = document.querySelectorAll("main #grid .box")

boxes.forEach(box => box.addEventListener("click", () => {
    
    if (!gamePaused) {
        if (box.children[0].textContent === "" && firstPlayersMove) {

            aMove(box.getAttribute("id"), 1)
            determineResult(1)
            
            
            if (!gamePaused) {
                if (twoPlayers)
                    firstPlayersMove = false
                else {
                    gamePaused = true
                    setTimeout(function(){
                        const bestSpot = minimax(origBoard, aiPlayer)
                        const computerMove = availableSlots[bestSpot.index]
                        aMove(computerMove, 2)
                        gamePaused = false
                        determineResult(2)
                    }, 500);
                }
            }

        } else if (box.children[0].textContent === "" && !firstPlayersMove) {
            
            aMove(box.getAttribute("id"), 2)
            firstPlayersMove = true
            determineResult(2)
        }
    }
}))

function aMove(boxId, whichPlayer) {

    let sign = "X"

    if (whichPlayer == 2)
        sign = "O"

    switch(boxId) {
        case "one":
            one.number = whichPlayer
            one.element.children[0].textContent = sign
            one.element.classList.add("filled")
            origBoard[0] = sign
            break
        
        case "two":
            two.number = whichPlayer
            two.element.children[0].textContent = sign
            two.element.classList.add("filled")
            origBoard[1] = sign
            break

        case "three":
            three.number = whichPlayer
            three.element.children[0].textContent = sign
            three.element.classList.add("filled")
            origBoard[2] = sign
            break

        case "four":
            four.number = whichPlayer
            four.element.children[0].textContent = sign
            four.element.classList.add("filled")
            origBoard[3] = sign
            break

        case "five":
            five.number = whichPlayer
            five.element.children[0].textContent = sign
            five.element.classList.add("filled")
            origBoard[4] = sign
            break

        case "six":
            six.number = whichPlayer
            six.element.children[0].textContent = sign
            six.element.classList.add("filled")
            origBoard[5] = sign
            break

        case "seven":
            seven.number = whichPlayer
            seven.element.children[0].textContent = sign
            seven.element.classList.add("filled")
            origBoard[6] = sign
            break

        case "eight":
            eight.number = whichPlayer
            eight.element.children[0].textContent = sign
            eight.element.classList.add("filled")
            origBoard[7] = sign
            break

        case "nine":
            nine.number = whichPlayer
            nine.element.children[0].textContent = sign
            nine.element.classList.add("filled")
            origBoard[8] = sign
            break
    }
}

function determineResult(whichPlayer) {
    
    if (one.number === whichPlayer && two.number === whichPlayer && three.number === whichPlayer) {
        one.element.classList.add("winning-box")
        two.element.classList.add("winning-box")
        three.element.classList.add("winning-box")
        
        gamePaused = true
        console.log("Game finished")
    } else if (four.number === whichPlayer && five.number === whichPlayer && six.number === whichPlayer) {
        four.element.classList.add("winning-box")
        five.element.classList.add("winning-box")
        six.element.classList.add("winning-box")
        
        gamePaused = true
        console.log("Game finished")
    } else if (seven.number === whichPlayer && eight.number === whichPlayer && nine.number === whichPlayer) {
        seven.element.classList.add("winning-box")
        eight.element.classList.add("winning-box")
        nine.element.classList.add("winning-box")
        
        gamePaused = true
        console.log("Game finished")
    } else if (one.number === whichPlayer && four.number === whichPlayer && seven.number === whichPlayer) {
        one.element.classList.add("winning-box")
        four.element.classList.add("winning-box")
        seven.element.classList.add("winning-box")
        
        gamePaused = true
        console.log("Game finished")
    } else if (two.number === whichPlayer && five.number === whichPlayer && eight.number === whichPlayer) {
        two.element.classList.add("winning-box")
        five.element.classList.add("winning-box")
        eight.element.classList.add("winning-box")
        
        gamePaused = true
        console.log("Game finished")
    } else if (three.number === whichPlayer && six.number === whichPlayer && nine.number === whichPlayer) {
        three.element.classList.add("winning-box")
        six.element.classList.add("winning-box")
        nine.element.classList.add("winning-box")
        
        gamePaused = true
        console.log("Game finished")
    } else if (one.number === whichPlayer && five.number === whichPlayer && nine.number === whichPlayer) {
        one.element.classList.add("winning-box")
        five.element.classList.add("winning-box")
        nine.element.classList.add("winning-box")
        
        gamePaused = true
        console.log("Game finished")
    } else if (seven.number === whichPlayer && five.number === whichPlayer && three.number === whichPlayer) {
            
        seven.element.classList.add("winning-box")
        five.element.classList.add("winning-box")
        three.element.classList.add("winning-box")
        
        gamePaused = true
        console.log("Game finished")
    }
        
}









// human
var huPlayer = "X";
// ai
var aiPlayer = "O";

// this is the board flattened and filled with some values to easier asses the Artificial Inteligence.
var origBoard = [0, 1, 2, 3, 4, 5, 6, 7, 8];
//var origBoard = [0,1 ,2,3,4 ,5, 6 ,7,8];

// the main minimax function
function minimax(newBoard, player){
  
    //available spots
    var availSpots = emptyIndexies(newBoard)

    // checks for the terminal states such as win, lose, and tie and returning a value accordingly
    if (winning(newBoard, huPlayer))
        return {score:-10}
    else if (winning(newBoard, aiPlayer))
        return {score:10}
    else if (availSpots.length === 0)
        return {score:0}

    // an array to collect all the objects
    var moves = []

    // loop through available spots
    for (var i = 0; i < availSpots.length; i++) {
    //create an object for each and store the index of that spot that was stored as a number in the object's index key
        var move = {}
        move.index = newBoard[availSpots[i]]

        // set the empty spot to the current player
        newBoard[availSpots[i]] = player

        //if collect the score resulted from calling minimax on the opponent of the current player
        if (player == aiPlayer) {
          
          var result = minimax(newBoard, huPlayer)
          move.score = result.score
        } else {
          
          var result = minimax(newBoard, aiPlayer)
          move.score = result.score
        }

        //reset the spot to empty
        newBoard[availSpots[i]] = move.index

        // push the object to the array
        moves.push(move)
    }

    // if it is the computer's turn loop over the moves and choose the move with the highest score
    var bestMove

    if(player === aiPlayer) {
        var bestScore = -10000
        
        for (var i = 0; i < moves.length; i++) {
            if (moves[i].score > bestScore) {
                bestScore = moves[i].score
                bestMove = i
            }
        }
    } else {

    // else loop over the moves and choose the move with the lowest score
        var bestScore = 10000
        for (var i = 0; i < moves.length; i++) {
            if (moves[i].score < bestScore) {
                bestScore = moves[i].score
                bestMove = i
            }
        }
    }

    // return the chosen move (object) from the array to the higher depth
    return moves[bestMove];
}

// returns the available spots on the board
function emptyIndexies(board) {
    return  board.filter(s => s != "O" && s != "X");
}

// winning combinations using the board indexies for instace the first win could be 3 xes in a row
function winning(board, player) {
    if (
        (board[0] == player && board[1] == player && board[2] == player) ||
        (board[3] == player && board[4] == player && board[5] == player) ||
        (board[6] == player && board[7] == player && board[8] == player) ||
        (board[0] == player && board[3] == player && board[6] == player) ||
        (board[1] == player && board[4] == player && board[7] == player) ||
        (board[2] == player && board[5] == player && board[8] == player) ||
        (board[0] == player && board[4] == player && board[8] == player) ||
        (board[2] == player && board[4] == player && board[6] == player)
        ) {
        return true;
    } else
        return false;
}