import { Component } from '@angular/core';
import { Sudoku } from './model.sudoku';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  sudoku: Sudoku[][];


  
  
  
  ngOnInit(): void {
    let s: Sudoku = new Sudoku();
    this.sudoku = s.getSudokuMatrix();
    // console.log("sudoku");
  }
  
  
}
