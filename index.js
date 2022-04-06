function getFormattedTimestamp(d) {
  return (
    ('0' + d.getDate()).slice(-2) +
    '.' +
    ('0' + (d.getMonth() + 1)).slice(-2) +
    '.' +
    d.getFullYear() +
    ' ' +
    ('0' + d.getHours()).slice(-2) +
    ':' +
    ('0' + d.getMinutes()).slice(-2) +
    ':' +
    ('0' + d.getSeconds()).slice(-2)
  )
}

let content = document
const forbiddenKeys = [
  'arrowup',
  'arrowdown',
  'arrowleft',
  'arrowright',
  'shift',
  'control',
  'command',
  'option',
  'alt',
  'dead',
  'meta',
]

/**
 * Game constants
 */
const ballSize = 40
const moveRatio = ballSize / 1
const ballElement = document.querySelector('#content .playground .ball')
const playgroundElement = document.querySelector('#content .playground')
let writtenWord = ''
let chatMode = false
let box

/**
 * This function is called after full load of page
 */
function onload() {
  content = document.querySelector('#content')
  // Make content of page visible (default is none before full load)
  content.style.display = 'block'
  document.querySelector('#content .box .event-timestamp').textContent = getFormattedTimestamp(
    new Date()
  )
  centerBallPosition()
  drawChessBoard()
}

function addBox(element) {
  const box = document.createElement('div')
  const boxEventName = document.createElement('div')
  const boxEventTimestamp = document.createElement('div')
  box.className = 'box'
  boxEventName.className = 'event-name'
  boxEventName.textContent = ''
  boxEventTimestamp.className = 'event-timestamp'
  //boxEventTimestamp.textContent = getFormattedTimestamp(new Date())
  boxEventTimestamp.textContent = 'Writing...'
  box.appendChild(boxEventName)
  box.appendChild(boxEventTimestamp)
  element.appendChild(box)
  playgroundElement.style.visibility = 'hidden'
  return box
}

function updateBox(box, text) {
  let messageElement = box.querySelector('.event-name')
  messageElement.textContent = text
}

function finishBox(element, box, text) {
  console.log(box)
  if (box === undefined) return
  playgroundElement.style.visibility = 'visible'
  // If text is empty, we don't wan't
  if (text === '') {
    element.removeChild(box)
    return
  }
  let timestampElement = box.querySelector('.event-timestamp')
  timestampElement.textContent = getFormattedTimestamp(new Date())
  box = undefined
  return box
}

function moveBall(direction) {
  x = ballElement.style.left
  y = ballElement.style.top
  const playgroundWidth = parseInt(getComputedStyle(playgroundElement).width, 10)
  const playgroundHeight = parseInt(getComputedStyle(playgroundElement).height, 10)
  switch (direction) {
    case 'left':
      x = parseInt(ballElement.style.left, 10) - moveRatio
      break
    case 'right':
      x = parseInt(ballElement.style.left, 10) + moveRatio
      break
    case 'up':
      y = parseInt(ballElement.style.top, 10) - moveRatio
      break
    case 'down':
      y = parseInt(ballElement.style.top, 10) + moveRatio
      break
  }
  // console.log(`x: ${x}, y: ${y}`)
  if (x < 0) x = 0
  if (y < 0) y = 0
  if (x + ballSize > playgroundWidth) x = playgroundWidth - ballSize
  if (y + ballSize > playgroundHeight) y = playgroundHeight - ballSize
  ballElement.style.left = x + 'px'
  ballElement.style.top = y + 'px'
}

const boardPiecesPerRow = 5
const totalPiecesOnChessboard = 5
const boardPieces = boardPiecesPerRow * boardPiecesPerRow
const boardPiecesID = []
const symbols = ['🍉', '🫑', '🍇', '🍅', '🥒', '🥕', '🍑', '🍐', '🍋', '🍌', '🍎']
const chessBoard = document.querySelector('#content .chessboard')
const symbolsToCatchElemet = document.querySelector('#content .symbols')
const turnSymbols = []
let piecePlaceID = 0
for (let i = 0; i < totalPiecesOnChessboard; i++) {
  let symbolToCatch = symbols[Math.floor(Math.random() * symbols.length)]
  turnSymbols.push(symbolToCatch)
  symbolsToCatchElemet.textContent += symbolToCatch
}

chessBoard.style.gridTemplateColumns = `repeat(${boardPiecesPerRow}, 1fr)`
chessBoard.style.gridTemplateRows = `repeat(${boardPiecesPerRow}, 1fr)`

// Display what symbols you must catch

