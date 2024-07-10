import Piece from './piece';
import Square from '../square';
import Player from '../player';


export default class Rook extends Piece {
    constructor(player) {
        super(player);
    }


findMoves(board,checkType,colrow, arr) {
    // console.log("Inside function")
    let x
    let y
    let checkGetPiece

    // loop through all horizontal and vertical squares and store position (except current square) to array for either row or col
    for (let i=0;i < 8; i++)
    {   
        // define the x/y based on the whether we are checking row or col (input paramenter checktype)
        if (checkType == "row" ) {
            x = colrow // default to the check this row only
            y = i
        } else if (checkType == "col" ) {
            x = i
            y = colrow // default to check this col only
        }
            // check piece        
            checkGetPiece = board.getPiece(Square.at(x,y)) 
  
            // square is unoccupied
            if( checkGetPiece === undefined ) {
                //console.log('storing ', x,y)
                arr.push({"row": x , "col" : y}) // push to available squares
            } 
            // check if square is occupied by opposing piece
            else if (checkGetPiece !== undefined && checkGetPiece.player !== this.player) {
                // we can take this opposing piece hence available
                arr.push({"row": x , "col" : y})
                break
            } 
            else if (checkGetPiece !== undefined && checkGetPiece.player == this.player && colrow === i) {
                // we are on this piece hence not available
                break
            }
}
}
    getAvailableMoves(board) {
        let location = board.findPiece(this);
        let arr =[];
        this.findMoves(board,"row",location.row,arr)
        this.findMoves(board,"col", location.col, arr)

        return arr;
    
}
}
// find current position
// check if vertical up move is available - loop for consecutive squares
// check if vertical down move is available
// check if horizontal left move is available 
// check if horizontal right move is available 
// push to each possible available move to an array
