// export class Sudoku {
//   sudokuMatrix;
//   dim: number = 3;
//   max: number = 9;
//   counter = 0;

//   constructor() {
//     this.sudokuMatrix = this.makeMatrix();
//     this.fillPuzzle();
//   }

//   createArrayNum(): number[] {
//     let arrayNum = [1, 2, 3, 4, 5, 6, 7, 8, 9];
//     return arrayNum;
//   }

//   getSudokuMatrix(): number[][] {
//     return this.sudokuMatrix;
//   }

//   makeMatrix(): number[][] {
//     let arr = [];
//     for (let i = 0; i < this.max; i++) {
//       arr[i] = [];
//       for (let j = 0; j < this.max; j++) {
//         arr[i][j] = 0;
//       }
//     }
//     return arr;
//   }

//   // populateSquares(): void {

//   //   let arrayNum = this.createArrayNum();
//   //   //random first square

//   //   for (let u = 0; u < this.max; u += 3) {
//   //     for (let i = u; i < this.dim + u; i++) {
//   //       for (let j = u; j < this.dim + u; j++) {

//   //         const index = arrayNum.indexOf(Math.floor(Math.random() * this.max) + 1);
//   //         // if found
//   //         if (index > -1) {
//   //           this.sudokuMatrix[i][j] = arrayNum[index];
//   //           arrayNum.splice(index, 1); // 2nd parameter means remove one item only
//   //         } else {
//   //           j--;
//   //         }
//   //       }
//   //     }
//   //     arrayNum = this.createArrayNum();
//   //   }
//   // }

//   checkRow(number, row): boolean {
//     for (let j = 0; j < this.max; j++) {
//       if (this.sudokuMatrix[row][j] == number)
//         return false;
//     }
//     return true;

//   }

//   checkColumn(number, column): boolean {
//     for (let i = 0; i < this.max; i++) {
//       if (this.sudokuMatrix[i][column] == number)
//         return false;
//     }
//     return true;

//   }

//   checkSquare(number: number, x: number, y: number): boolean {
//     let init_x = x - (x % 3);
//     let init_y = y - (y % 3);

//     for (let i = init_x; i < this.dim+init_x; i++) {
//       for (let j = init_y; j < this.dim+init_y; j++) {
//         if (this.sudokuMatrix[i][j] == number)
//           return false;
//       }
//     }
//     return true;

//   }

//   getSquareFromCoord(x: number, y: number): number[] {
//     let init_x = x - (x % 3);
//     let init_y = y - (y % 3);
//     return [init_x, init_y];
//   }

//   // populateSudoku(): void {
//   //   let counter = 0;
//   //   let arrayNum = this.shuffle(this.createArrayNum())
//   //   console.log("alive");

//   //   for (let i = 0; i < this.max; i++) {
//   //     for (let j = 0; j < this.max; j++) {
//   //       if (this.sudokuMatrix[i][j] == 0 && arrayNum.length != 0) {
//   //         // if found
//   //         console.log("Adding=>" + arrayNum[counter]);
//   //         if (this.checkNumber(arrayNum[counter], i, j)) {
//   //           this.sudokuMatrix[i][j] = arrayNum[counter];
//   //           arrayNum = this.shuffle(this.createArrayNum())
//   //         } else {
//   //           arrayNum.splice(counter, 1); // 2nd parameter means remove one item only
//   //           j--;
//   //         }
//   //       }
//   //     }
//   //   }
//   //   console.log(this.getSudokuMatrix());
//   // }

//   nextEmptyCell() {
//     let emptyCell = {
//         row: 0,
//         col: 0
//       };

//     for (let i = 0; i < this.max; i++) {
//       for (let j = 0; j < this.max; j++) {
//         if (this.sudokuMatrix[i][j] == 0) {
//           emptyCell.row = i;
//           emptyCell.col = j;
//           return emptyCell;
//         }
//       }
//     }
//     return false;
//   }

//   shuffle = array => {
//     let newArray = [...array]
//     for (let i = newArray.length - 1; i > 0; i--) {
//       const j = Math.floor(Math.random() * (i + 1));
//       [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
//     }
//     return newArray;
//   }

//   fillPuzzle() {
//     const emptyCell = this.nextEmptyCell();
//     // If there are no more zeros, the board is finished, return it
//     if (!emptyCell){
//         console.log(this.sudokuMatrix);
//         console.log(this.counter + "exit from emptycell");
//       return this.sudokuMatrix;
//     }
//     for (let num of this.shuffle(this.createArrayNum())) {
//       // counter is a global variable tracking the number of iterations performed in generating a puzzle
//       // Most puzzles generate in < 500ms, but occassionally random generation could run in to
//       // heavy backtracking and result in a long wait. Best to abort this attempt and restart.
//       // See initializer function for more
//       this.counter++;
//       if (this.counter > 20_000_000) {
//         console.log("Error Recursion");
//         throw new Error("Recursion Timeout");
//       } 

