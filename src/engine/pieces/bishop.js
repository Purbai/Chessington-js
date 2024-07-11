import Piece from './piece';
import Square from '../square';
import GameSettings from '../gameSettings';

export default class Bishop extends Piece {
    constructor(player) {
        super(player);
    }

    findDiaMoves(board,location, arr){
        let checkGetPiece;
    
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
            if (location.col+i === GameSettings.BOARD_SIZE)
                {
                    break
                }
    
             // check if square is unoccupied 
            checkGetPiece = board.getPiece(Square.at(location.row+i,location.col+i))
            if (checkGetPiece !== undefined)
                {
                    // square is occupied hence exit loop
                    break
                }
            else
            {
                //console.log('checking to ensure diagonal right down squares coordinates first', location.row, location.col,location.row +i, location.col+i)
                // square is not occupied hence available move
                arr.push(Square.at(location.row + i, location.col + i))
    
            }
                
        }
    
    
        noOfLoops = location.row; 
            for (let i= 1 ; i <= noOfLoops ; i++)
            { 
                if (location.col +i === GameSettings.BOARD_SIZE)
                    {
                        break
                    }
                checkGetPiece = board.getPiece(Square.at(location.row-i,location.col+i))
                if (checkGetPiece !== undefined)
                    {
                        // square is occupied hence exit loop
                        break
                    }
                else
                    {
                        //console.log('checking to ensure diagonal **left up squares coordinates first', location.row, location.col,location.row -i, location.col+i)
                        // square is not occupied hence available move
                        arr.push(Square.at(location.row - i, location.col + i))            
                    }        
            }
    
            noOfLoops = GameSettings.BOARD_SIZE - location.col ; 
            // console.log('no of loops for right down', noOfLoops)        
            for (let i=1 ; i <= noOfLoops; i++)
                { 
                    //console.log('checking to ensure diagonal right up squares coordinates first', location.row, location.col,location.row -i, location.col-i)
    
                    if (location.row-i < 0)
                        {
                            //console.log('exited the loop',location.row, location.col,location.row -i, location.col-i)
                        break
                        }
                    checkGetPiece = board.getPiece(Square.at(location.row-i,location.col-i))
                    if (checkGetPiece !== undefined)
                        {
                            // square is occupied hence exit loop
                            break
                        }
                    else
                        {
                            //console.log('checking to ensure diagonal right up squares coordinates first', location.row, location.col,location.row -i, location.col-i)
                            // square is not occupied hence available move
                            arr.push(Square.at(location.row - i, location.col - i))            
                        }
                }
    
        noOfLoops = location.col ; 
        //console.log('no of loops for left down', noOfLoops)
        for (let i= 1 ; i < noOfLoops +1 ; i++)
            { 
                if (location.row+i === GameSettings.BOARD_SIZE)
                    {
                        break
                    }
        
                 checkGetPiece = board.getPiece(Square.at(location.row+i,location.col-i))
                if (checkGetPiece !== undefined)
                    {
                        // square is occupied hence exit loop
                        break
                    }
                else
                    {
                        //console.log('checking to ensure diagonal **left down squares coordinates first', location.row, location.col,location.row +i, location.col-i)
                        // square is not occupied hence available move
                        arr.push(Square.at(location.row + i, location.col - i))            
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
