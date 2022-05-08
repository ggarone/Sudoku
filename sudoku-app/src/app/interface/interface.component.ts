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
    sudokuSolved: number[][];
    s: Sudoku = new Sudoku();
    result: string;
    result2: string

    ngOnInit(): void {
      this.sudoku = this.s.makeMatrix();
      this.sudokuInput = this.s.makeMatrix();
      this.s.fillPuzzle(this.sudoku);
      this.sudokuSolved = this.sudoku;
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
      this.result = 'YOU WIN!!!';
    }
    else {
      this.result = 'YOU LOSE';
      this.result2 = 'TRY AGAIN'
    }

    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if(this.sudoku[i][j] == -1){
          console.log(`poked: ${this.sudoku[i][j]} input: ${this.sudokuInput[i][j]} solved:${this.sudokuSolved[i][j]}`);
          
          if(this.sudokuInput[i][j] == this.sudokuSolved[i][j]){
            console.log(i + '-' + j);
            //cell input [i][j] => class green
          }
        } else {
            //cell input [i][j] => class red
          }
      }
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