//       if (this.checkNumber(num, emptyCell.row, emptyCell.col)) {
//         // If safe to place number, place it
//         // console.log(this.counter);
//         this.sudokuMatrix[emptyCell.row][emptyCell.col] = num;

//         // Recursively call the fill function to place num in next empty cell
//         this.fillPuzzle();

//         // If we were unable to place the future num, that num was wrong. 
//         // Reset it and try next
//         this.sudokuMatrix[emptyCell.row][emptyCell.col] = 0;
//       }
//     }
//     // If unable to place any number, return false, 
//     // causing previous round to go to next num
//     return false
//   }

//   checkNumber(number: number, x: number, y: number): boolean {
//     if (this.checkRow(number, x) && this.checkColumn(number, y) && this.checkSquare(number, x, y))
//       return true;
//     return false;
//   }

//     pokeHolesIntoPuzzle() {
//       let chance = 5;
//       let flag = 35; // make a easu sudoku with only 49 Holes
//       while (flag > 0) {
//         for (let i = 0; i < this.max; i++) {
//           for (let j = 0; j < this.max; j++) {
//             let randomNum = Math.floor(Math.random() * 100) + 1;
//             if (randomNum <= chance && flag > 0 && this.sudokuMatrix[i][j] != -1) {
//               this.sudokuMatrix[i][j] = -1;
//               flag--;
//             }
//           }
//         }
//       }
//     }

//     checkIfBoardIsValid(sudokuMatrix): boolean {
//       for (let i = 0; i < this.max; i++) {
//         for (let j = 0; j < this.max; j++) {
//           console.log(`checking if ${sudokuMatrix[i][j]} can is safe a position [${i}][${j}]`);
//           let safeToPlaceCheck = this.checkNumber(sudokuMatrix[i][j],i,j);
//           if (!(sudokuMatrix[i][j] > 0 && sudokuMatrix[i][j] <= this.max && safeToPlaceCheck)) {
//             return false;
//           }
//         }
//       }
//       return true;
//     }
// }


