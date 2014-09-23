


var deepCopy = function(oldValue) {
  var newValue;
  strValue = JSON.stringify(oldValue);
  return newValue = JSON.parse(strValue);
}

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n,board) {
  if (n === 0) {
    return 1;
  }
  var output = [];
  board = board? board : new Board({'n': n});
  board.rowToAdd = 0;
  board.availableColumns = {0: true, 1: true,}
  // console.log(board.rows().length)
  var storage = [board];
  var solutionCount = 0;
  while (storage.length) {
    // console.log("storage now contains: " + storage);
    // console.log("storage length is: " + storage.length)
    // console.log(solutionCount)
    var temp = storage.pop();
    for (var i = 0; i < n; i++) {
      var newArr = deepCopy(temp.rows())
      var temp2 = new Board(newArr);
      temp2.rowToAdd = temp.rowToAdd + 1;
      temp2.togglePiece.call(temp2,temp.rowToAdd,i);
      if (!temp2.hasRowConflictAt(temp.rowToAdd) && !temp2.hasColConflictAt(i) && !temp2.hasMajorDiagonalConflictAt(i-temp.rowToAdd) && !temp2.hasMinorDiagonalConflictAt(i+temp.rowToAdd)) {
        if (temp2.rowToAdd === n) {
          var temp2rows = temp2.rows()
          var temp3 = _.flatten(temp2rows);
          output.push(temp3);
        } else {
          storage.push(temp2);
        }
      }
    }
  }
  return output;
};
