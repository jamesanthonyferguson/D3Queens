var n =8;

var cache = {};
cache.nine = [28, 30, 47, 44, 54, 44, 47, 30, 28, 30, 32, 44, 48, 44, 48, 44, 32, 30, 47, 44, 28, 38, 38, 38, 28, 44, 47, 44, 48, 38,
  36, 20, 36, 38, 48, 44, 54, 44, 38, 20, 40, 20, 38, 44, 54, 44, 48, 38, 36, 20, 36, 38,
  48, 44, 47, 44, 28, 38, 38, 38, 28, 44, 47, 30, 32, 44, 48, 44, 48, 44, 32, 30, 28, 30, 47, 44, 54, 44, 47, 30, 28]
cache.ten = [64, 48, 65, 93, 92, 92, 93, 65, 48, 64, 48, 62, 91, 72, 89, 89, 72, 91, 62, 48, 65, 91, 76, 61, 69, 69, 61, 76, 91, 65, 93, 72, 61, 68, 68, 68, 68,
  61, 72, 93, 92, 89, 69, 68, 44, 44, 68, 69, 89, 92, 92, 89, 69, 68, 44, 44, 68, 69, 89, 92, 93, 72,
  61, 68, 68, 68, 68, 61, 72, 93, 65, 91, 76, 61, 69, 69, 61, 76, 91, 65, 48, 62, 91, 72, 89, 89, 72, 91, 62, 48, 64, 48, 65, 93, 92, 92, 93, 65, 48, 64]
cache.eleven = [96, 219, 209, 295, 346, 350, 346, 295, 209, 219, 96, 219, 220, 260, 251, 277, 226, 277, 251, 260, 220, 219, 209, 260, 250, 247,
  239, 270, 239, 247, 250, 260, 209, 295, 251, 247, 238, 208, 202, 208, 238, 247, 251, 295, 346, 277, 239, 208, 178, 184, 178, 208, 239, 277, 346,
  350, 226, 270, 202, 184, 216, 184, 202, 270, 226, 350, 346, 277, 239, 208, 178, 184, 178, 208, 239, 277, 346, 295, 251, 247, 238, 208, 202, 208,
  238, 247, 251, 295, 209, 260, 250, 247, 239, 270, 239, 247, 250, 260, 209, 219, 220, 260, 251, 277, 226, 277, 251, 260, 220, 219, 96, 219, 209,
  295, 346, 350, 346, 295, 209, 219, 96];
cache.twelve = [500, 806, 1165, 1359, 1631, 1639, 1639, 1631, 1359, 1165, 806, 500, 806, 1072, 1273, 1275, 1354, 1320, 1320, 1354, 1275, 1273, 1072, 806, 
  1165, 1273, 1228, 1120, 1148, 1166, 1166, 1148, 1120, 1228, 1273, 1165, 1359, 1275, 1120, 1102, 1117, 1127, 1127, 1117, 1102, 1120, 1275, 1359,
  1631, 1354, 1148, 1117, 910, 940, 940, 910, 1117, 1148, 1354, 1631, 1639, 1320, 1166, 1127, 940, 908, 908, 940, 1127, 1166, 1320, 1639, 1639,
  1320, 1166, 1127, 940, 908, 908, 940, 1127, 1166, 1320, 1639, 1631, 1354, 1148, 1117, 910, 940, 940, 910, 1117, 1148, 1354, 1631, 1359, 1275, 1120, 1102,
  1117, 1127, 1127, 1117, 1102, 1120, 1275, 1359, 1165, 1273, 1228, 1120, 1148, 1166, 1166, 1148, 1120, 1228, 1273, 1165, 806, 1072, 1273,
  1275, 1354, 1320, 1320, 1354, 1275, 1273, 1072, 806, 500, 806, 1165, 1359, 1631, 1639, 1639, 1631, 1359, 1165, 806, 500];

var generateData = function(n) {
  var boardsN = countNQueensSolutions(n);
  var dataSet = [];
  for (var i = 0; i < n*n; i++) {
    dataSet.push(0);
  };
  for (var i = 0; i < boardsN.length; i++) {
    for (var j = 0; j < boardsN[i].length; j++) {
      if (boardsN[i][j] === 1) {
        dataSet[j]++;
      }
    }
  }
  return dataSet
}
var fullData = generateData(n)
var max = Math.max.apply(null,fullData);
var min = Math.min.apply(null,fullData);
var range = max - min;


