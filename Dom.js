import { Gameboard } from "./Gameboard";

export function Dom (data) {

    this.shipPosition = 0;
    this.posArr = ['Horizontal', 'Vertical'];

    this.boardSize = $('#boardSize').val();
    this.gameBoard = new Gameboard(this.boardSize);

    for(let i = 0; i<this.boardSize; i++){
        for(let j = 0; j<this.boardSize; j++){
            $('#board01').html(
                `<div id="${i}-${j}" class="boardSq"></div>`
            );
        }
    }

    this.shipPts = [];
    
    this.calcShipPts = function (arr) {
        let len = data.shipTypes[$('#shipTypeChosen')];
        for(let i = 0; i<len; i++){
            if(this.shipPosition){
                this.shipPts.push(arr[0],arr[1]+i);
            } else {
                this.shipPts.push(arr[0]+i,arr[1]);
            }
        }
    }

    this.listeners = function () {

        $('#shipPosition').click(()=>{
            this.shipPosition = 1-this.shipPosition;
            $('#shipPosition').text(this.posArr[this.shipPosition]);
        })

        $('#board01').click(e => {
            if(!this.p1Turn && this.game){
                //  Hits the board
                let hitPt = [[...e.target.id][0],[...e.target.id][2]];
                gameBoard.hit(hitPt);
            } else if (this.p1Turn && !this.game){
                // Places the ship
                calcShipPts([[...e.target.id][0],[...e.target.id][2]]);
                gameBoard.addShip(this.shipPts);
            }
        })
    }

    this.listeners();
}