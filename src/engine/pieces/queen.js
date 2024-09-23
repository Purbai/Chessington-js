import Piece from './piece';
import Player from '../player';
import Square from '../square';
import GameSettings from '../gameSettings';

export default class Queen extends Piece {
    constructor(player) {
        super(player);
    }

    findMoves(board,checkType,colrow, arr) {
        // console.log("Inside function")
        let x
        let y
        let checkGetPiece
    
        // loop through all horizontal and vertical squares and store position (except current square) to array for either row or col
        for (let i=0;i < GameSettings.BOARD_SIZE ; i++)
        {   
            // define the x/y based on the whether we are checking row or col (input paramenter checktype)
            if (checkType == "row" ) {
                x = colrow // default to the check this row only
                y = i
            } else if (checkType == "col" ) {
                x = i
                y = colrow // default to check this col only
            }
            else if (checkType == "dia"){
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

findDiagMoves(board,location, arr){
    let checkGetPiece;

    // 1. step through each diagonal piece - example
    // queen position = 4,4 
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
        // find horizontal moves available
        this.findMoves(board,"row",location.row,arr)
        // find vertical moves available
        this.findMoves(board,"col", location.col, arr)
        // find diagonal moves available
        this.findDiagMoves(board,location, arr) 

        return arr;
    }
}
