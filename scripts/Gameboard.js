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
    console.log(this.points);

    this.addShip = function (ptsArr, shipName) {
        let shipExi = false;
        ptsArr.forEach(pt => {
            console.log(this.points[Number(pt[0])][Number(pt[1])])
            if (this.points[Number(pt[0])][Number(pt[1])].name) {
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
        return shipExi;
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