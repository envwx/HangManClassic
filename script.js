//consts
const letters = document.querySelectorAll('.letter')
const wordUnderscores = document.querySelector('#word-underscores')
const triesElement = document.querySelector('.Tries')
const image = document.querySelector('#hangman-img')
const gameOverContainer = document.querySelector('#game-over')
const gameWinContainer = document.querySelector('#game-win')
const resetGame = document.querySelector('.reset')
const hintText = document.querySelector('#hints')
// for the word guesses and hints
const word = ['windows', 'seeds', 'pc']
const hints = [
  'a house without it would be cold',
  'birds favorite food',
  'a device'
]
// variables
let displayWord = []
let selectedHint
let selectedWord = ''
let pickedLetter
let wrongLetter = []
let tries = 6
let wordIndex = 0

// game functions
function init() {
  pickRandomWord()
  playGame()
  showHint()
}

const playGame = () => {
  displayWord = []
  wordUnderscores.innerHTML = ''
  for (let i = 0; i < selectedWord.length; i++) {
    displayWord.push('_')
    const pElement = document.createElement('p')
    pElement.textContent = '_'
    wordUnderscores.appendChild(pElement)
  }
  triesElement.textContent = `tries: ${tries}`
}

const pickRandomWord = () => {
  wordIndex = Math.floor(Math.random() * word.length)
  selectedWord = word[wordIndex]
}

const showHint = () => {
  const hintIndex = word.findIndex(function (oneWord) {
    return oneWord === selectedWord
  })
  selectedHint = hintIndex
  hintText.textContent = hints[hintIndex]
}

letters.forEach((oneLetter) => {
  oneLetter.addEventListener('click', (event) => {
    pickedLetter = event.target.id.toLowerCase()
    if (selectedWord.includes(pickedLetter)) {
      showWord(pickedLetter)
    } else {
      triesPoints()
    }
  })
})

const showUnderScores = () => {
  wordUnderscores.innerHTML = ''
  for (let i = 0; i < selectedWord.length; i++) {
    let pElement = document.createElement('p')
    pElement.textContent = '_'
    wordUnderscores.appendChild(pElement)
  }
}
const showWord = (pickedLetter) => {
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