function drawChessBoard() {
  for (let i = 0; i < boardPieces; i++) {
    boardPiecesID.push(i)
    const boardPiece = document.createElement('div')
    boardPiece.className = 'chessboard-piece'
    boardPiece.innerHTML = '&nbsp;'
    chessBoard.appendChild(boardPiece)
  }
  // chessBoard.querySelector(':nth-child(0)').textContent = '🧲'
  turnSymbols.forEach((symbol) => {
    console.log(`Ešte dostupné symboly: ${symbols}`)
    console.log(
      `Dostupné pole na ktoré sa dá zobrazovať (index políčka hracej plochy): ${boardPiecesID}`
    )
    console.log(`Symbol, ktorý je na rade: ${symbol}`)
    piecePlaceID = boardPiecesID[Math.floor(Math.random() * boardPiecesID.length)]
    console.log(`Miesto na ktorom sa symbol nakreslí: ${piecePlaceID + 1}`)
    const boardPiece = chessBoard.querySelector(`:nth-child(${piecePlaceID + 1})`)
    /**
     * We must remove selected piecePlaceID from future select
     * Otherwise we can have duplicates
     */
    boardPiecesID.splice(piecePlaceID, 1)
    boardPiece.textContent = symbol
  })
}

function drawBoard() {
  // How big is a one ball?
  // Set ball size
  // let ball = document.createElement('div')
  // ballElement.style.width = ballSize + 'px'
  // ballElement.style.height = ballSize + 'px'

  const playgroundWidth = parseInt(getComputedStyle(playgroundElement).width, 10)
  const playgroundHeight = parseInt(getComputedStyle(playgroundElement).height, 10)

  // How many balls can I put on horizontal line of playground?
  xBallsTotal = Math.floor(playgroundWidth / ballSize)

  // How many balls can I put on horizontal line of playground?
  yBallsTotal = Math.floor(playgroundHeight / ballSize)

  // Output
  console.log(`x: ${xBallsTotal}, y: ${yBallsTotal}`)

  for (let x = 0; x < xBallsTotal; x++) {
    for (let y = 0; y < yBallsTotal; y++) {
      let ball = document.createElement('div')
      ball.className = 'ball'
      ball.style.width = ballSize + 'px'
      ball.style.height = ballSize + 'px'
      ball.style.left = x * ballSize + 'px'
      ball.style.top = y * ballSize + 'px'
      // ball.style.backgroundColor = '#888'
      ball.textContent = 'X'
      playgroundElement.appendChild(ball)
    }
  }
}

function centerBallPosition() {
  drawBoard()
  // Set playground size constants
  const playgroundWidth = parseInt(getComputedStyle(playgroundElement).width, 10)
  const playgroundHeight = parseInt(getComputedStyle(playgroundElement).height, 10)

  // Set starting ball position
  const ballHorizontalPosition = Math.round(playgroundWidth / 2 - ballSize / 2)
  const ballVerticalPosition = Math.round(playgroundHeight / 2 - ballSize / 2)
  ballElement.style.left = ballHorizontalPosition + 'px'
  ballElement.style.top = ballVerticalPosition + 'px'

  // Set ball size
  ballElement.style.width = ballSize + 'px'
  ballElement.style.height = ballSize + 'px'
  ballElement.style.backgroundColor = '#06a'
  console.log(`Playground size: ${playgroundWidth}x${playgroundHeight}`)
  console.log(`Starting ball position: ${ballHorizontalPosition}x${ballVerticalPosition}`)
}

document.body.addEventListener('click', function clickListener() {
  addBox(content, 'You clicked!')
  console.log('You clicked in body')
})

document.body.addEventListener('keydown', function keyUpListener(e) {
  /**
   * If we pressed ctrl key or "R" key with ctrl key pressed, we
   * don't want to continue
   **/
  if ((e.key.toLowerCase() === 'r' && e.ctrlKey === true) || e.key.toLowerCase() === 'control')
    return

  // If we are not in the chat mode, we can play the game
  if (!chatMode) {
    if (e.key.toLowerCase() === 'arrowleft' || e.key.toLowerCase() === 'a') moveBall('left')
    else if (e.key.toLowerCase() === 'arrowright' || e.key.toLowerCase() === 'd') moveBall('right')
    else if (e.key.toLowerCase() === 'arrowup' || e.key.toLowerCase() === 'w') moveBall('up')
    else if (e.key.toLowerCase() === 'arrowdown' || e.key.toLowerCase() === 's') moveBall('down')
  }

  if (e.key.toLowerCase() === 'c' && !chatMode) {
    // Entering to chat mode
    chatMode = true
    box = addBox(content, '')
    return
  }

  if (
    !forbiddenKeys.includes(e.key.toLowerCase()) &&
    e.key.toLowerCase() !== 'enter' &&
    chatMode === true
  ) {
    if (e.key.toLowerCase() === 'backspace') writtenWord = writtenWord.slice(0, -1)
    else writtenWord += e.key
    updateBox(box, writtenWord)
  }

  if (e.key.toLowerCase() === 'enter') {
    box = finishBox(content, box, writtenWord)
    writtenWord = ''
    chatMode = false
  }
})
