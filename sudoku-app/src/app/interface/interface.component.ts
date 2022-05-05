import { Component, OnInit } from '@angular/core';
import { Sudoku } from '../model.sudoku';

@Component({
  selector: 'app-interface',
  templateUrl: './interface.component.html',
  styleUrls: ['./interface.component.css']
})
export class InterfaceComponent implements OnInit {
    sudoku: number[][];
  
    ngOnInit(): void {
      let s: Sudoku = new Sudoku();
      this.sudoku = s.getSudokuMatrix();
  }
  
  checkSudokuInput(typedChar) {
    let letterRegex = /[^0-9]/;
      
      if(letterRegex.test(typedChar.key) && typedChar.key !== 'Backspace'){
        typedChar.preventDefault();
      }
  }
    

    
}
