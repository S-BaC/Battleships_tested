import { Gameboard } from "./Gameboard";

export function Dom (data) {

    this.shipPosition = 0;
    // this.posArr = ['Horizontal', 'Vertical'];

    this.boardSize = $('#boardSize').val();
    this.gameboard01 = new Gameboard(this.boardSize);

    this.board01 = ''; this.board02 = '';

    for(let i = 0; i<this.boardSize; i++){
        this.board01 += '<div class="flex">'
        this.board02 += '<div class="flex">'
        for(let j = 0; j<this.boardSize; j++){
            this.board01 += 
                `<div id="${i}-${j}-01" class="boardSq"></div>`;
            this.board02 += 
                `<div id="${i}-${j}-02" class="boardSq"></div>`;
        }
        this.board01 += '</div>'
        this.board02 += '</div>'
    }

    $('#board01').html(this.board01);
    $('#board02').html(this.board02);

    this.shipPts = [];
    
    this.calcShipPts = function (arr) {
        let len = data.shipTypes[$('#shipTypeChosen')].length;
        for(let i = 0; i<len; i++){
            if(this.shipPosition){
                this.shipPts.push(arr[0],arr[1]+i);
            } else {
                this.shipPts.push(arr[0]+i,arr[1]);
            }
        }
    }

    this.listeners = function () {

        // $('#shipPosition').click(()=>{
        //     this.shipPosition = 1-this.shipPosition;
        //     $('#shipPosition').text(this.posArr[this.shipPosition]);
        // })

        $('body').contextmenu(() => this.shipPosition = 1 - this.shipPosition);

        $('#board01').click(e => {
            if(!this.p1Turn && this.game){
                //  Hits the board
                let hitPt = [[...e.target.id][0],[...e.target.id][2]];
                gameboard01.hit(hitPt);
            } else if (this.p1Turn && !this.game){
                // Places the ship
                calcShipPts([[...e.target.id][0],[...e.target.id][2]]);
                gameboard01.addShip(this.shipPts);
            }
        })
    }

    this.listeners();
}