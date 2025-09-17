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
const word = [
  'windows',
  'seeds',
  'laptop',
  'spear',
  'playstation',
  'alarm',
  'sans',
  'keyboard',
  'basketball',
  'gameboy'
]
// the hints array
const hints = [
  'a house without it would be cold',
  'birds favorite food',
  'a device to code',
  'a old weapon people used to hunt animals with',
  'a gaming console',
  'it annoys you, but helpful in the morning',
  'a skeleton that wears a blue hoodie',
  'clickable and makes noises and sometimes you need a mouse with it',
  'a sport that needs to do some dunkin to score'
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
const init = () => {
  pickRandomWord()
  playGame()
  showHint()
}
//----------------------------------------------------
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
//----------------------------------------------------
//function to pick a random word from the words array
const pickRandomWord = () => {
  wordIndex = Math.floor(Math.random() * word.length)
  selectedWord = word[wordIndex]
}
//-----------------------------------------------------
//this function can pick a hint that matches with the word
const showHint = () => {
  const hintIndex = word.findIndex(function (oneWord) {
    return oneWord === selectedWord
  })
  selectedHint = hintIndex
  hintText.textContent = hints[hintIndex]
}
//-----------------------------------------------------
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
//----------------------------------------------------
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
//----------------------------------------------------
//to show the right letter
const showWord = (pickedLetter) => {
  //to replace the underscore with the right letter.
  wordUnderscores.innerHTML = ''
  selectedWord.split('').forEach((letter, idx) => {
    if (letter === pickedLetter) {
      displayWord[idx] = letter
    }
  })
  //to shows the picked letter on screen
  displayWord.forEach((element) => {
    //so we make a new p element
    let pElement = document.createElement('p')
    //and fill with the picked letter
    pElement.textContent = element
    wordUnderscores.appendChild(pElement)
  })
  gameWin()
}
//----------------------------------------------------
//if the picked letter is not in th word, it'll take a point from the tries
const triesPoints = () => {
  tries -= 1
  //to display the image when losing a life
  image.src = `Images/mistake-${tries}.png`
  //and this one to show the remaining tries as you keep guessing wrong
  triesElement.textContent = `Remaining tries ${tries}`

  gameOver()
}
//----------------------------------------------------
const gameOver = () => {
  //once you run out of tries, a game over, i make an if statement
  if (tries == 0) {
    //if tries = 0 it'll make a new paragraph element in HTML
    let gameOverText = document.createElement('p')
    //so it can print a game over text
    gameOverText.textContent = 'You have used all of your tries, game over!'
    //to show it on screen
    gameOverContainer.appendChild(gameOverText)
    hintText.textContent = ''
  }
}
//----------------------------------------------------
const gameWin = () => {
  //loops through all of the displayWord
  //and check if all of the underscores are filled
  let hasWon = displayWord.every((element) => {
    return element !== '_'
  })
  //if the condition above is fulfilled
  if (hasWon) {
    //we make it do some DOM magic
    let gameWinText = document.createElement('p')
    //to make that element say the you won word and displays it if you guess right
    gameWinText.textContent = 'You won!'
    gameWinContainer.appendChild(gameWinText)
  }
}
//----------------------------------------------------
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
//----------------------------------------------------
