module.exports = function solveSudoku(matrix) {

  let stackTries = [];
  let position = [0,0];
  let isSolve = false;
  let values = [];
  positions = nextVacantPos();
  let index = 0;
  position = positions[index];
  values = getVacantValues(position);

  while (isSolve == false) {

  if (values.length == 0 && stackTries.length == 0) { console.log('Solving failure'); break }
    if (values.length == 0) { set(matrix,0,position); values=stackTries.pop(); index--; position=positions[index];}
    else {
      stackTries.push(values);
      set(matrix, values.shift() ,position);
      index++;
      position = positions[index];
      if (position == undefined) {isSolve = true}
      else {values = getVacantValues(position)};
    }
  }
return matrix;

function getVacantValues(position) {
  values = [];
  let occupiedNumbers = getRow(position).concat(getColumn(position),getBlock(position));
  for (let i=1; i<=9; i++) {
    if (occupiedNumbers.includes(i)==false) {values.push(i)}
  }
  return values;
}


function set(matrix, value, [rowIndex,columnIndex] ) {
  matrix[rowIndex][columnIndex] = value;
}

function nextVacantPos () {
  let arr = [];
  for ( let i=0; i<matrix.length; i++) {
    for (let j=0; j<matrix[i].length; j++) {
      if (matrix[i][j] === 0) {arr.push([i,j])}
    }
  }
return arr;
}

function getRow([rowIndex,columnIndex]) {
  return matrix[rowIndex];
}

function getColumn ([rowIndex,columnIndex]) {
  let column = [];
  for (let i=0; i<matrix.length; i++) {
    column.push(matrix[i][columnIndex]);
  }
  return column;
}

function getBlock ([rowIndex, columnIndex]) {
  let startRow; 
  let endRow;
  let startColumn; 
  let endColumn;
  let block = [];

  switch (true) {
    case rowIndex<=2: startRow = 0; endRow=2; break;
    case rowIndex>=3 && rowIndex<=5: startRow = 3; endRow=5; break;
    case rowIndex>=6: startRow = 6; endRow=8; break;
  }
  switch (true) {
    case columnIndex<=2: startColumn = 0; endColumn=2; break;
    case columnIndex>=3 && columnIndex<=5: startColumn = 3; endColumn = 5; break;
    case columnIndex>=6: startColumn = 6; endColumn=8; break;
  }

  for (let i=startRow; i<=endRow; i++) {
    for (let j=startColumn; j<=endColumn; j++) {
      block.push(matrix[i][j]);
    }
  }
  return block;
}

}
