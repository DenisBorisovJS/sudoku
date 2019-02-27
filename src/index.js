module.exports = function solveSudoku(matrix) {
  const numbers = [1,2,3,4,5,6,7,8,9]
  var isSolved = false;

  function playSudoku(zero) {
    isSolved = !zero;
    if (isSolved) { return matrix; }

    for (var i = 0; i < numbers.length; i++) {
      const number = numbers[i];
      if (checkRow(zero.col,matrix,number) && checkCol(zero.row,matrix,number) && checkRect(zero.row,zero.col,matrix,number)) {
        matrix[zero.row][zero.col] = number;
        playSudoku(findZero(matrix));
        if (isSolved) return;
      }
    }
    matrix[zero.row][zero.col] = 0;
  }

  playSudoku(findZero(matrix));

  return matrix;
}

function checkRow(col,initial,number) {
  for (i = 0; i < initial.length; i++) {
    if (initial[i][col] == number) return false;
  }
  return true;
}

function checkCol(row,initial,number) {
  for (i = 0; i < initial.length; i++) {
    if (initial[row][i] == number) return false;
  }
  return true;
}

function checkRect(row,col,initial,number) {
  row = Math.floor(row / 3) * 3;
  column = Math.floor(col / 3) * 3;
  for (var i = 0; i < 3; i++) {
    for (var j = 0; j < 3; j++) {
      if (initial[row + i][column + j] == number) return false;
    }
  }
  return true;
}

function findZero(matrix) {
  for (var row = 0; row < matrix.length; row++) {
    for (var col = 0; col < matrix[row].length; col++) {
      if (matrix[row][col] === 0) return {row, col};
    }
  }
  return false;
}
