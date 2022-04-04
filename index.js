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
  if (allowedKeys.includes(e.key.toLowerCase())) {
    addBox(content, 'You pressed the key ' + e.key.toUpperCase())
  }
  console.log('You pressed the the key: ' + e.key)
})
