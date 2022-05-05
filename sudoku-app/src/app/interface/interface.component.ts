import { Component, OnInit } from '@angular/core';
import { Sudoku } from '../model.sudoku';

@Component({
  selector: 'app-interface',
  templateUrl: './interface.component.html',
  styleUrls: ['./interface.component.css']
})
export class InterfaceComponent implements OnInit {
    sudoku: number[][];
    row: number;
    column: number;
  
    ngOnInit(): void {
      let s: Sudoku = new Sudoku();
      this.sudoku = s.getSudokuMatrix();
      console.log(this.sudoku);
      console.log("Is board valid?? => " + s.checkIfBoardIsValid(this.sudoku));
      // s.pokeHolesIntoPuzzle();
      // this.sudoku = s.getSudokuMatrix();
      // console.log(this.sudoku);
      // console.log("Is board valid?? => " + s.checkIfBoardIsValid(this.sudoku));

      const TR = document.querySelector('tr');
      console.log(TR.getAttribute('row'));
      
  }
  
  checkSudokuInput(typedChar) {
    let letterRegex = /[^0-9]/;
      
      if(letterRegex.test(typedChar.key) && typedChar.key !== 'Backspace'){
        typedChar.preventDefault();
      }
      else {

      }
  }
}