var width = 601;
var height = 651;


var svg = d3.select(".visualisation").append("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("display", "block")

var colorise = function(n){
  return Math.ceil((16-(n-min)/range*16)).toString(16)+Math.ceil((16-(n-min)/range*16)).toString(16)+Math.ceil((16-(n-min)/range*16)).toString(16)
}

var colorise2 = function(n){
  return (240-Math.ceil(240*(n-min)/range))+','+(248-Math.ceil(248*(n-min)/range))+','+(255-Math.ceil(160*(n-min)/range))
}


// The initial display.

var update = function(data) {

  // DATA JOIN
  // Join new data with old elements, if any.
  var squares = svg.selectAll('rect').data(data);

  // UPDATE
  // Update old elements as needed.
  squares.transition().duration(100).attr("fill", function(d){ return ("rgb(" +colorise2(d)+")")})
    .attr("opacity", "1")

  // ENTER
  // Create new elements as needed.
  squares.enter().append('rect')
      .attr("class", "enter")
      .attr("height", "50")
      .attr("width", "50")
      .attr("fill", function(d){ return ("#" +colorise(d)+"")})
      .attr("x", function(d, i) { return (i % n)*50; })
      .attr("y", function(d, i) { return (Math.floor(i/n)*50)+60; })
      .attr("opacity", "0.2")
    .transition()
      .duration(100)
      .attr("y", function(d, i) { return Math.floor(i/n)*50; })
      .attr("opacity", "0.6")

      // ENTER + UPDATE
  // Appending to the enter selection expands the update selection to include
  // entering elements; so, operations on the update selection after appending to
  // the enter selection will apply to both entering and updating nodes.

  // EXIT
  // Remove old elements as needed.
  squares.exit().remove();
}

// for (var i = 1; i < fullData.length; i++) {
//   var temp = fullData.slice(0,i)
//   var loopDelay = function(i){
//     setTimeout(function(){
//       update(temp)
//     },i*800)
//   }
//   loopDelay(i);
// };

var initBoard = function() {
  var counter = 1;
  function next() {
    if (counter <= fullData.length+1) {
      var temp = Array.prototype.slice.call(fullData,0,counter)
      update(temp);
      counter++;
      setTimeout(next, 120);
    }
  }
  next();
}


initBoard();

$('.one').on('click', function() {
  n=1;
  fullData = generateData(n);
  max = Math.max.apply(null,fullData);
  min = Math.min.apply(null,fullData);
  range = max - min;
  initBoard();
});
$('.four').on('click', function() {
  n=4;
  fullData = generateData(n);
  max = Math.max.apply(null,fullData);
  min = Math.min.apply(null,fullData);
  range = max - min;
  initBoard();
});
$('.five').on('click', function() {
  n=5;
  fullData = generateData(n);
  max = Math.max.apply(null,fullData);
  min = Math.min.apply(null,fullData);
  range = max - min;
  initBoard();
});

$('.six').on('click', function() {
  n=6;
  fullData = generateData(n);
  max = Math.max.apply(null,fullData);
  min = Math.min.apply(null,fullData);
  range = max - min;
  initBoard();
});

$('.seven').on('click', function() {
  n=7;
  fullData = generateData(n);
  max = Math.max.apply(null,fullData);
  min = Math.min.apply(null,fullData);
  range = max - min;
  initBoard();
});
$('.eight').on('click', function() {
  n=8;
  fullData = generateData(n);
  max = Math.max.apply(null,fullData);
  min = Math.min.apply(null,fullData);
  range = max - min;
  initBoard();
});
$('.nine').on('click', function() {
  n=9;
  fullData = cache.nine;
  max = Math.max.apply(null,fullData);
  min = Math.min.apply(null,fullData);
  range = max - min;
  initBoard();
});
$('.ten').on('click', function() {
  n=10;
  fullData = cache.ten;
  max = Math.max.apply(null,fullData);
  min = Math.min.apply(null,fullData);
  range = max - min;
  initBoard();
});
$('.eleven').on('click', function() {
  n=11;
  fullData = cache.eleven;
  max = Math.max.apply(null,fullData);
  min = Math.min.apply(null,fullData);
  range = max - min;
  initBoard();
});
$('.twelve').on('click', function() {
  n=12;
  fullData = cache.twelve;
  max = Math.max.apply(null,fullData);
  min = Math.min.apply(null,fullData);
  range = max - min;
  initBoard();
});


