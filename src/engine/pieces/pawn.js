import Player from '../player';
import Square from '../square';
import Piece from './piece';

export default class Pawn extends Piece {
    constructor(player) {
        super(player);
    }

    getAvailableMoves(board) {
        let location = board.findPiece(this);
        let checkGetPiece = [];
        let checkGetPiece2 = [];
        if (this.player === Player.WHITE) {
            if (location.row === 7) {
                return []
            }
            if (this.hasPieceMoved) {
                // check if the one square up has a piece on it
                checkGetPiece = board.getPiece(Square.at(location.row + 1, location.col)); // return the piece that is on this square
                if (checkGetPiece === undefined)  //no piece found on the one square up hence available
                {
                    return [Square.at(location.row + 1, location.col)]
                }
                else
                {
                    return [] //square was occupied hence pass empty 
                }
            } else {
                // check if one or two square up have pieces on it
                checkGetPiece = board.getPiece(Square.at(location.row + 1, location.col)); // return the piece that is on this square
                checkGetPiece2 = board.getPiece(Square.at(location.row + 2, location.col)); // return the piece that is on this square
                if (checkGetPiece === undefined && checkGetPiece2 === undefined) // neither squares have pieces on them hence available
                {
                    return [Square.at(location.row + 1, location.col), Square.at(location.row + 2, location.col)]
                }
                else if (checkGetPiece === undefined) // one square up does not have a piece that is on it hence available
                    {
                        return [Square.at(location.row + 1, location.col)]
                    }
                else
                {
                    return [] //squares were occupied hence pass empty 
                }
            }

        } else {
            // black piece moves
            if (location.row === 0) {
                return []
            }
            if (this.hasPieceMoved) {
                // check if the one square down has a piece on it
                checkGetPiece = board.getPiece(Square.at(location.row - 1, location.col)); // return the piece that is on this square
                if (checkGetPiece === undefined)  //no piece found on the one square down hence available
                {
                    return [Square.at(location.row - 1, location.col)]
                }
                else
                {
                    return [] //square was occupied hence pass empty 
                }
            } else {

                // check if one or two square down have pieces on it
                checkGetPiece = board.getPiece(Square.at(location.row - 1, location.col)); // return the piece that is on this square
                checkGetPiece2 = board.getPiece(Square.at(location.row - 2, location.col)); // return the piece that is on this square
                if (checkGetPiece === undefined && checkGetPiece2 === undefined) // neither squares have pieces on them hence available
                {
                    return [Square.at(location.row - 1, location.col), Square.at(location.row - 2, location.col)]
                }
                else if (checkGetPiece === undefined) // one square down does not have a piece that is on it hence available
                        {
                            return [Square.at(location.row - 1, location.col)]
                        }
                else
                {
                    return [] //squares were occupied hence pass empty 
                }
  
            }
        }
    }
}
