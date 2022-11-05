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

function randArr(size, [from, to]) {
  let arr = [];
  for (let i = 0; i < size; i++) arr.push(randInt(from, to));
  return arr;
}

function obstaclePositionArray(size, limit) {
  let arr = [];
  for (let i = 0; i < size; i++) {
    arr.push(randArr(2, [1, limit]));
  }
  return arr;
}

// -------------------------------------------------------------------------------------------------

// FINDS ENDS FOR GIVEN QUEEN POSITION,(LEFT, RIGHT, TOP, BOTTOM)-----------------------------------
// -------------------------------------------------------------------------------------------------
function leftRight(size, row, column) {
  return [
    [row, 0],
    [row, size + 1],
  ];
}

function topBottom(size, row, column) {
  return [
    [size + 1, column],
    [0, column],
  ];
}

function TopRight(size, row, column) {
  let diff = smaller(size - row, size - column);
  diff++;
  return [row + diff, column + diff];
}

function TopLeft(size, row, column) {
  let diff = smaller(size - row, column - 1);
  diff++;

  return [row + diff, column - diff];
}

function BottomRight(size, row, column) {
  let rem = smaller(row - 1, size - column);
  rem++;

  return [row - rem, column + rem];
}

function BottomLeft(size, row, column) {
  let rem = smaller(row - 1, column - 1);
  rem++;

  return [row - rem, column - rem];
}

