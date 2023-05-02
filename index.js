// Represents a box in the grid
class Box {
    constructor(element) {
        // Holds the DOM element
        this.element = element
        
        // 0 = not occupied yet, 1 = occupied by player one, 2 = occupied by player two or computer
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

// List of the boxes. Used for computer's move only.
let availableSlots = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine"]

// True for two player game mode
let twoPlayers = false

// True means player one will make next move
let firstPlayersMove = true

// True means game is paused, no moves can be made
let gamePaused = true

// True means either a player won or the match is tied
let gameEnded = false

// Keeps count of the total moves
let totalMoves = 0

const boxes = document.querySelectorAll("main #grid .box")
const startButton = document.querySelector("main #left #start")
const restartButton = document.querySelector("main #left #restart")
const gameModeComp = document.querySelector("main #left #game-mode-div #game-mode-comp")
const gameModeFr = document.querySelector("main #left #game-mode-div #game-mode-fr")
const compFirst = document.querySelector("main #left #comp-first #comp-first-check")
const turnIndicatorText = document.querySelector("main #right #turn-indicator")
const winnerIndicatorText = document.querySelector("main #right #winner-indicator")

startButton.addEventListener("click", () => {
    startButton.disabled = true
    restartButton.disabled = false
    gamePaused = false
    gameEnded = false

    if (gameModeFr.checked) { // Playing against friend
        twoPlayers = true
        winnerIndicatorText.textContent = "Playing against friend"
    } 
    else { // Playing against computer
        winnerIndicatorText.textContent = "Playing against computer"
        
        if (compFirst.checked) // Computer will make the first move
            computersMove()
    }
    turnIndicatorText.textContent = "Player One's turn"
})


// Restart button resets everything
restartButton.addEventListener("click", () => {
    twoPlayers = false
    firstPlayersMove = true
    gamePaused = true
    totalMoves = 0

    startButton.disabled = false
    restartButton.disabled = true
    
    gameModeComp.checked = true
    gameModeFr.checked = false
    compFirst.checked = false

    one.number = 0
    two.number = 0
    three.number = 0
    four.number = 0
    five.number = 0
    six.number = 0
    seven.number = 0
    eight.number = 0
    nine.number = 0
    
    origBoard = [0, 1, 2, 3, 4, 5, 6, 7, 8]

    boxes.forEach(box => {
        if (box.classList.contains("winning-box"))
            box.classList.remove("winning-box")

            if (box.classList.contains("filled"))
                box.classList.remove("filled")
        
        box.children[0].textContent = ""
    })

    turnIndicatorText.textContent = "Waiting is boring"
    winnerIndicatorText.textContent = "Click start button to start playing!"
})

// If a box is clicked...
boxes.forEach(box => box.addEventListener("click", () => {
    
    if (!gamePaused) {
        if (box.children[0].textContent === "" && firstPlayersMove) {
            
            // Perfomrs player one's move
            aMove(box.getAttribute("id"), 1)
            
            totalMoves++ // Increases the number of moves
            determineResult(1) // checks if game can be concluded
            
            if (!gameEnded && !gamePaused) {
                
                // Player two's move if playing against friend
                // Or else computer's move
                
                if (twoPlayers) {
                    
                    firstPlayersMove = false
                    turnIndicatorText.textContent = "Player Two's turn"
                }
                else
                    computersMove()
            }

        } else if (box.children[0].textContent === "" && !firstPlayersMove) {
            
            // Perfomrs player two's move
            aMove(box.getAttribute("id"), 2)
            firstPlayersMove = true
            totalMoves++ // Increases the number of moves
            determineResult(2) // checks if game can be concluded
            
            if (!gameEnded)
                turnIndicatorText.textContent = "Player One's turn"
        }
    }
}))

// Simulates a computer move
function computersMove() {
    
    // Pauses the game to perform computer's move
    gamePaused = true
    turnIndicatorText.textContent = "Computer's turn"
    
    // Takes one second before making the move
    setTimeout(function() {
        
        // Finds the best move
        const bestSpot = minimax(origBoard, aiPlayer)
        
        // Finds the name of the box
        const computerMove = availableSlots[bestSpot.index]
        
        // Performs the move
        aMove(computerMove, 2)
        
        // Unpauses the game
        gamePaused = false
        totalMoves++ // Increases the number of moves
        determineResult(2) // checks if game can be concluded
        
        if (!gameEnded)
            turnIndicatorText.textContent = "Player One's turn"

    }, 1000);
}

// Performs a move
// boxId is the name of the box (eg. one, four)
// whichPlayer = 1 means player one's move,
// whichPlayer = 2 means player two's or computer's move,
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


// Determines if game is concluded
function determineResult(whichPlayer) {

    if (one.number === whichPlayer && two.number === whichPlayer && three.number === whichPlayer) {
        one.element.classList.add("winning-box")
        two.element.classList.add("winning-box")
        three.element.classList.add("winning-box")
        
        gameEnded = true
        console.log("Game finished")
    } else if (four.number === whichPlayer && five.number === whichPlayer && six.number === whichPlayer) {
        four.element.classList.add("winning-box")
        five.element.classList.add("winning-box")
        six.element.classList.add("winning-box")
        
        gameEnded = true
        console.log("Game finished")
    } else if (seven.number === whichPlayer && eight.number === whichPlayer && nine.number === whichPlayer) {
        seven.element.classList.add("winning-box")
        eight.element.classList.add("winning-box")
        nine.element.classList.add("winning-box")
        
        gameEnded = true
        console.log("Game finished")
    } else if (one.number === whichPlayer && four.number === whichPlayer && seven.number === whichPlayer) {
        one.element.classList.add("winning-box")
        four.element.classList.add("winning-box")
        seven.element.classList.add("winning-box")
        
        gameEnded = true
        console.log("Game finished")
    } else if (two.number === whichPlayer && five.number === whichPlayer && eight.number === whichPlayer) {
        two.element.classList.add("winning-box")
        five.element.classList.add("winning-box")
        eight.element.classList.add("winning-box")
        
        gameEnded = true
        console.log("Game finished")
    } else if (three.number === whichPlayer && six.number === whichPlayer && nine.number === whichPlayer) {
        three.element.classList.add("winning-box")
        six.element.classList.add("winning-box")
        nine.element.classList.add("winning-box")
        
        gameEnded = true
        console.log("Game finished")
    } else if (one.number === whichPlayer && five.number === whichPlayer && nine.number === whichPlayer) {
        one.element.classList.add("winning-box")
        five.element.classList.add("winning-box")
        nine.element.classList.add("winning-box")
        
        gameEnded = true
        console.log("Game finished")
    } else if (seven.number === whichPlayer && five.number === whichPlayer && three.number === whichPlayer) {
            
        seven.element.classList.add("winning-box")
        five.element.classList.add("winning-box")
        three.element.classList.add("winning-box")
        
        gameEnded = true
    } else if (totalMoves >= 9) { // Game is tied
        gameEnded = true
        
        // For tie, total moves will be 10. Because it is possible that a player could win the game at the 9th move.
        totalMoves++ 
    }
    
    if (gameEnded) {
        gamePaused = true
        turnIndicatorText.textContent = "The game concluded"
        
        // Game is tied if number of total moves is 10 or more
        if (totalMoves >= 10) {
            winnerIndicatorText.textContent = "A precious tie!"
        } else {
            if (whichPlayer === 1)
            winnerIndicatorText.textContent = "Player One won!"
            else {
                if (twoPlayers)
                    winnerIndicatorText.textContent = "Player Two won!"
                else
                    winnerIndicatorText.textContent = "Computer won!"
            }
        }
    }
}

// The MiniMax Algorithm - code and comments collected from internet
// human
var huPlayer = "X";
// ai
var aiPlayer = "O";

// this is the board
var origBoard = [0, 1, 2, 3, 4, 5, 6, 7, 8]

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