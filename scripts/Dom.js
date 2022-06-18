import { Gameboard } from "./Gameboard.js";

// Constructor to take user inputs, drive Gameboard and displays results.
export function Dom (data) {

    this.chosenShip = '';   // Name of the ship currently chosen.
    this.turn = '01';       // Number of the current player (01 or 02).
    this.placeable = true;  // If the ship stays within board boundaries.

    //  Builds gameboards with the board size.
    this.initialize = function () {
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
                    `<div id="${i}-${j}-01" class="boardSq w-8 h-8 md:w-12 md:h-12 lg:w-14 lg:h-14 bg-sky-700 border border-slate-700"></div>`;
                this.board02 += 
                    `<div id="${i}-${j}-02" class="boardSq w-8 h-8 md:w-12 md:h-12 lg:w-14 lg:h-14 bg-sky-700 border border-slate-700"></div>`;
            }
            this.board01 += '</div>';
            this.board02 += '</div>';
        }
        this.board01 += `<button class="text-slate-300 mt-8">Pass to ${$('#p2Name').val()}</button>`;
        this.board02 += '<button class="text-slate-300 mt-8"> START </button>';
        $('#board01').html(this.board01);
        $('#board02').html(this.board02);
        $('#board02')[0].classList.add('hidden');

        //  Shows ships to be placed.
        for(let ship in data.data.shipTypes){
            $('.ships > div').append(
                `<div class="ship mt-8 rounded" id="${ship}">
                    <img src="${data.data.shipTypes[ship].image}" class="w-24 md:w-36">
                    <p class="text-center text-sky-700 m-4">${ship}</p>
                </div>`
            )
        }
    }

    //  Listeners while placing ships.
    this.setupListeners = function () {
        let currTarget = '';    //  The boardSq being hovered.
        let shipPosition = 0;   //  Horizontal (0) or Vertical (1).
        let shipPosArr = ['Horizontal', 'Vertical'];
            
        // Player 2's Turn
        $('#board01 > button').click(()=>{
            this.turn = '02'
            $('#board01')[0].classList.add('hidden');
            $('#board02')[0].classList.remove('hidden');
        })

        // Starts the Game
        $('#board02 > button').click(() => {
            
            // elements shown and hidden as necessary.
            $('#board01')[0].classList.remove('hidden');
            $('.ships')[0].classList.add('hidden');
            $('.gameBoards button')[0].classList.add('hidden');
            $('.gameBoards button')[1].classList.add('hidden');
            [...$('.boardSq')].forEach(sq => {
                sq.classList.remove('bg-slate-300');
                sq.innerHTML = '';
            });

            // Stops event listeners from 'setup' phase, starts those from 'game' phase.
            $('#board01 > button').unbind();
            $('#board02 > button').unbind();
            $('.boardSq').unbind();
            $('#board01 .boardSq').unbind();
            $('#board02 .boardSq').unbind();
            $('#shipPos').unbind();
            $('.ship').unbind();
            
            this.gameListeners();
        })

        //  Horizontal or Vertical
        $('#shipPos').click(() => {
            shipPosition = 1 - shipPosition;
            $('#shipPos').text(shipPosArr[shipPosition]);    
        });

        //  Choosing different ships
        $('.ship').click(e => {
            if(currTarget){
                currTarget.classList.remove('bg-slate-300');
            }
            e.currentTarget.classList.add('bg-slate-300');
            this.chosenShip = e.currentTarget.id;
            currTarget = e.currentTarget;
        })

        //  The first ship chosen initially
        $('.ship')[0].click();

        // Shows highlights for hovered squares.
        $('.boardSq').hover((e) => {
            this.calcShipPts([[...e.target.id][0],[...e.target.id][2]], shipPosition);
        });

        // Places ships.
        $('#board01 .boardSq').click(() => {
            if(this.placeable && !this.gameboard01.addShip(this.shipPts,this.chosenShip)){
                this.addToDom();
        }});
        $('#board02 .boardSq').click(() => {
            if(this.placeable && !this.gameboard02.addShip(this.shipPts,this.chosenShip)){
                this.addToDom();
        }});
    }

    //  If placable + placed on gameboard, ship photos are added to the DOM.
    this.addToDom = function () {
        this.shipPts.forEach(shipPt => {
            $(`#${shipPt[0]}-${shipPt[1]}-${this.turn}`).append(
                `<img src="${data.data.shipPhotos.photo01}" class=""/>`
            )
        })
    }

    //  Based on the starting point, direction and type of the ship, an array of points are calculated.
    this.calcShipPts = function (arr, shipPosition) {

        // Resetting all variables.
        this.shipPts = [];
        this.placeable = true;
        let shipFilled = 0;
        [...$('.boardSq')].forEach(sq => {
            sq.classList.remove('bg-slate-300');
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
                $(`#${shipPt[0]}-${shipPt[1]}-${this.turn}`)[0].classList.add('bg-slate-300');
                shipFilled ++;
            }
        })

        //  As shipFilled is only counted for those within the board boundaries, it is used to determine 'placeability'.
        if (shipFilled < len) {this.placeable = false;}
    }

    //  Listeners once the game is started.
    this.gameListeners = function () {

        // Helper function that manipulates the DOM according to result from gameboards.
        this.result = function (result, obj) {
            switch (result) {
                case 1: obj.innerHTML = 
                        `<img src="${data.data.shipPhotos.photo02}" >`;
                        this.gameOver(); break;
                case 2: obj.innerHTML = 
                        `<img src="${data.data.shipPhotos.photo02}" c>`;
                        this.turn = this.turn === '01'? '02' : '01'; break; 
                case 3: obj.classList.add('bg-slate-300');
                        this.turn = this.turn === '01'? '02' : '01';
            }
        }

        // If the turn is correct, a 'hit' will be sent to gameboard, which returns a response accordingly.
        $('#board01 .boardSq').click((e) => {
            if(this.turn === '02'){
                let hitPt = [[...e.currentTarget.id][0],[...e.currentTarget.id][2]];
                this.result(this.gameboard01.hit(hitPt), e.currentTarget); 
            }
        });
        $('#board02 .boardSq').click((e) => {
            if(this.turn === '01'){
                let hitPt = [[...e.currentTarget.id][0],[...e.currentTarget.id][2]];
                this.result(this.gameboard02.hit(hitPt), e.currentTarget);         
            }
        });
    }

    //  When either player wins, listeners are stopped and winningmsg is show.
    this.gameOver = function () {
        $('#board01 .boardSq').unbind();
        $('#board02 .boardSq').unbind();
        let winner = this.turn === '01'? $('#p1Name').val() : $('#p2Name').val();
        $('.winningmsg p').html(
            `Congratulations to ${winner} !`
        )
        $('.winningmsg').append(
            '<button class="text-slate-300 rounded-lg" onclick="location.reload()"> Play Again </button> '
        )
    }
}
