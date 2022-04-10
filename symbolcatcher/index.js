let content = document
const boardPiecesPerRow = 5
const totalPiecesOnChessboard = 5
const boardPieces = boardPiecesPerRow * boardPiecesPerRow
const boardPiecesID = []
const symbols = ['🍉', '🫑', '🍇', '🍅', '🥒', '🥕', '🍑', '🍐', '🍋', '🍌', '🍎']
const chessBoard = document.querySelector('#content .chessboard')
const symbolsToCatchElemet = document.querySelector('#content .symbols')
const turnSymbols = []
let piecePlaceID = 0

// This function is called after full load of page
function onload() {
  content = document.querySelector('#content')
  // Make content of page visible (default is none before full load)
  content.style.display = 'block'
  drawChessBoard()
}

// Display what symbols you must catch

function drawChessBoard() {
  // Set chessboard grid size
  chessBoard.style.gridTemplateColumns = `repeat(${boardPiecesPerRow}, 1fr)`
  chessBoard.style.gridTemplateRows = `repeat(${boardPiecesPerRow}, 1fr)`

  for (let i = 0; i < totalPiecesOnChessboard; i++) {
    let symbolToCatch = symbols[Math.floor(Math.random() * symbols.length)]
    turnSymbols.push(symbolToCatch)
    symbolsToCatchElemet.textContent += symbolToCatch
  }

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
