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
const allowedKeys = [
  'a',
  'b',
  'c',
  'd',
  'e',
  'f',
  'g',
  'h',
  'i',
  'j',
  'k',
  'l',
  'm',
  'n',
  'o',
  'p',
  'q',
  'r',
  's',
  't',
  'u',
  'v',
  'w',
  'x',
  'y',
  'z',
  'arrowup',
  'arrowdown',
  'arrowleft',
  'arrowright',
  '0',
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
]

/**
 * Game constants
 */
const ballSize = 40
const moveRatio = ballSize / 4
const ballElement = document.querySelector('#content .playground .ball')
const playgroundElement = document.querySelector('#content .playground')

/**
 * This function is called after full load of page
 */
function onload() {
  content = document.querySelector('#content')
  // Make content of page visible (default is none before full load)
  content.style.display = 'block'
  document.querySelector('#content .box .event-timestamp').textContent =
    getFormattedTimestamp(new Date())
  centerBallPosition()
}

function addBox(element, text) {
  const box = document.createElement('div')
  const boxEventName = document.createElement('div')
  const boxEventTimestamp = document.createElement('div')
  box.className = 'box'
  boxEventName.className = 'event-name'
  boxEventName.textContent = text
  boxEventTimestamp.className = 'event-timestamp'
  boxEventTimestamp.textContent = getFormattedTimestamp(new Date())
  box.appendChild(boxEventName)
  box.appendChild(boxEventTimestamp)
  element.appendChild(box)
}

function moveBall(direction) {
  x = ballElement.style.left
  y = ballElement.style.top
  const playgroundWidth = parseInt(
    getComputedStyle(playgroundElement).width,
    10
  )
  const playgroundHeight = parseInt(
    getComputedStyle(playgroundElement).height,
    10
  )
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
  console.log(`x: ${x}, y: ${y}`)
  if (x < 0) x = 0
  if (y < 0) y = 0
  if (x + ballSize > playgroundWidth) x = playgroundWidth - ballSize
  if (y + ballSize > playgroundHeight) y = playgroundHeight - ballSize
  ballElement.style.left = x + 'px'
  ballElement.style.top = y + 'px'
}

function centerBallPosition() {
  // Set playground size constants
  const playgroundWidth = parseInt(
    getComputedStyle(playgroundElement).width,
    10
  )
  const playgroundHeight = parseInt(
    getComputedStyle(playgroundElement).height,
    10
  )

  // Set starting ball position
  const ballHorizontalPosition = Math.round(playgroundWidth / 2 - ballSize / 2)
  const ballVerticalPosition = Math.round(playgroundHeight / 2 - ballSize / 2)
  ballElement.style.left = ballHorizontalPosition + 'px'
  ballElement.style.top = ballVerticalPosition + 'px'

  // Set ball size
  ballElement.style.width = ballSize + 'px'
  ballElement.style.height = ballSize + 'px'

  console.log(`Playground size: ${playgroundWidth}x${playgroundHeight}`)
  console.log(
    `Starting ball position: ${ballHorizontalPosition}x${ballVerticalPosition}`
  )
}

document.body.addEventListener('click', function clickListener() {
  addBox(content, 'You clicked!')
  console.log('You clicked in body')
})

document.body.addEventListener('keyup', function keyUpListener(e) {
  /**
   * If we pressed ctrl key or "R" key with ctrl key pressed, we
   * don't want to continue
   **/
  if (
    (e.key.toLowerCase() === 'r' && e.ctrlKey === true) ||
    e.key.toLowerCase() === 'control'
  )
    return

  if (e.key.toLowerCase() === 'arrowleft' || e.key.toLowerCase() === 'a')
    moveBall('left')
  else if (e.key.toLowerCase() === 'arrowright' || e.key.toLowerCase() === 'd')
    moveBall('right')
  else if (e.key.toLowerCase() === 'arrowup' || e.key.toLowerCase() === 'w')
    moveBall('up')
  else if (e.key.toLowerCase() === 'arrowdown' || e.key.toLowerCase() === 's')
    moveBall('down')
  else if (allowedKeys.includes(e.key.toLowerCase()))
    addBox(content, 'You pressed the key ' + e.key.toUpperCase())
})
