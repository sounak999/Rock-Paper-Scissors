const totalScore = { playerScore: 0, computerScore: 0 }

// ** getComputerChoice randomly selects between `rock` `paper` `scissors` and returns that string **
const getComputerChoice = () => {
    const rpsChoice = ['Rock', 'Paper', 'Scissors']
    const randomIdx = Math.floor(Math.random() * 3)
    return rpsChoice[randomIdx]
}


// ** getResult compares playerChoice & computerChoice and returns the score accordingly **
// human wins - getResult('Rock', 'Scissors') 👉 1
// human loses - getResult('Scissors', 'Rock') 👉 -1
// human draws - getResult('Rock', 'Rock') 👉 0
const getResult = (playerChoice, computerChoice) => {
    // return the result of score based on if you won, drew, or lost
    let score

    // All situations where human draws
    if (playerChoice == computerChoice) {
        score = 0
    } else if (playerChoice == 'Rock' && computerChoice == 'Scissors') {
        // All situations where human wins
        score = 1
    } else if (playerChoice == 'Paper' && computerChoice == 'Rock') {
        score = 1
    } else if (playerChoice == 'Scissors' && computerChoice == 'Paper') {
        score = 1
    } else {
        // Otherwise human loses (aka set score to -1)
        score = -1
    }

    // return score
    return score
}

// ** showResult updates the DOM to `You Win!` or `You Lose!` or `It's a Draw!` based on the score. Also shows Player Choice vs. Computer Choice**
function showResult(score, playerChoice, computerChoice) {

    const resultDiv = document.getElementById('result')
    const handsDiv = document.getElementById('hands')
    const playerScoreDiv = document.getElementById('player-score')

    if (score == 1) {
        resultDiv.innerText = 'You won!'
    } else if (score == 0) {
        resultDiv.innerText = 'It\'s a tie'
    } else {
        resultDiv.innerText = 'You lose!'
    }

    handsDiv.innerText = `👦${playerChoice} vs 🤖${computerChoice}`
    playerScoreDiv.innerText = `Score{ Yours: ${totalScore.playerScore} && Computer's: ${totalScore.computerScore}}`

}

// ** Calculate who won and show it on the screen **
const onClickRPS = (playerChoice) => {

    const computerChoice = getComputerChoice()
    const score = getResult(playerChoice, computerChoice)

    
    totalScore['playerScore'] += score
    totalScore['computerScore'] += (-1 * score)


    showResult(score, playerChoice, computerChoice)
}


// ** Make the RPS buttons actively listen for a click and do something once a click is detected **
const playGame = () => {
    // use querySelector to select all RPS Buttons
    const rpsButtons = document.querySelectorAll('.rpsButton')
    console.log(rpsButtons)

    rpsButtons.forEach(rpsButton => {
        rpsButton.onclick = () => onClickRPS(rpsButton.value)
    })

    // Add a click listener to the end game button that runs the endGame() function on click
    const endGameButton = document.getElementById('endGameButton')
    endGameButton.onclick = () => endGame(totalScore)
}

// ** endGame function clears all the text on the DOM **
const endGame = () => {
    totalScore.playerScore = 0
    totalScore.computerScore = 0

    const resultDiv = document.getElementById('result')
    const handsDiv = document.getElementById('hands')
    const playerScoreDiv = document.getElementById('player-score')

    resultDiv.innerText = ''
    handsDiv.innerText = ''
    playerScoreDiv.innerText = ''
}

// calling the only function which
// will call every other functions
playGame()