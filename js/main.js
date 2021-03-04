//Assign constants to fields in html
const gameGrid = document.querySelectorAll('.box')   // grid
const status = document.querySelector('.game-status')  //h2 output for status of game
const restart = document.querySelector('.game-restart')  //restart button

class TicTacBoard {
  constructor() {
    this.currentPlayer = "X"          //first game starts with X
    this.gamePause = false            //pauses game after win or tie
    this.winScenario = [[0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]]
  }
  newGame() {
    status.innerHTML = `${this.currentPlayer} Goes First`
    this.grid = ['','','','','','','','','']
    this.gamePause = false
  }
  gridFill() {
    console.log(this.grid)
    gameGrid.forEach((box,i) => {box.innerHTML = this.grid[i]});
  }
  switchPlayer() {
    this.currentPlayer = this.currentPlayer === "X" ? "O" : "X"
    status.innerHTML = `${this.currentPlayer}'s turn`
  }
  playGame(index) {
    if(this.grid[index]==''){
      this.grid[index]=this.currentPlayer
      return true
    } else {
      return false
    }
  }
  checkWin(){
    let isWin = 0
    let retWin = false
    this.winScenario.forEach(scenario => {
      scenario.forEach(index => {
        if(this.grid[index]==this.currentPlayer){
          isWin ++
        }
      });
      if(isWin == 3){
        retWin = true
      } else {
        isWin = 0
      }
    });
    return retWin
  }
  gameWin(){
    status.innerHTML = `${this.currentPlayer} wins the game! Play again?`
    this.gamePause = true
  }
  checkTie(){
      if(!this.grid.includes('')&&!this.gamePause){
        status.innerHTML = `Tie game! Play again?`
        this.gamePause = true
      }
  }
}

var ticTac = new TicTacBoard
ticTac.newGame()
gameGrid.forEach((box,i) => {
  box.addEventListener('click',playGame)
  function playGame (){
    if(ticTac.playGame(i)&&!ticTac.gamePause){
      ticTac.gridFill()
      if(ticTac.checkWin()){
        ticTac.gameWin()
      } else{
        ticTac.switchPlayer()
      }
      ticTac.checkTie()
    }
  }
});

restart.addEventListener('click',restarts)
function restarts() {
  ticTac.switchPlayer()
  ticTac.newGame()
  ticTac.gridFill()
}
