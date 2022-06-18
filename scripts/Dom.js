import { Gameboard } from "./Gameboard.js";

export function Dom (data) {

    this.chosenShip = '';
    this.turn = '01';
    this.placeable = true;

    this.boardSize = $('#boardSize').val();
    this.gameboard01 = new Gameboard(this.boardSize);
    this.gameboard02 = new Gameboard(this.boardSize);

    this.board01 = `<p id="p01Name" class="py-4 text-slate-300">${$('#p1Name').val()}</p>`; 
    this.board02 = `<p id="p02Name" class="py-4 text-slate-300">${$('#p2Name').val()}</p>`;

    for(let i = 0; i<this.boardSize; i++){
        this.board01 += '<div class="flex">'
        this.board02 += '<div class="flex">'
        for(let j = 0; j<this.boardSize; j++){
            this.board01 += 
                `<div id="${i}-${j}-01" class="boardSq"></div>`;
            this.board02 += 
                `<div id="${i}-${j}-02" class="boardSq"></div>`;
        }
        this.board01 += '</div>';
        this.board02 += '</div>';
    }
    this.board01 += `<button class="text-slate-300">Pass to ${$('#p2Name').val()}</button>`;
    this.board02 += '<button class="text-slate-300"> START </button>';
    $('#board01').html(this.board01);
    $('#board02').html(this.board02);

    for(let ship in data.data.shipTypes){
        // Ship Choosing Panel
        $('.ships > div').append(
            `<div class="ship mt-8" id="${ship}">
                <img src="${data.data.shipTypes[ship].image}" alt="" class="w-24">
                <p class="text-center text-slate-300 m-4">${ship}</p>
            </div>`
        )
    }

    // this.shipPts = [];

    this.setupListeners = function () {
        let currTarget = '';
        let shipPosition = 0;
        let shipPosArr = ['Horizontal', 'Vertical'];

        $('#board01 > button').click(()=>{
            // Johnny's Turn
            this.turn = '02'
            $('#board01')[0].classList.add('hidden');
            $('#board02')[0].classList.remove('hidden');
        })

        $('#board02 > button').click(() => {
            // Starts the Game
            $('#board01')[0].classList.remove('hidden');
            $('.ships')[0].classList.add('hidden');
            $('.gameBoards button')[0].classList.add('hidden');
            $('.gameBoards button')[1].classList.add('hidden');

            $('#board01 > button').unbind();
            $('#board02 > button').unbind();
            $('.boardSq').unbind();
            $('#board01 .boardSq').unbind();
            $('#board02 .boardSq').unbind();
            $('#shipPos').unbind();
            $('.ship').unbind();
        })

        $('.boardSq').hover((e) => {
            this.calcShipPts([[...e.target.id][0],[...e.target.id][2]], shipPosition);
        });

        $('#board01 .boardSq').click(() => {
            if(this.placeable && !this.gameboard01.addShip(this.shipPts,this.chosenShip)){
                this.shipPts.forEach(shipPt => {
                    $(`#${shipPt[0]}-${shipPt[1]}-${this.turn}`)[0].classList.add('bg-slate-500');
                })
        }});

        $('#board02 .boardSq').click(() => {
            if(this.placeable && !this.gameboard02.addShip(this.shipPts,this.chosenShip)){
                this.shipPts.forEach(shipPt => {
                    $(`#${shipPt[0]}-${shipPt[1]}-${this.turn}`)[0].classList.add('bg-slate-500');
                })
        }});

        $('#shipPos').click(() => {
            shipPosition = 1 - shipPosition;
            $('#shipPos').text(shipPosArr[shipPosition]);    
        });

        $('.ship').click(e => {
            if(currTarget){
                currTarget.classList.remove('bg-sky-300');
            }
            e.currentTarget.classList.add('bg-sky-300');
            this.chosenShip = e.currentTarget.id;
            currTarget = e.currentTarget;
        })

        $('.ship')[0].click();

    }

    
    this.calcShipPts = function (arr, shipPosition) {

        this.shipPts = [];
        this.placeable = true;
        let shipFilled = 0;
        
        [...$('.boardSq')].forEach(sq => {
            sq.classList.remove('bg-sky-300');
        });

        let len = data.data.shipTypes[this.chosenShip].length;
        for(let i = 0; i<len; i++){
            if(shipPosition){
                this.shipPts.push([Number(arr[0])+i,arr[1]]);
            } else {
                this.shipPts.push([arr[0],Number(arr[1])+i]);
            }
        }
        this.shipPts.forEach(shipPt => {
            if(shipPt[0] < this.boardSize && shipPt[1] < this.boardSize) {
                $(`#${shipPt[0]}-${shipPt[1]}-${this.turn}`)[0].classList.add('bg-sky-300');
                shipFilled ++;
            }
        })
        console.log(shipFilled, len);
        if (shipFilled < len) {this.placeable = false;}
    }

    
    this.gameListeners = function () {

        $('#board01').click(e => {
            if(!this.p1Turn && this.game){
                //  Hits the board
                let hitPt = [[...e.target.id][0],[...e.target.id][2]];
                gameboard01.hit(hitPt);
            } else if (this.p1Turn && !this.game){
                // Places the ship
                calcShipPts([[...e.target.id][0],[...e.target.id][2]]);
                this.gameboard01.addShip(this.shipPts);
            }
        })
    }

    this.setupListeners();
}