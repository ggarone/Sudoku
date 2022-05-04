import {
  empty
} from "rxjs";

export class Sudoku {
  w: number;
  h: number;
  val: number;
  sudokuMatrix: number[][];
  dim: number = 3;
  max: number = 9;
  map = new Map();
  counter = 0;

  constructor(w: number, h: number, val: number) {
    // let sudokuMatrix = this.makeMatrix(9,9,0);
    // console.log("|||||" + sudokuMatrix);
    this.w = w;
    this.h = h;
    this.val = val;
    this.sudokuMatrix = this.makeMatrix();
    // this.populateSquares();
    // this.populateSudoku();
    // console.log(this.getSquareFromCoord(4,3));
    this.fillPuzzle();
  }

  createArrayNum(): number[] {
    let arrayNum = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    return arrayNum;
  }

  getSudokuMatrix(): number[][] {
    return this.sudokuMatrix;
  }


  makeMatrix(): number[][] {
    var arr = [];
    for (let i = 0; i < this.h; i++) {
      arr[i] = [];
      for (let j = 0; j < this.w; j++) {
        arr[i][j] = this.val;
      }
    }
    return arr;
  }

  populateSquares(): void {

    let arrayNum = this.createArrayNum();
    //random first square

    for (let u = 0; u < this.max; u += 3) {
      for (let i = u; i < this.dim + u; i++) {
        for (let j = u; j < this.dim + u; j++) {

          const index = arrayNum.indexOf(Math.floor(Math.random() * this.max) + 1);
          // if found
          if (index > -1) {
            this.sudokuMatrix[i][j] = arrayNum[index];
            arrayNum.splice(index, 1); // 2nd parameter means remove one item only
          } else {
            j--;
          }
        }
      }
      arrayNum = this.createArrayNum();
    }
  }

  checkRow(number, row): boolean {
    for (let j = 0; j < this.max; j++) {
      if (this.sudokuMatrix[row][j] == number)
        return false;
    }
    return true;

  }

  checkColumn(number, column): boolean {
    for (let i = 0; i < this.max; i++) {
      if (this.sudokuMatrix[i][column] == number)
        return false;
    }
    return true;

  }

  checkSquare(number: number, x: number, y: number): boolean {
    let coordArray = this.getSquareFromCoord(x, y);
    let init_x = coordArray[0];
    let init_y = coordArray[1];

    for (let i = init_x; i < this.dim; i++) {
      for (let j = init_y; j < this.dim; j++) {
        if (this.sudokuMatrix[i][j] == number)
          return false;
      }
    }
    return true;
  }


  getSquareFromCoord(x: number, y: number): number[] {
    // if((x >= 0 && x <= 2) && (y >= 0 && y <= 2)){
    //     // console.log("Square 1");
    //     return [0,0];
    // }
    // if((x >= 0 && x <= 2) && (y >= 3 && y <= 5)){
    //     // console.log("Square 2");
    //     return [0,3];
    // }
    // if((x >= 0 && x <= 2) && (y >= 6 && y <= 8)){
    //     // console.log("Square 3");
    //     return [0,6];
    // }
    // if((x >= 3 && x <= 5) && (y >= 0 && y <= 2)){
    //     // console.log("Square 4");
    //     return [3,0];
    // }
    // if((x >= 3 && x <= 5) && (y >= 3 && y <= 5)){
    //     // console.log("Square 5");
    //     return [3,3];
    // }
    // if((x >= 3 && x <= 5) && (y >= 6 && y <= 8)){
    //     // console.log("Square 6");
    //     return [3,6];
    // }
    // if((x >= 6 && x <= 8) && (y >= 0 && y <= 2)){
    //     // console.log("Square 7");
    //     return [6,0];
    // }
    // if((x >= 6 && x <= 8) && (y >= 3 && y <= 5)){
    //     // console.log("Square 8");
    //     return [6,3];
    // }
    // if((x >= 6 && x <= 8) && (y >= 6 && y <= 8)){
    //     // console.log("Square 9");
    //     return [6,6];
    // }
    // return [-1,-1];

    let init_x = x - (x % 3);
    let init_y = y - (y % 3);
    return [init_x, init_y];

  }

  populateSudoku(): void {
    let counter = 0;
    let arrayNum = this.createArrayNum();
    console.log("alive");

    for (let i = 0; i < this.max; i++) {
      for (let j = 0; j < this.max; j++) {
        if (this.sudokuMatrix[i][j] == 0 && arrayNum.length != 0) {
          // if found
          console.log("Adding=>" + arrayNum[counter]);
          if (this.checkNumber(arrayNum[counter], i, j)) {
            this.sudokuMatrix[i][j] = arrayNum[counter];
            arrayNum = this.createArrayNum();
          } else {
            arrayNum.splice(counter, 1); // 2nd parameter means remove one item only
            j--;
          }
        }
      }
    }
    console.log(this.getSudokuMatrix());
  }

  nextEmptyCell() {
    let emptyCell = {
        row: 0,
        col: 0
      };

    for (let i = 0; i < this.max; i++) {
      for (let j = 0; j < this.max; j++) {
        if (this.sudokuMatrix[i][j] == 0) {
          emptyCell.row = i;
          emptyCell.col = j;
          return emptyCell;
        }
      }
    }
    return false;
  }

  shuffle = array => {
    let newArray = [...array]
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  }

  fillPuzzle() {
    const emptyCell = this.nextEmptyCell();
    // If there are no more zeros, the board is finished, return it
    if (!emptyCell){
        console.log(this.sudokuMatrix);
        console.log(this.counter + "exit from emptycell");
      return this.sudokuMatrix;
    }
    for (let num of this.shuffle(this.createArrayNum())) {
      // counter is a global variable tracking the number of iterations performed in generating a puzzle
      // Most puzzles generate in < 500ms, but occassionally random generation could run in to
      // heavy backtracking and result in a long wait. Best to abort this attempt and restart.
      // See initializer function for more
      this.counter++;
      if (this.counter > 20_000_000) {
        console.log("Error Recursion");
        throw new Error("Recursion Timeout");
      } 

      if (this.checkNumber(num, emptyCell.row, emptyCell.col)) {
        // If safe to place number, place it
        // console.log(this.counter);
        this.sudokuMatrix[emptyCell.row][emptyCell.col] = num;

        // Recursively call the fill function to place num in next empty cell
        this.fillPuzzle();
          
        // If we were unable to place the future num, that num was wrong. 
        // Reset it and try next
        this.sudokuMatrix[emptyCell.row][emptyCell.col] = 0;
      }
    }
    // If unable to place any number, return false, 
    // causing previous round to go to next num
    return false
  }

  checkNumber(number: number, x: number, y: number): boolean {
    if (this.checkRow(number, x) && this.checkColumn(number, y) && this.checkSquare(number, x, y))
      return true;
    return false;
  }
}
