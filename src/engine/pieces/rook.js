import Piece from './piece';
import Square from '../square';

export default class Rook extends Piece {
    constructor(player) {
        super(player);
    }

    getAvailableMoves(board) {
        let location = board.findPiece(this);
        let arr =[];
        // loop through all horizontal and vertical squares and store position (except current square) to array
        for (let i=0;i < 8; i++)
        {
            if (location.row !=i ){
                arr.push({"row": i , "col" : location.col})
            }
            if (location.col !=i ){
                arr.push({"row": location.row , "col" : i})
            
        }
    }
        return arr;
    
}
}
// find current position
// check if vertical up move is available - loop for consecutive squares
// check if vertical down move is available
// check if horizontal left move is available 
// check if horizontal right move is available 
// push to each possible available move to an array