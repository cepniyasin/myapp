import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
  squares: any[];
  xIsNext: boolean;
  winner: string;

  constructor() {}

  ngOnInit() {
    this.newGame();
  }

  newGame() {
    this.squares = Array(9).fill(null);
    this.winner = null;
    this.xIsNext = true;
  }

  get player() {
    return this.xIsNext ? 'X' : 'O';
  }

  makeMove(idx: number) {
        if (!this.winner){
    if (!this.squares[idx]) {
      this.squares.splice(idx, 1, this.player);
      this.xIsNext = !this.xIsNext;

    }
    this.winner = this.calculateWinner(this.squares);

    if (!this.winner){this.opponentMove()}
    }
    
  }

////// My main additions start. /////

  opponentMove(){
    let possibleMoves = this.findPossibleMoves(this.squares)
    let winningMove = this.checkWinningMove(possibleMoves);
    if(winningMove){
      this.squares.splice(winningMove, 1, 'O');
      this.winner = this.calculateWinner(this.squares)
      this.xIsNext = !this.xIsNext;
      return
    }

    let blockingMove = this.checkBlockingMove(possibleMoves);
    if (blockingMove){
      this.squares.splice(blockingMove, 1, 'O');
      this.xIsNext = !this.xIsNext;
      return
    }

    this.makeRandomMove(possibleMoves);
    this.xIsNext = !this.xIsNext;
    return 
  }

  findPossibleMoves(arr){
    let possibleMoveIndices = []
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] == null){
        possibleMoveIndices.push(i)
      }
    }
    console.log(possibleMoveIndices)
    return possibleMoveIndices
  }

  checkWinningMove(arr){
    for (let i = 0; i < arr.length; i++) {
        let temp_arr = [...this.squares]
        temp_arr[arr[i]] = "O"
        if (this.calculateWinner(temp_arr)){
          console.log(arr[i])
          return arr[i]
        }
    }
    return null
  }
  
  checkBlockingMove(arr){
    for (let i = 0; i < arr.length; i++) {
      let temp_arr = [...this.squares]
      temp_arr[arr[i]] = "X"
      if (this.calculateWinner(temp_arr)){
        console.log(arr[i])
        return arr[i]
      }
  }
  return null
  }

  makeRandomMove(arr){
    let numberOfPossibleMoves = arr.length
    let randomIndex = this.getRandomInt(numberOfPossibleMoves)
    this.squares.splice(randomIndex, 1, 'O');
      return
  }
  
  getRandomInt(max:number) {
    return Math.floor(Math.random() * max);
  }

  
////// My additions end. /////


  calculateWinner(arr) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        arr[a] &&
        arr[a] === arr[b] &&
        arr[a] === arr[c]
      ) {
        return arr[a];
      }
    }
    return null;
  }
}