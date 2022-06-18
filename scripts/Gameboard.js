//  The Gameboard constructor takes "size" of the board as argument.
//  It builds the board, and is responsible for addingShips and takingHits.

export function Gameboard(size) {

    this.points = [];
    this.shipPoints = 0;
    this.game = true;

    this.buildBoard = function () {
        for (let i = 0; i < size; i++) {
            this.points.push([]);
            for (let j = 0; j < size; j++) {
                this.points[i].push({name: '',isHit: false,});
            }
        }
    };

    this.buildBoard();

    this.addShip = function (ptsArr, shipName) {
        //  If there's not already a ship, it adds one.

        let shipExi = false;
        ptsArr.forEach(pt => {
            if (this.points[Number(pt[0])][Number(pt[1])].name) {
                shipExi = true;
                return shipExi;
            }
        });
        if(!shipExi){
            ptsArr.forEach(pt => {
                this.points[pt[0]][pt[1]].name = shipName;
                this.shipPoints ++;
            })    
        }
        return shipExi;
    }

    this.hit = function (point) {
        //  Takes the 'hit' sent from DOM and responds accordingly.
        if(!this.points[Number(point[0])][Number(point[1])].isHit){
            this.points[Number(point[0])][Number(point[1])].isHit = true;
            if(this.points[Number(point[0])][Number(point[1])].name){
                if(!--this.shipPoints){
                    return 1;   // Game ended.
                }
                return 2;   // Hit a ship.
            }
            return 3; // Hit an empty spot.
        }
        return 0;   // Hit nothing.
    }
}
