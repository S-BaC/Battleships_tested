export function Gameboard(size) {

    this.points = [];
    this.shipPoints = 0;
    this.game = true;

    this.buildBoard = function () {
        for (let i = 0; i < size; i++) {
            this.points.push([]);
            for (let j = 0; j < size; j++) {
                this.points[i].push(
                    {
                        name: '',
                        isHit: false,
                    }
                )
            }
        }
    };

    this.buildBoard();

    this.addShip = function (ptsArr, shipName) {
        let shipExi = false;
        ptsArr.forEach(pt => {
            if (this.points[pt[0]][pt[1]].name) {
                shipExi = true;
                return;
            }
        });
        if(!shipExi){
            ptsArr.forEach(pt => {
                this.points[pt[0]][pt[1]].name = shipName;
                this.shipPoints ++;
                // Shows some animation

            })    
        }else{
            // Shows some animation
        }
    }

    this.hit = function (point) {
        if(!this.points[(point[0])][point[1]].isHit){
            this.points[point[0]][point[1]].isHit = true;
            // Some DOM animation.
            this.shipPoints --;
            if(!this.shipPoints){
                // Game ends.
                this.game = false;
            }
        }
    }
}

let gb = new Gameboard(10);
gb.addShip([[1,1],[1,2],[1,3]], 'carrier');
gb.hit([1,1]);