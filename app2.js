// ATOMIC
// -------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------

function randInt(from, to) {
  return Math.floor(Math.random() * (to - from + 1)) + from;
}

function bigger(a, b) {
  return a > b ? a : b;
}

function smaller(a, b) {
  return a < b ? a : b;
}

// -------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------

// LEVEL 1

function randArr(size, [from, to]) {
  let arr = [];
  for (let i = 0; i < size; i++) arr.push(randInt(from, to));
  return arr;
}

// LEVEL 2
function obArr(size, limit) {
  let arr = [];
  for (let i = 0; i < size; i++) {
    arr.push(randArr(2, [1, limit]));
  }
  return arr;
}
// -------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------

// FINDS ENDS FOR GIVEN QUEEN POSITION,(LEFT, RIGHT, TOP, BOTTOM)-----------------------------------
// -------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------
function leftRight(size, row, column) {
  return [
    [row, 1],
    [row, size],
  ];
}

function topBottom(size, row, column) {
  return [
    [size, column],
    [1, column],
  ];
}

function TopRight(size, row, column) {
  let diff = smaller(size - row, size - column);
  return [row + diff, column + diff];
}

function TopLeft(size, row, column) {
  let diff = smaller(size - row, column - 1);
  return [row + diff, column - diff];
}

function BottomLeft(size, row, column) {
  let rem = smaller(row - 1, column - 1);
  return [row - rem, column - rem];
}

function BottomRight(size, row, column) {
  let rem = smaller(row - 1, size - column);
  return [row - rem, column + rem];
}

//Creating function to test whether edges is correct or not
function testEnds(size, row, column) {
  let [l, r] = leftRight(size, row, column);
  let [t, b] = topBottom(size, row, column);
  let tl = TopLeft(size, row, column);
  let tr = TopRight(size, row, column);
  let bl = BottomLeft(size, row, column);
  let br = BottomRight(size, row, column);

  let edgePair = [
    ["left", l],
    ["right", r],
    ["top", t],
    ["bottom", b],
    ["top-left", tl],
    ["top-right", tr],
    ["bottom-left", bl],
    ["bottom-right", br],
  ];

  for (let [pname, p] of edgePair) {
    console.log(`${p} is to the ${pname} of ${[row, column]}`);
  }
}
// -------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------

// CHECKING FOR LEFT, RIGHT,TOP, DIAGNOL ELEMENTS --------------------------------------------------
// -------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------

function isLeft(row, column, row1, column1) {
  return row1 === row && column1 < column;
}

function isRight(row, column, row1, column1) {
  return row1 === row && column1 > column;
}

function isTop(row, column, row1, column1) {
  return row1 > row && column1 === column;
}

function isBottom(row, column, row1, column1) {
  return row1 < row && column1 === column;
}

function isTopRight(row, column, row1, column1) {
  return row1 - row === column1 - column && row1 - row > 0;
}

function isTopLeft(row, column, row1, column1) {
  return row1 - row === -(column1 - column) && row1 - row > 0;
}

function isBottomRight(row, column, row1, column1) {
  return row1 - row === -(column1 - column) && row1 - row < 0;
}

function isBottomLeft(row, column, row1, column1) {
  return row1 - row === column1 - column && row1 - row < 0;
}
// -------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------

// Functions to return closest obstacle to the queen
function lesserColumn(row1, col1, row2, col2) {
  return col1 < col2 ? [row1, col1] : [row2, col2];
}

function greaterColumn(row1, col1, row2, col2) {
  return col1 > col2 ? [row1, col1] : [row2, col2];
}

function lowerRow(row1, col1, row2, col2) {
  return row1 < row2 ? [row1, col1] : [row2, col2];
}

function higherRow(row1, col1, row2, col2) {
  return row1 > row2 ? [row1, col1] : [row2, col2];
}

// -> RIGHT
// <- LEFT
