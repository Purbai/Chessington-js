import Piece from './piece';
import Square from '../square';
import King from './king';
import GameSettings from '../gameSettings';

export default class Rook extends Piece {
    constructor(player) {
        super(player);
    }

    findMovesReverse(board,checkType,colrow,colrowStart, arr) {

        let x
        let y

    
        // loop through all horizontal and vertical squares and store position (except current square) to array for either row or col
        for (let i=colrowStart-1;i >-1; i--)
        {   
            // define the x/y based on the whether we are checking row or col (input paramenter checktype)
            if (checkType == "row" ) {
                x = colrow // default to the check this row only
                y = i
            } else if (checkType == "col" ) {
                x = i
                y = colrow // default to check this col only
            }
            // check if square is available to move
            if (this.checkMoveWithKing(x,y,arr, board)) {break}

        }
    }

findMoves(board,checkType,colrow,colrowStart, arr) {
    // console.log("Inside function")
    let x;
    let y;

    // loop through all horizontal and vertical squares and store position (except current square) to array for either row or col
    for (let i=colrowStart+1;i < GameSettings.BOARD_SIZE; i++)
    {   
        // define the x/y based on the whether we are checking row or col (input paramenter checktype)
        if (checkType == "row" ) {
            x = colrow // default to the check this row only
            y = i
        } else if (checkType == "col" ) {
            x = i
            y = colrow // default to check this col only
        }
        // check if square is available to move
        if (this.checkMoveWithKing(x,y,arr, board)) {break}
    }
}

checkMoveWithKing(row, col, arr, board){
    let breakOut = false;
    let checkGetPiece;
    let isKing;
    // check piece        
    checkGetPiece = board.getPiece(Square.at(row,col)) ;
    isKing = board.getPiece(Square.at(row, col)) instanceof King
      
    // square is unoccupied
    if( checkGetPiece === undefined ) {
        //console.log('storing ', x,y)
        arr.push({"row": row , "col" : col}) // push to available squares
    } 
    // check if square is occupied by opposing piece which is a King
    else if (checkGetPiece !== undefined && checkGetPiece.player !== this.player && isKing) {
        // we cannot take this opposing piece which is a king hence not available
            breakOut = true;
    } 
    // check if square is occupied by opposing piece
    else if (checkGetPiece !== undefined && checkGetPiece.player !== this.player) {
    // we can take this opposing piece hence available
        arr.push({"row": row , "col" : col});
        breakOut = true
    } 
    else if (checkGetPiece !== undefined && checkGetPiece.player == this.player) {
        // we are on this piece hence not available
        breakOut = true
    }
    return breakOut
}

    getAvailableMoves(board) {
        let location = board.findPiece(this);
        let arr =[];
        // console.log('checking row right')
        this.findMoves(board,"row",location.row,location.col,arr)
        // console.log(arr)
        // console.log('checking col top')
        this.findMoves(board,"col", location.col,location.row,arr)
        // console.log(arr)
        // console.log('checking row left')
        this.findMovesReverse(board,"row",location.row,location.col,arr)
        // console.log(arr)
        // console.log('checking col down')
        this.findMovesReverse(board,"col", location.col,location.row, arr)
        // console.log(arr)
        return arr;
    
}
}

