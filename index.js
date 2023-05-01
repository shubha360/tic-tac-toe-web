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

const boxes = document.querySelectorAll("main #grid .box")

boxes.forEach(box => box.addEventListener("click", () => {
    
    if (box.children[0].textContent === "" && firstPlayersMove) {

        aMove(box.getAttribute("id"), 1)
        
        if (twoPlayers)
            firstPlayersMove = false
        else {
            boxes.forEach(box => box.classList.add("disabled"))
            setTimeout(function(){
                const computerMove = availableSlots[Math.floor(Math.random() * availableSlots.length)]
                aMove(computerMove, 2)
                boxes.forEach(box => box.classList.remove("disabled"))
            }, 1000);
        }

    } else if (box.children[0].textContent === "" && !firstPlayersMove) {
        
        aMove(box.getAttribute("id"), 2)
        firstPlayersMove = true
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
            break
        
        case "two":
            two.number = whichPlayer
            two.element.children[0].textContent = sign
            two.element.classList.add("filled")
            break

        case "three":
            three.number = whichPlayer
            three.element.children[0].textContent = sign
            three.element.classList.add("filled")
            break

        case "four":
            four.number = whichPlayer
            four.element.children[0].textContent = sign
            four.element.classList.add("filled")
            break

        case "five":
            five.number = whichPlayer
            five.element.children[0].textContent = sign
            five.element.classList.add("filled")
            break

        case "six":
            six.number = whichPlayer
            six.element.children[0].textContent = sign
            six.element.classList.add("filled")
            break

        case "seven":
            seven.number = whichPlayer
            seven.element.children[0].textContent = sign
            seven.element.classList.add("filled")
            break

        case "eight":
            eight.number = whichPlayer
            eight.element.children[0].textContent = sign
            eight.element.classList.add("filled")
            break

        case "nine":
            nine.number = whichPlayer
            nine.element.children[0].textContent = sign
            nine.element.classList.add("filled")
            break
    }

    if (!twoPlayers)
        reduceAvailableSlot(boxId)
}

function reduceAvailableSlot(slotName) {
    const index = availableSlots.indexOf(slotName)
    availableSlots.splice(index, 1)
}