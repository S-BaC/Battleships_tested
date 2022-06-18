import { Gameboard } from './Gameboard.js';

describe('Gameboard', () => {
    let newGameboard;
    
    beforeEach(()=>{
        newGameboard = new Gameboard(10);
        newGameboard.addShip([[1,1],[1,2],[1,3]], 'carrier');
    });

    it('places the ship if valid', () => {
        expect(newGameboard.shipPoints).toEqual(3);
        expect(newGameboard.points[1][1].name).toEqual('carrier');
    });

    it('refuses the ship if invalid', () => {
        newGameboard.addShip([[1,2],[1,3],[1,4],[1,5],[1,6]], 'canoe');
        expect(newGameboard.shipPoints).toEqual(3);
        expect(newGameboard.points[1][2].name).toEqual('carrier');
    })

    it('takes a hit if not hit', () => {
        newGameboard.hit([1,1]);
        expect(newGameboard.shipPoints).toEqual(2);
        expect(newGameboard.points[1][1].isHit).toEqual(true);
    })

    it('refuses a hit if already hit', () => {
        newGameboard.hit([1,1]);
        newGameboard.hit([1,1]);
        expect(newGameboard.shipPoints).toEqual(2);
        expect(newGameboard.points[1][1].isHit).toEqual(true);
    })

    it('ends the game', () => {
        newGameboard.hit([1,1]);
        newGameboard.hit([1,2]);
        newGameboard.hit([1,3]);
        expect(newGameboard.game).toEqual(false);
    })
})