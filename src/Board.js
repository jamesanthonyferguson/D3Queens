
(function() {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function() {
      return _(_.range(this.get('n'))).map(function(rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function(rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _isInBounds: function(rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },

    hasRowConflictAt: function(rowIndex) {
       var count = 0;
       var rows = this.rows();
       for(var i = 0; i < rows.length ; i++){
        if(rows[rowIndex][i]){
          if(count){
            return true
          }else{
            count++;
          }
        }
       }
       return false;
    },


    hasColConflictAt: function(colIndex) {
      var count = 0;
      var rows = this.rows();
      for(var i = 0; i < rows.length ; i++){
       if(rows[i][colIndex]){
         if(count){
           return true
         }else{
           count++;
         }
       }
      }
      return false;
   },


    hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow) {
      var count = 0;
      var rows = this.rows();
      var i = majorDiagonalColumnIndexAtFirstRow;
      for (var row = 0; row < rows.length; row++) {
        if (rows[row][i+row]) {
          if(count){
            return true;
          }
          count ++;
        }
      }
      return false;
   },


    hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow) {
     var count = 0;
     var rows = this.rows();
     var i = minorDiagonalColumnIndexAtFirstRow;
     for (var row = 0; row < rows.length; row++) {
       if (rows[row][i-row]) {
         if(count){
           return true;
         }
         count ++;
       }
     }
     return false;
    },

  });

  var makeEmptyMatrix = function(n) {
    return _(_.range(n)).map(function() {
      return _(_.range(n)).map(function() {
        return 0;
      });
    });
  };

}());
