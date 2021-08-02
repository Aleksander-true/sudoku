module.exports = function solveSudoku(matrix) {

  let stackTries = [];
  let position = [0,0];
  let isSolve = false;
  let values = [];
  position = nextVacantPos();
  values = getVacantValues(position);

  while (isSolve == false) {

//  if (values.length == 0 && stackTries.length == 0) { console.log('Solving failure'); break }
    if (values.length == 0) {set(matrix,0,position); [values,position]=stackTries.pop(); values.shift(); }
    else {
      stackTries.push([values,position]);
      set(matrix,values[0],position);
      values = [];
      position = nextVacantPos();
//      console.log( 'position=', position);
      if (position == false) {isSolve = true}
      else {values = getVacantValues(position)};
    }
  }
  
//console.log( 'solution=', matrix);
return matrix;

function getVacantValues(position) {
  let occupiedNumbers = getRow(position).concat(getColumn(position),getBlock(position));
//  console.log('occupiedNumbers=', occupiedNumbers);
  for (let i=1; i<=9; i++) {
    if (occupiedNumbers.includes(i)==false) {values.push(i)}
  }
//  console.log('values=',values);
  return values;
}


function set(matrix, value, [rowIndex,columnIndex] ) {
  matrix[rowIndex][columnIndex] = value;
}

function nextVacantPos () {
  for ( let i=0; i<matrix.length; i++) {
    for (let j=0; j<matrix[i].length; j++) {
      if (matrix[i][j] === 0) {return [i,j]}
    }
  }
return false;
}

function getRow([rowIndex,columnIndex]) {
  let row = matrix[rowIndex];
  return row;
}

function getColumn ([rowIndex,columnIndex]) {
  let column = Array(matrix.length);
  for (let i=0; i<matrix.length; i++) {
    column[i] = matrix[i][columnIndex];
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
    case columnIndex>=3 && columnIndex<=5: startColumn = 3; endColumn=5; break;
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
/*

const initial = [
  [6, 5, 0, 7, 3, 0, 0, 8, 0],
  [0, 0, 0, 4, 8, 0, 5, 3, 0],
  [8, 4, 0, 9, 2, 5, 0, 0, 0],
  [0, 9, 0, 8, 0, 0, 0, 0, 0],
  [5, 3, 0, 2, 0, 9, 6, 0, 0],
  [0, 0, 6, 0, 0, 0, 8, 0, 0],
  [0, 0, 9, 0, 0, 0, 0, 0, 6],
  [0, 0, 7, 0, 0, 0, 0, 5, 0],
  [1, 6, 5, 3, 9, 0, 4, 7, 0]
];

solveSudoku(initial);

*/
