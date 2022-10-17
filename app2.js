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

function allEnds(size, row, column) {
  let [l, r] = leftRight(size, row, column);
  let [t, b] = topBottom(size, row, column);
  let tl = TopLeft(size, row, column);
  let tr = TopRight(size, row, column);
  let bl = BottomLeft(size, row, column);
  let br = BottomRight(size, row, column);
  console.log(l, r);
  console.log(t, b);
  console.log(...tl);
  console.log(...tr);
  console.log(...bl);
  console.log(...br);
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

// function test(row, column, r1, c1, str, func) {
//   console.log(
//     `Is ${[r1, c1]} is ${str} of ${[row, column]}? ${func(row, column, r1, c1)}`
//   );
// }
// for (let i = 0; i < 10; i++) {
//   let size = 10;
//   let row = randInt(1, size);
//   let column = randInt(1, size);

//   let [r1, c1] = TopLeft(size, row, column);
//   let [r2, c2] = TopRight(size, row, column);
//   let [r3, c3] = BottomLeft(size, row, column);
//   let [r4, c4] = BottomRight(size, row, column);

//   console.log(`${size}X${size}`);
//   test(row, column, r1, c1, "top-left", isTopLeft);
//   test(row, column, r2, c2, "top-right", isTopRight);
//   test(row, column, r3, c3, "bottom-left", isBottomLeft);
//   test(row, column, r4, c4, "bottom-right", isBottomRight);

//   console.log(`\n\n`);
// }

// left = closestLeft(row, column, row1, column1);

function closestLeft(row, column, row1, column1) {
  return column1 < column ? [row1, column1] : [row, column];
}

// for (let i = 0; i < 5; i++) {
//   let [row, column] = [3, 3];
//   let [r1, c1] = [3, 3 + 2 - i];

//   console.log(`closest left is ${closestLeft(row, column, r1, c1)}`);
// }

// -------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------
//Creating function to test whether edges is correct or not
function testEnds(size, row, column) {
  let [l, r] = leftRight(size, row, column);
  let [t, b] = topBottom(size, row, column);
  let tl = TopLeft(size, row, column);
  let tr = TopRight(size, row, column);
  let bl = BottomLeft(size, row, column);
  let br = BottomRight(size, row, column);

  function print(row, column, edge, str) {
    console.log(`${edge} is to the ${str} of ${[row, column]}`);
  }

  console.log(`Chess Board Size is ${size}X${size}`);
  console.log(`Queen is at ${[row, column]}`);

  print(row, column, l, "left");
  print(row, column, r, "right");
  print(row, column, t, "top");
  print(row, column, b, "bottom");

  print(row, column, tl, "top-left");
  print(row, column, tr, "top-right");
  print(row, column, bl, "bottom-left");
  print(row, column, br, "bottom-right");
}

testEnds(3, 2, 2);
