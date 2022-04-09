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

// Basic constants
let content = document
let writtenWord = ''
let chatMode = false
let box
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
  'capslock',
]

// This function is called after full load of page
function onload() {
  content = document.querySelector('#content')
  // Make content of page visible (default is none before full load)
  content.style.display = 'block'
  document.querySelector('#content .box .event-timestamp').textContent = getFormattedTimestamp(
    new Date()
  )
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
  return box
}

// Function called until chat mode is active and we're writting the text
function updateBox(box, text) {
  let messageElement = box.querySelector('.event-name')
  messageElement.textContent = text
}

function finishBox(element, box, text) {
  if (box === undefined) return
  else if (text === '') {
    // If text is empty, we want remove added "template" for new box
    element.removeChild(box)
    return
  }

  // Update timestamp in chat
  let timestampElement = box.querySelector('.event-timestamp')
  timestampElement.textContent = getFormattedTimestamp(new Date())
  box = undefined
  return box
}
// Forbidden keys in chat mode

document.body.addEventListener('keydown', function keyUpListener(e) {
  /**
   * If we pressed ctrl key or "R" key with ctrl key pressed, we
   * don't want to continue
   **/
  if ((e.key.toLowerCase() === 'r' && e.ctrlKey === true) || e.key.toLowerCase() === 'control')
    return

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