export class Sudoku {
  sudokuMatrix: number[][] = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0]
  ]

  counter: number;
  max: number = 9;
  dim: number = 3;
  numArray = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  emptyCell = {
    rowIndex: 0,
    colIndex: 0
  }

  constructor() { }

    makeMatrix(): number[][] {
    let arr = [];
    for (let i = 0; i < this.max; i++) {
      arr[i] = [];
      for (let j = 0; j < this.max; j++) {
        arr[i][j] = 0;
      }
    }
    return arr;
  }

  shuffle(array) {
    let newArray = [...array]
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  }

  /*--------------------------------------------------------------------------------------------
  --------------------------------- Check if Location Safe -------------------------------------
  --------------------------------------------------------------------------------------------*/

  // rowSafe = (puzzleArray, emptyCell, num) => {
  //   // -1 is return value of .find() if value not found
  //   return puzzleArray[emptyCell.rowIndex].indexOf(num) == -1
  // }
  // colSafe = (puzzleArray, emptyCell, num) => {
  //   return !puzzleArray.some(row => row[emptyCell.colIndex] == num)
  // }

  // boxSafe = (puzzleArray, emptyCell, num) => {
  //   let init_x = emptyCell.rowIndex - (emptyCell.rowIndex % 3) // Define top left corner of box region for empty cell
  //   let init_y = emptyCell.colIndex - (emptyCell.colIndex % 3)
  //   let safe = true

  //   for (let x of [0, 1, 2]) { // Each box region has 3 rows
  //     for (let y of [0, 1, 2]) { // Each box region has 3 columns
  //       if (puzzleArray[init_x + x][init_y + y] == num) { // Num is present in box region?
  //         safe = false // If number is found, it is not safe to place
  //       }
  //     }
  //   }
  //   return safe
  // }

  rowSafe(sudokuMatrix,emptyCell,number): boolean {
    let row = emptyCell.rowIndex;
    let column = emptyCell.colIndex;
    for (let j = 0; j < this.max; j++) {
      if (sudokuMatrix[row][j] == number && j != column)
        return false;
    }
    return true;

  }

  colSafe(sudokuMatrix,emptyCell,number): boolean {
    let row = emptyCell.rowIndex;
    let column = emptyCell.colIndex;
    for (let i = 0; i < this.max; i++) {
      if (sudokuMatrix[i][column] == number && i != row)
        return false;
    }
    return true;

  }

  boxSafe(sudokuMatrix,emptyCell,number): boolean {
    let row = emptyCell.rowIndex;
    let column = emptyCell.colIndex;
    let init_x = row - (row % 3);
    let init_y = column - (column % 3);

    for (let i = init_x; i < this.dim+init_x; i++) {
      for (let j = init_y; j < this.dim+init_y; j++) {
        if (sudokuMatrix[i][j] == number && (!(i == row && j == column)))
          return false;
      }
    }
    return true;
  }

  safeToPlace = (puzzleArray, emptyCell, num) => {
    return this.rowSafe(puzzleArray, emptyCell, num) &&
      this.colSafe(puzzleArray, emptyCell, num) &&
      this.boxSafe(puzzleArray, emptyCell, num)
  }

  /*--------------------------------------------------------------------------------------------
  --------------------------------- Obtain Next Empty Cell -------------------------------------
  --------------------------------------------------------------------------------------------*/

  nextEmptyCell = puzzleArray => {
    const emptyCell = {
      rowIndex: "",
      colIndex: ""
    }

    puzzleArray.forEach((row, rowIndex) => {
      if (emptyCell.colIndex !== "") return // If this key has already been assigned, skip iteration
      let firstZero = row.find(col => col === 0) // find first zero-element
      if (firstZero === undefined) return; // if no zero present, skip to next row
      emptyCell.rowIndex = rowIndex
      emptyCell.colIndex = row.indexOf(firstZero)
    })

    if (emptyCell.colIndex !== "") return emptyCell
    // If emptyCell was never assigned, there are no more zeros
    return false
  }

  /*--------------------------------------------------------------------------------------------
  --------------------------------- Generate Filled Board -------------------------------------
  --------------------------------------------------------------------------------------------*/

  fillPuzzle = startingBoard => {
    const emptyCell = this.nextEmptyCell(startingBoard)
    // If there are no more zeros, the board is finished, return it
    if (!emptyCell) return startingBoard 

    // Shuffled [0 - 9 ] array fills board randomly each pass
    for (let num of this.shuffle(this.numArray)) {
      // counter is a global variable tracking the number of iterations performed in generating a puzzle
      // Most puzzles generate in < 500ms, but occassionally random generation could run in to
      // heavy backtracking and result in a long wait. Best to abort this attempt and restart.
      // 20_000_000 iteration maximum is approximately 1.3 sec runtime.
      // See initializer function for more
      this.counter++
      if (this.counter > 20_000_000) throw new Error("Recursion Timeout")
      if (this.safeToPlace(startingBoard, emptyCell, num)) {
        startingBoard[emptyCell.rowIndex][emptyCell.colIndex] = num // If safe to place number, place it
        // Recursively call the fill function to place num in next empty cell
        if (this.fillPuzzle(startingBoard)) return startingBoard
        // If we were unable to place the future num, that num was wrong. Reset it and try next value
        startingBoard[emptyCell.rowIndex][emptyCell.colIndex] = 0
      }
    }
    return false // If unable to place any number, return false, which triggers previous round to go to next num
  }

  getSudokuMatrix() {
    return this.sudokuMatrix;
  }

  pokeHolesIntoPuzzle(sudokuMatrix: number[][]) {
    let chance = 5;
    let flag = 35; // make a easy sudoku with only 49 Holes
    while(flag > 0){
      for (let i = 0; i < this.max; i++) {
        for (let j = 0; j < this.max; j++) {
          let randomNum = Math.floor(Math.random() * 100) + 1;
          if(randomNum <= chance && flag > 0 && sudokuMatrix[i][j] != -1){
            sudokuMatrix[i][j] = -1;
            flag--;
          }
        }
      }
    }
  }

  checkIfBoardIsValid(sudokuMatrix) : boolean {
    for (let i = 0; i < this.max; i++) {
      for (let j = 0; j < this.max; j++) {
        this.emptyCell.rowIndex = i;
        this.emptyCell.colIndex = j;
        // console.log(`checking if ${sudokuMatrix[i][j]} can is safe a position [${i}][${j}]`);
        let safeToPlaceCheck = this.safeToPlace(sudokuMatrix,this.emptyCell,sudokuMatrix[i][j]);
        if (!(sudokuMatrix[i][j] > 0 && sudokuMatrix[i][j] <= this.max && safeToPlaceCheck)) {
          return false;
        }
      }
    }
    return true;
  }
} 