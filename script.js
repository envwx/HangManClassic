//------------------------------------consts-------------------------------------
const letters = document.querySelectorAll('.letter')
const wordUnderscores = document.querySelector('#word-underscores')
const triesElement = document.querySelector('.Tries')
const image = document.querySelector('#hangman-img')
const gameOverContainer = document.querySelector('#game-over')
const gameWinContainer = document.querySelector('#game-win')
//the brain
const resetGame = document.querySelector('.reset')
const hintText = document.querySelector('#hints')
// for the words to guess
const word = ['windows', 'seeds', 'pc']
// the hints array
const hints = [
  'a house without it would be cold',
  'birds favorite food',
  'a device'
]
//--------------------------------------variables--------------------------------
//index of words that listed in the array
let wordIndex = 0
//for the wrong guesses
let wrongLetter = []
//to select the words randomly
let selectedWord = ''
//to show the hint that goes with the word
let selectedHint
//the numbers of how many you pick the wrong letter
let tries = 6
//for when you pick a letter
let pickedLetter
//to show the words on your screen
let displayWord = []

//--------------------------------------game functions----------------------------
//to call for the functions once the game starts
function init() {
  pickRandomWord()
  playGame()
  showHint()
}

const playGame = () => {
  //to show the word that was listed in the array
  displayWord = []
  wordUnderscores.innerHTML = ''
  //a loop to push the underscores to match with the letters for each word
  for (let i = 0; i < selectedWord.length; i++) {
    displayWord.push('_')
    const pElement = document.createElement('p')
    pElement.textContent = '_'
    wordUnderscores.appendChild(pElement)
  }
  //an html element to show the remaining tries on screen
  triesElement.textContent = `tries: ${tries}`
}
//so it can pick a random word from the words array
const pickRandomWord = () => {
  wordIndex = Math.floor(Math.random() * word.length)
  selectedWord = word[wordIndex]
}
//this so it can pick a hint that matches with the word
const showHint = () => {
  const hintIndex = word.findIndex(function (oneWord) {
    return oneWord === selectedWord
  })
  selectedHint = hintIndex
  hintText.textContent = hints[hintIndex]
}
//to display the letters that guessed
letters.forEach((oneLetter) => {
  oneLetter.addEventListener('click', (event) => {
    pickedLetter = event.target.id.toLowerCase()
    if (selectedWord.includes(pickedLetter)) {
      showWord(pickedLetter)
      //when you pick a wrong letter
    } else {
      triesPoints()
    }
  })
})
//displays the underscores for the words
const showUnderScores = () => {
  wordUnderscores.innerHTML = ''
  //a loop for the words array
  for (let i = 0; i < selectedWord.length; i++) {
    //an element for the underscores
    let pElement = document.createElement('p')
    pElement.textContent = '_'
    //to fill the new html with the underscores
    wordUnderscores.appendChild(pElement)
  }
}
//to show the right letter
const showWord = (pickedLetter) => {
  //to replace the underscore with the right letter.
  wordUnderscores.innerHTML = ''
  selectedWord.split('').forEach((letter, idx) => {
    if (letter === pickedLetter) {
      displayWord[idx] = letter
    }
  })
  displayWord.forEach((element) => {
    let pElement = document.createElement('p')
    pElement.textContent = element
    wordUnderscores.appendChild(pElement)
  })
  gameWin()
}

const triesPoints = () => {
  tries -= 1

  image.src = `Images/mistake-${tries}.png`
  //
  triesElement.textContent = `Remaining tries ${tries}`

  gameOver()
}

const gameOver = () => {
  if (tries == 0) {
    let gameOverText = document.createElement('p')
    gameOverText.textContent = 'Game are bing bong over!'
    gameOverContainer.appendChild(gameOverText)
    hintText.textContent = ''
  }
}

const gameWin = () => {
  let hasWon = displayWord.every((element) => {
    return element !== '_'
  })
  if (hasWon) {
    let gameWinText = document.createElement('p')
    gameWinText.textContent = 'Noice'
    gameWinContainer.appendChild(gameWinText)
  }
}

const RestartGame = () => {
  tries = 6
  image.src = 'images/starting.png'
  selectedHint = ''
  displayWord = []
  selectedWord = ''
  wrongLetter = []
  wordUnderscores.textContent = ''
  gameWinContainer.innerHTML = ''
  gameOverContainer.innerHTML = ''
  pickRandomWord()
  playGame()
  showHint()
}
// event listeners
resetGame.addEventListener('click', RestartGame)
init()
