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
  wait: boolean;
  draw: boolean;
  
  ngOnInit() {
    this.newGame();
  }

  newGame() {
    this.squares = Array(9).fill(null);
    this.winner = null;
    this.xIsNext = true;
    this.wait = false;
    this.draw = false
    
  }

  get player() {
    return this.xIsNext ? 'X' : 'O';
  }

  makeMove(idx: number) {
    if (!this.winner && !this.wait){
    if (!this.squares[idx]) {
      this.squares.splice(idx, 1, this.player);
      this.xIsNext = !this.xIsNext;
    }
    this.winner = this.calculateWinner(this.squares);

    if (!this.winner && !this.xIsNext){
      this.wait = true
      setTimeout(()=> this.opponentMove(), 400)
    }
    }
    
  }

////// My main additions start. /////

  opponentMove(){
    this.wait = false
    let possibleMoves = this.findPossibleMoves(this.squares)
    let winningMove = this.checkWinningMove(possibleMoves, "O");
    let blockingMove = this.checkWinningMove(possibleMoves, "X");
    if(winningMove !== null){
      this.squares.splice(winningMove, 1, 'O');
      this.winner = this.calculateWinner(this.squares);
      this.xIsNext = !this.xIsNext;
      this.findPossibleMoves(this.squares)
    } else if (blockingMove !== null){
      this.squares.splice(blockingMove, 1, 'O');
      this.xIsNext = !this.xIsNext;
      this.findPossibleMoves(this.squares)
    } else if (possibleMoves.length){
      this.makeRandomMove(possibleMoves);
      this.xIsNext = !this.xIsNext; 
      this.findPossibleMoves(this.squares)
    } else {
      this.draw = true; 
      }
  }

  findPossibleMoves(arr){
    let current_state = [];
    let possibleMoveIndices = [];
    for (let i = 0; i < arr.length; i++) {
      current_state.push(arr[i]);
      if (arr[i] == null){
        possibleMoveIndices.push(i);
      }
    }
    return possibleMoveIndices;
  }

  checkWinningMove(arr, player: String){
    for (let i = 0; i < arr.length; i++) {
        let temp_arr = [...this.squares];
        temp_arr[arr[i]] = player;
        if (this.calculateWinner(temp_arr)){
          return arr[i];
        }
    }
    return null
  }


  makeRandomMove(arr){
    let numberOfPossibleMoves = arr.length;
    let randomIndex = this.getRandomInt(numberOfPossibleMoves);
    this.squares.splice(arr[randomIndex], 1, 'O');
  }
  
  getRandomInt(max:number) {
    return Math.floor(Math.random() * max);
  }

  
////// My main additions end. /////


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