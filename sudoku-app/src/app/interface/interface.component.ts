import { Component, Input, OnInit } from '@angular/core';
import { Sudoku } from '../model.sudoku';

@Component({
  selector: 'app-interface',
  templateUrl: './interface.component.html',
  styleUrls: ['./interface.component.css']
})
export class InterfaceComponent implements OnInit {
    sudoku: number[][];
    sudokuInput: number[][];
    s: Sudoku = new Sudoku();
    result: string;
  
    ngOnInit(): void {
      this.sudoku = this.s.makeMatrix();
      this.sudokuInput = this.s.makeMatrix();
      this.s.fillPuzzle(this.sudoku);
      // console.log(this.sudoku);
      console.log("Is board valid?? => " + this.s.checkIfBoardIsValid(this.sudoku));
      this.s.pokeHolesIntoPuzzle(this.sudoku);
      // console.log(this.sudoku);
      console.log("Is board valid?? => " + this.s.checkIfBoardIsValid(this.sudoku));      
      this.clone();
  }
  
  checkSudokuInput(event,row,column) {
    let letterRegex = /[^0-9]/;
      
      if(letterRegex.test(event.key) && event.key !== 'Backspace'){
        event.preventDefault();
      }
      else {
        console.log(row,column);
        
        this.sudokuInput[row][column] = Number(event.key);
        console.log(this.sudoku);
      }


  }

  checkFullBoard(){

    if(this.s.checkIfBoardIsValid(this.sudokuInput)){
      this.result = 'You Win!';
    }
    else {
      this.result = 'You Lose.';
    }

  }

  clone(){
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        this.sudokuInput[i][j] = this.sudoku[i][j];
      }
    }
  }

}
