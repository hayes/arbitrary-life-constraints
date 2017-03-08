runSimulation([{x: 32, y: 32}, {x: 32, y: 33}, {x: 33, y: 31}, {x: 33, y: 32}, {x: 34, y: 33}])

function runSimulation (startingCells, x = 50, y = 50, interval = 300) {
  tick(initialize(grid(x, y), startingCells), interval)
}

function tick (grid, interval, gen = 0) {
  draw(grid, gen), setTimeout(() => {
    tick(evolve(grid), interval, gen + 1)
  }, interval)
}

function initialize (grid, startingCells) {
  return startingCells.forEach(location => {
    grid[location.x][location.y] = 1
  }) || grid
}

function grid (x, y) {
  return new Array(x).fill(0).map(() => {
    return new Array(y).fill(0)
  })
}

function evolve (grid) {
  return grid.map((row, i) => evolveRow(grid, i))
}

function evolveRow (grid, row) {
  return grid[row].map((cell, col) => evolveCell(grid, row, col))
}

function evolveCell (grid, row, col) {
  return nextCellState(grid[row][col], liveNeighbors(grid, row, col))
}

function liveNeighbors (grid, row, col) {
  return neigborsAbove(grid, row, col) + neigborsAdjacent(grid, row, col) + neigborsBelow(grid, row, col)
}

function neigborsAbove (grid, row, col) {
  return (grid[row - 1]
    && (grid[row - 1][col - 1] || 0) + (grid[row - 1][col] || 0) + (grid[row - 1][col + 1] || 0))
    || 0
}

function neigborsAdjacent (grid, row, col) {
  return (grid[row][col - 1] || 0) + (grid[row][col + 1] || 0)
}

function neigborsBelow (grid, row, col) {
  return (grid[row + 1]
    && (grid[row + 1][col - 1] || 0) + (grid[row + 1][col] || 0) + (grid[row + 1][col + 1] || 0))
    || 0
}

function nextCellState (state, liveNeighbors) {
  return (state === 1 && (liveNeighbors === 2 || liveNeighbors === 3) && 1)
    || (state === 0 && liveNeighbors === 3 && 1)
    || 0
}

function draw (grid, gen) {
  console.log('\n\n\nDrawing generation', gen)
  grid.forEach(row => drawRow(row))
}

function drawRow (row) {
  console.log(...row.map(x => x && 'X' || ' '))
}