function giveEdges_l_r_t_b_tl_tr_bl_br(size, row, column) {
  let [l, r] = leftRight(size, row, column);
  let [t, b] = topBottom(size, row, column);
  let tl = TopLeft(size, row, column);
  let tr = TopRight(size, row, column);
  let bl = BottomLeft(size, row, column);
  let br = BottomRight(size, row, column);

  return [l, r, t, b, tl, tr, bl, br];
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

function testLeftRightTopEtc(size) {
  let row, col;

  row = randInt(1, size);
  col = randInt(1, size);

  let l, r, t, b;
  // [l, r] = leftRight(size, row, col);
  // [t, b] = topBottom(size, row, col);
  tl = [];
  tr = [];
  bl = [];
  br = [];
  t = [];
  b = [];
  l = [];
  r = [];

  for (let i = 1; i <= size; i++) {
    for (let j = 1; j <= size; j++) {
      if (i === row && j === col) continue;

      if (isTop(row, col, i, j)) t.push([i, j]);
      if (isBottom(row, col, i, j)) b.push([i, j]);
      if (isLeft(row, col, i, j)) l.push([i, j]);
      if (isRight(row, col, i, j)) r.push([i, j]);

      if (isTopRight(row, col, i, j)) tr.push([i, j]);
      if (isTopLeft(row, col, i, j)) tl.push([i, j]);
      if (isBottomRight(row, col, i, j)) br.push([i, j]);
      if (isBottomLeft(row, col, i, j)) bl.push([i, j]);
    }
  }

  console.log(`Size is ${size}`);
  console.log(`Position of queen ${[row, col]}`);

  console.log(`top of queen ${t.join(",")}`);
  console.log(`bottom of queen ${b.join(",")}`);
  console.log(`right of queen ${r.join(",")}`);
  console.log(`left of queen ${l.join(",")}`);

  console.log(`topleft of queen ${tl.join(",")}`);
  console.log(`topright of queen ${tr.join(",")}`);
  console.log(`bottomleft of queen ${bl.join(",")}`);
  console.log(`bottomright of queen ${br.join(",")}`);
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

// MASTER TEST CASE

function closestObstacles(size) {
  let row = randInt(1, size);
  let column = randInt(1, size);

  let [l, r] = leftRight(size, row, column);
  let [t, b] = topBottom(size, row, column);
  let tl = TopLeft(size, row, column);
  let tr = TopRight(size, row, column);
  let bl = BottomLeft(size, row, column);
  let br = BottomRight(size, row, column);

  let col = column;
  for (let i = 1; i <= size; i++) {
    for (let j = 1; j <= size; j++) {
      if (i === row && j === column) continue;

      if (isTop(row, col, i, j)) {
        t = lowerRow(...t, i, j);
      }
      if (isBottom(row, col, i, j)) {
        b = higherRow(...b, i, j);
      }
      if (isLeft(row, col, i, j)) {
        l = greaterColumn(...l, i, j);
      }
      if (isRight(row, col, i, j)) {
        r = lesserColumn(...r, i, j);
      }

      if (isTopRight(row, col, i, j)) {
        tr = lowerRow(...tr, i, j);
      }
      if (isTopLeft(row, col, i, j)) {
        tl = lowerRow(...tl, i, j);
      }
      if (isBottomRight(row, col, i, j)) {
        br = higherRow(...br, i, j);
      }
      if (isBottomLeft(row, col, i, j)) {
        bl = higherRow(...bl, i, j);
      }
    }
  }

  console.log(`Size is ${size}`);
  console.log(`Position of queen ${[row, column]}`);

  console.log(`top of queen ${t.join(",")}`);
  console.log(`bottom of queen ${b.join(",")}`);
  console.log(`right of queen ${r.join(",")}`);
  console.log(`left of queen ${l.join(",")}`);

  console.log(`topleft of queen ${tl.join(",")}`);
  console.log(`topright of queen ${tr.join(",")}`);
  console.log(`bottomleft of queen ${bl.join(",")}`);
  console.log(`bottomright of queen ${br.join(",")}`);
}

//function to find accessible boxes

function HorizontalBoxes_r_l(r, l) {
  return r[1] - l[1] - 2;
}

function VerticleBoxes_t_b(t, b) {
  return t[0] - b[0] - 2;
}

function boxesBetween_l_r_t_b_tl_tr_bl_br(l, r, t, b, tl, tr, bl, br) {
  let h, v, tlD, trD;
  h = HorizontalBoxes_r_l(r, l);
  v = VerticleBoxes_t_b(t, b);
  tlD = VerticleBoxes_t_b(tl, br);
  trD = VerticleBoxes_t_b(tr, bl);
  return h + v + tlD + trD;
}

// ANSWER FUNCTION
// IT TAKES SIZE, QUEENPOSITION, OBSTACLEPOSITION
// GET CLOSEST OBSTACLE FROM OBSTACLEARRAY
// FIND THE BETWEEN BOXES
function closestObstacle2(size, row, col, obArray) {
  console.log(`Position of obstacles ${obArray.join(",")}`);

  let [l, r, t, b, tl, tr, bl, br] = giveEdges_l_r_t_b_tl_tr_bl_br(
    size,
    row,
    col
  );

  for (let [i, j] of obArray) {
    if (i === row && j === col) continue;

    if (isTop(row, col, i, j)) {
      t = lowerRow(...t, i, j);
    }
    if (isBottom(row, col, i, j)) {
      b = higherRow(...b, i, j);
    }
    if (isLeft(row, col, i, j)) {
      l = greaterColumn(...l, i, j);
    }
    if (isRight(row, col, i, j)) {
      r = lesserColumn(...r, i, j);
    }

    if (isTopRight(row, col, i, j)) {
      tr = lowerRow(...tr, i, j);
    }
    if (isTopLeft(row, col, i, j)) {
      tl = lowerRow(...tl, i, j);
    }
    if (isBottomRight(row, col, i, j)) {
      br = higherRow(...br, i, j);
    }
    if (isBottomLeft(row, col, i, j)) {
      bl = higherRow(...bl, i, j);
    }
  }

  return [l, r, t, b, tl, tr, bl, br];
}

function ANSWER(size, row, col, obArray) {
  let [l, r, t, b, tl, tr, bl, br] = closestObstacle2(size, row, col, obArray);
  return boxesBetween_l_r_t_b_tl_tr_bl_br(l, r, t, b, tl, tr, bl, br);
}

console.log("------------------------------");
console.log(
  `Number of accessible boxes are ${ANSWER(
    4,
    2,
    3,
    obstaclePositionArray(4, 4)
  )}`
);
