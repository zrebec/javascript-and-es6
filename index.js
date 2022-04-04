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
 * This function is called after full load of page
 */
function onload() {
  content = document.querySelector('#content')
  // Make content of page visible (default is none before full load)
  content.style.display = 'block'
  document.querySelector('#content .box .event-timestamp').textContent =
    getFormattedTimestamp(new Date())
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
  const movePixels = 50
  let oldHorizontalPosition = parseInt(
    getComputedStyle(document.querySelector('#content')).left,
    10
  )
  let oldVerticalPosition = parseInt(
    getComputedStyle(document.querySelector('#content')).top,
    10
  )
  if (isNaN(oldHorizontalPosition)) oldHorizontalPosition = 0
  if (isNaN(oldVerticalPosition)) oldVerticalPosition = 0
  let newHorizontalPosition
  let newVerticalPosition

  if (e.key.toLocaleLowerCase() === 'arrowleft' || e.keyCode === 37)
    // Dolava
    newHorizontalPosition = oldHorizontalPosition - movePixels
  else if (e.key.toLocaleLowerCase() === 'arrowright' || e.keyCode === 39)
    // Doprava
    newHorizontalPosition = oldHorizontalPosition + movePixels
  else if (e.key.toLocaleLowerCase() === 'arrowup' || e.keyCode === 38)
    // Hore
    newVerticalPosition = oldVerticalPosition - movePixels
  else if (e.key.toLocaleLowerCase() === 'arrowdown' || e.keyCode === 40)
    // Dole
    newVerticalPosition = oldVerticalPosition + movePixels
  else if (
    (e.key.toLocaleLowerCase() === 'arrowleft' || e.keyCode === 37) &&
    (e.key.toLocaleLowerCase() === 'arrowup' || e.keyCode === 38)
  ) {
    // Dolava a hore
    newHorizontalPosition = oldHorizontalPosition - movePixels
    newVerticalPosition = oldVerticalPosition - movePixels
  } else if (
    (e.key.toLocaleLowerCase() === 'arrowright' || e.keyCode === 39) &&
    (e.key.toLocaleLowerCase() === 'arrowdown' || e.keyCode === 40)
  ) {
    // Doprava a dole
    newHorizontalPosition = oldHorizontalPosition + movePixels
    newVerticalPosition = oldVerticalPosition + movePixels
  } else if (
    (e.key.toLocaleLowerCase() === 'arrowright' || e.keyCode === 39) &&
    (e.key.toLocaleLowerCase() === 'arrowup' || e.keyCode === 38)
  ) {
    // Doprava a hore
    newHorizontalPosition = oldHorizontalPosition + movePixels
    newVerticalPosition = oldVerticalPosition - movePixels
  } else if (
    (e.key.toLocaleLowerCase() === 'arrowleft' || e.keyCode === 37) &&
    (e.key.toLocaleLowerCase() === 'arrodown' || e.keyCode === 40)
  ) {
    // Dolava a dole
    newHorizontalPosition = oldHorizontalPosition - movePixels
    newVerticalPosition = oldVerticalPosition + movePixels
  } else if (allowedKeys.includes(e.key.toLowerCase()))
    addBox(content, 'You pressed the key ' + e.key.toUpperCase())

  document.querySelector('#content').style.left = newHorizontalPosition + 'px'
  document.querySelector('#content').style.top = newVerticalPosition + 'px'
})
