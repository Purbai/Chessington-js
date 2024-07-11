import Piece from './piece';
import Square from '../square';
import King from './king';
import GameSettings from '../gameSettings';

export default class Bishop extends Piece {
    constructor(player) {
        super(player);
    }

    findDiaMoves(board,location, arr){
        let checkGetPiece;
        let row;
        let col;
        let isKing;
    
        // 1. step through each diagonal piece - example
        // bishop position = 4,4 
        // diagonals moves : (3,5) & (2,6)  & (1,7)
        // diagonals moves : (3,3) & (2,2)  & (1,1) & (0,0)
        // diagonals moves : (5,3) & (6,2)  & (7,1) 
        // diagonals moves : (5,5) & (6,6)  & (7,7) 
    
        // diagonal up
        let noOfLoops = GameSettings.BOARD_SIZE -location.row; 
        for (let i=1 ; i < noOfLoops; i++)
        { 
            row = location.row+i;
            col = location.col+i
            if (col === GameSettings.BOARD_SIZE)
                {
                    break
                }

             // check if square is unoccupied 
            checkGetPiece = board.getPiece(Square.at(row,col))
            isKing = board.getPiece(Square.at(row,col)) instanceof King
            if (checkGetPiece === undefined)
                {
                    // square is occupied hence exit loop
                    arr.push(Square.at(row, col))
                }
            // check if square is occupied by opposing piece which is a King
            else if (checkGetPiece !== undefined && checkGetPiece.player !== this.player && isKing) {
            // we cannot take this opposing piece which is a king hence not available
                    break
            } 
            // check if square is occupied by opposing piece
            else if (checkGetPiece !== undefined && checkGetPiece.player !== this.player) {
                // we can take this opposing piece hence available
                arr.push(Square.at(row, col))
                break
                } 
            else if (checkGetPiece !== undefined && checkGetPiece.player == this.player) {
                // we are on this piece hence not available
                break
             }
                
        }
    
    
        noOfLoops = location.row; 
            for (let i= 1 ; i <= noOfLoops ; i++)
            { 
                row = location.row-i;
                col = location.col+i
                if (col === GameSettings.BOARD_SIZE)
                    {
                        break
                    }
                checkGetPiece = board.getPiece(Square.at(location.row-i,location.col+i))
                isKing = board.getPiece(Square.at(location.row-i,location.col+i)) instanceof King
             // check if square is unoccupied 
             checkGetPiece = board.getPiece(Square.at(row,col))
             isKing = board.getPiece(Square.at(row,col)) instanceof King
             if (checkGetPiece === undefined)
                 {
                     // square is occupied hence exit loop
                     arr.push(Square.at(row, col))
                 }
             // check if square is occupied by opposing piece which is a King
             else if (checkGetPiece !== undefined && checkGetPiece.player !== this.player && isKing) {
             // we cannot take this opposing piece which is a king hence not available
                     break
             } 
             // check if square is occupied by opposing piece
             else if (checkGetPiece !== undefined && checkGetPiece.player !== this.player) {
                 // we can take this opposing piece hence available
                 arr.push(Square.at(row, col))
                 break
                 } 
             else if (checkGetPiece !== undefined && checkGetPiece.player == this.player) {
                 // we are on this piece hence not available
                 break
              }     
            }
    
            noOfLoops = GameSettings.BOARD_SIZE - location.col ; 
            // console.log('no of loops for right down', noOfLoops)        
            for (let i=1 ; i <= noOfLoops; i++)
                { 
                    row = location.row-i;
                    col = location.col-i
                    //console.log('checking to ensure diagonal right up squares coordinates first', location.row, location.col,location.row -i, location.col-i)
    
                    if (row < 0)
                        {
                            //console.log('exited the loop',location.row, location.col,location.row -i, location.col-i)
                        break
                        }
             // check if square is unoccupied 
             checkGetPiece = board.getPiece(Square.at(row,col))
             isKing = board.getPiece(Square.at(row,col)) instanceof King
             if (checkGetPiece === undefined)
                 {
                     // square is occupied hence exit loop
                     arr.push(Square.at(row, col))
                 }
             // check if square is occupied by opposing piece which is a King
             else if (checkGetPiece !== undefined && checkGetPiece.player !== this.player && isKing) {
             // we cannot take this opposing piece which is a king hence not available
                     break
             } 
             // check if square is occupied by opposing piece
             else if (checkGetPiece !== undefined && checkGetPiece.player !== this.player) {
                 // we can take this opposing piece hence available
                 arr.push(Square.at(row, col))
                 break
                 } 
             else if (checkGetPiece !== undefined && checkGetPiece.player == this.player) {
                 // we are on this piece hence not available
                 break
              }
            }
    
        noOfLoops = location.col ; 
        //console.log('no of loops for left down', noOfLoops)
        for (let i= 1 ; i < noOfLoops +1 ; i++)
            { 
                row = location.row+i;
                col = location.col-i
                if (row === GameSettings.BOARD_SIZE)
                    {
                        break
                    }
        
             // check if square is unoccupied 
             checkGetPiece = board.getPiece(Square.at(row,col))
             isKing = board.getPiece(Square.at(row,col)) instanceof King
             if (checkGetPiece === undefined)
                 {
                     // square is occupied hence exit loop
                     arr.push(Square.at(row, col))
                 }
             // check if square is occupied by opposing piece which is a King
             else if (checkGetPiece !== undefined && checkGetPiece.player !== this.player && isKing) {
             // we cannot take this opposing piece which is a king hence not available
                     break
             } 
             // check if square is occupied by opposing piece
             else if (checkGetPiece !== undefined && checkGetPiece.player !== this.player) {
                 // we can take this opposing piece hence available
                 arr.push(Square.at(row, col))
                 break
                 } 
             else if (checkGetPiece !== undefined && checkGetPiece.player == this.player) {
                 // we are on this piece hence not available
                 break
              }            
            }
    
    }
    
    getAvailableMoves(board) {
        let location = board.findPiece(this);
        let arr =[];
        // find diagonal moves available
        this.findDiaMoves(board,location, arr) 

        return arr;
    }
}
