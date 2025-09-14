//consts
const letters = document.querySelectorAll('.letter')
const wordUnderscores = document.querySelector('#word-underscores')
const triesElement = document.querySelector('.tries')
const image = document.querySelector('#hangman-img')
const gameOverContainer = document.querySelector('#game-over')
const gameWinContainer = document.querySelector('#game-win')
const resetGame = document.querySelector('.reset')
const hintText = document.querySelector('#hints')
// for the word guesses and hints
const word = ['windows', 'seeds']
const hints = ['a house without it would be cold', 'birds favorite food']
// variables
let displayWord = []
let selectedHint
let selectedWord = ''
let pickedLetter
let wrongLetter = []
let tries = 6
let wordIndex = 0

// game functions
const init = () => {
  pickRandomWord()
  playGame()
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
  tries.textContent = `tries: ${tries}`
}

const pickRandomWord = () => {
  wordIndex = Math.floor(Math.random() * word.length)
  selectedWord = word[wordIndex]
}

const showHint = () => {
  const hintIndex = word.findIndex(function (oneWord) {
    return oneWord === selectedWord
  })
  selectedHint = hints
  hintText.textContent = selectedHint
}

letters.forEach((oneLetter) => {
  oneLetter.addEventListener('click', (event) => {
    pickedLetter = event.target.id.toLowerCase()
    if (selectedWord.includes(pickedLetter)) {
      showWord(pickedLetter)
    } else {
      tries()
    }
  })
})

const showUnderScores = () => {
  for (let i = 0; i < word.length; i++) pElement = document.createElement('p')
  pElement.textContent = '_'
  wordUnderscores.appendChild(pElement)
}

const showWord = (pickedLetter) => {
  wordUnderscores = ''
  selectedWord.split('').forEach((letter, ix) => {
    if (letter === pickedLetter) {
      displayWord[ix] = letter
    }
  })
  displayWord.forEach((element) => {
    let pElement = document.createElement('p')
    pElement.textContent = element
    wordUnderscores.appendChild(pElement)
  })
}

const resetGameBtn = () => {
  tries = 6
  image.src = 'images/starting.png'
  selectedHint = ''
  displayWord = []
  selectedWord = ''
  wrongLetter = []
  wordUnderscores.textContent = ''
  gameWinContainer = ''
  gameOverContainer = ''
}
// event listeners
resetGame.addEventListener('click', resetGame)
init()
