import { Component } from '@angular/core';
import { Sudoku } from './model.sudoku';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'sudoku-app';
  
  
  
  ngOnInit(): void {
    let s: Sudoku = new Sudoku(9,9,0);
    console.log(s.getSudokuMatrix());
    
    // console.log("sudoku");
  }
  
  
}
