import Piece from './piece';
import Square from '../square';
import Player from '../player';


export default class Rook extends Piece {
    constructor(player) {
        super(player);
    }

    getAvailableMoves(board) {
        let location = board.findPiece(this);
        let arr =[];
        let checkGetPiece
        // loop through all horizontal and vertical squares and store position (except current square) to array
        for (let i=0;i < 8; i++)
        {   
            if (location.row !=i ){
                // check piece
                checkGetPiece = board.getPiece(Square.at(i, location.col)) 
                // square is unoccupied
                if( checkGetPiece === undefined ) {
                    arr.push({"row": i , "col" : location.col}) // push to available squares
                } 
                // check if square is occupied by opposing piece
                else if (checkGetPiece !== undefined && checkGetPiece.player !== this.player) {
                    arr.push({"row": i , "col" : location.col})
                    break
                } 
                // if path is blocked, break out of loop
                else {
                    break
                }
            }

            if (location.col !=i ){
                // check piece
                checkGetPiece = board.getPiece(Square.at(location.row, i)) 
                // check if square is unoccupied
                if( checkGetPiece === undefined ) {
                    arr.push({"row": location.row , "col" : i})
                } 
                // check if square is unoccupied by opposing piece
                else if (checkGetPiece !== undefined && checkGetPiece.player !== this.player) {
                    arr.push({"row": location.row , "col" : i})
                    break
                } 
                // if path is blocked, break out of loop
                else {
                    break
                }
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