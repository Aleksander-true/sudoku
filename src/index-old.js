module.exports = function solveSudoku(matrix) {
  // your solution
  let stackTries = [];
  let position = [0,0];
  let isSolve = false;
  position = nextVacantPos(position);
//console.log('nextPosition=', position);
  if (position==false) {return false};
  tryValue(1,position);
  
//console.log('solve=',matrix);
  return matrix;


function tryValue(value, position) {
  let [rowIndex, columnIndex] = position;
  if (value > 9) {
    if (stackTries.length>0) {
      matrix[rowIndex][columnIndex] = 0;
      [value,position] = stackTries.pop(); 
      tryValue(value+1,position);
    } else {console.log('fail matrix='); return false;}
    
  }
  if (isSolve) {return null} 
  else {
    matrix[rowIndex][columnIndex] = value;
    if (checkRow(value,rowIndex) && checkColumn(value, columnIndex) && checkblock(value, rowIndex, columnIndex)) {
      stackTries.push( [value,position]);
      position = nextVacantPos(position);
  //  console.log('nextPosition=', position);
    if (position == false) {
//      console.log('matrix 8x8', matrix);
      isSolve = true;
      return null;
      } else {tryValue(1,position)};
  
    } else {
      tryValue(value+1,position);
    }
  }
  
}

function nextVacantPos (position) {
  
  for ( let i=0; i<matrix.length; i++) {
    for (let j=0; j<matrix[i].length; j++) {
      if (matrix[i][j] === 0) {return [i,j]}
    }
  }
return false;
}

function checkRow(value,rowIndex) {
  if (matrix[rowIndex].indexOf(value) === matrix[rowIndex].lastIndexOf(value)) {return true}
  else {return false}
}

function checkColumn (value,columnIndex) {
  let column = Array(matrix.length);
  for (let i=0; i<matrix.length; i++) {
    column[i] = matrix[i][columnIndex];
  }
  if (column.indexOf(value) === column.lastIndexOf(value)) {return true}
  else {return false};
}

function checkblock (value, rowIndex, columnIndex) {
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
    case columnIndex>=3 && rowIndex<=5: startColumn = 3; endColumn=5; break;
    case columnIndex>=6: startColumn = 6; endColumn=8; break;
  }

  for (let i=startRow; i<=endRow; i++) {
    for (let j=startColumn; j<=endColumn; j++) {
      block.push(matrix[i][j]);
    }
  }
  if (block.indexOf(value) === block.lastIndexOf(value)) {return true}
  else {return false};
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
