import Player from '../player';
import Square from '../square';
import Piece from './piece';
import GameSettings from '../gameSettings';

export default class Pawn extends Piece {
    constructor(player) {
        super(player);
    }

    getAvailableMoves(board) {
        let location = board.findPiece(this);
        let checkGetPiece = [];
        let checkGetPiece2 = [];
        let posMoves = []
        let playerSqColourSame ='';
        let playerSqPiece ='';
        if (this.player === Player.WHITE) {
            if (location.row === (GameSettings.BOARD_SIZE -1)) {
                return posMoves;
            }
            console.log('testing - white pieces')

            if (location.row === 0) {
                return []
            }
            if (this.hasPieceMoved)
                 {
                // check diagonally
                checkGetPiece = board.getPiece(Square.at(location.row + 1, location.col + 1)) 

                if (checkGetPiece !== undefined) {
                    posMoves.push(Square.at(location.row + 1, location.col + 1))
                }
                // check if the one square down has a piece on it
                checkGetPiece = board.getPiece(Square.at(location.row + 1, location.col)); // return the piece that is on this square

                if (checkGetPiece === undefined)  //no piece found on the one square down hence available
                {
                    posMoves.push(Square.at(location.row + 1, location.col))
                }
                return posMoves;
            } else {
                 // check if there is a peice diagonally right that can be taken
                 checkGetPiece = board.getPiece(Square.at(location.row + 1, location.col + 1)) 
   
                 if (checkGetPiece !== undefined && checkGetPiece.player !==this.player) {
                     posMoves.push(Square.at(location.row + 1, location.col + 1)) 
                 }
                 checkGetPiece = board.getPiece(Square.at(location.row + 1, location.col - 1))  
                 if (checkGetPiece !== undefined && checkGetPiece.player !==this.player) {
                     posMoves.push(Square.at(location.row + 1, location.col - 1)) 
                 }
                // check if one or two square down have pieces on it
                checkGetPiece = board.getPiece(Square.at(location.row + 1, location.col)); // return the piece that is on this square
                checkGetPiece2 = board.getPiece(Square.at(location.row + 2, location.col)); // return the piece that is on this square
                if (checkGetPiece === undefined && checkGetPiece2 === undefined) // neither squares have pieces on them hence available
                {
                    posMoves.push(Square.at(location.row + 1, location.col));
                    posMoves.push(Square.at(location.row + 2, location.col));
                }
                else if (checkGetPiece === undefined) // one square down does not have a piece that is on it hence available
                    {
                        posMoves.push(Square.at(location.row + 1, location.col))
                    }
                return posMoves;
  
            }

        } else {
            // black piece moves
            console.log('testing - black pieces')
            if (location.row === 0) {
                return []
            }
            if (this.hasPieceMoved)
                 {
                // check diagonally
                checkGetPiece = board.getPiece(Square.at(location.row - 1, location.col - 1)) 

                if (checkGetPiece !== undefined) {
                    posMoves.push(Square.at(location.row - 1, location.col - 1))
                }
                // check if the one square down has a piece on it
                checkGetPiece = board.getPiece(Square.at(location.row - 1, location.col)); // return the piece that is on this square

                if (checkGetPiece === undefined)  //no piece found on the one square down hence available
                {
                    posMoves.push(Square.at(location.row - 1, location.col))
                }
                return posMoves;
            } else {
                 // check if there is a peice diagonally right that can be taken
                 checkGetPiece = board.getPiece(Square.at(location.row - 1, location.col - 1)) 
   
                 if (checkGetPiece !== undefined && checkGetPiece.player !==this.player) {
                     posMoves.push(Square.at(location.row - 1, location.col - 1)) 
                 }
                 checkGetPiece = board.getPiece(Square.at(location.row - 1, location.col + 1))
                 if (checkGetPiece !== undefined && checkGetPiece.player !==this.player) {
                     posMoves.push(Square.at(location.row - 1, location.col + 1)) 
                 }
                // check if one or two square down have pieces on it
                checkGetPiece = board.getPiece(Square.at(location.row - 1, location.col)); // return the piece that is on this square
                checkGetPiece2 = board.getPiece(Square.at(location.row - 2, location.col)); // return the piece that is on this square
                if (checkGetPiece === undefined && checkGetPiece2 === undefined) // neither squares have pieces on them hence available
                {
                    posMoves.push(Square.at(location.row - 1, location.col));
                    posMoves.push(Square.at(location.row - 2, location.col));
                }
                else if (checkGetPiece === undefined) // one square down does not have a piece that is on it hence available
                    {
                        posMoves.push(Square.at(location.row - 1, location.col))
                    }
                return posMoves;
  
            }
        }
    }
}
