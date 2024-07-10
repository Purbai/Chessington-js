import 'chai/register-should';
import Queen from '../../../src/engine/pieces/queen';
import Board from '../../../src/engine/board';
import Player from '../../../src/engine/player';
import Square from '../../../src/engine/square';
import Rook from '../../../src/engine/pieces/rook';
import Pawn from '../../../src/engine/pieces/pawn';

/*  The queen can only move in straight lines (horizontally, vertically, and diagonally), but not combine those movement patterns. 
 For example, moving 5 squares horizontally and 3 squares diagonally is not allowed in a single move.

 The queen is not allowed to jump over other pieces, neither friendly or enemy (unlike the knight) */
describe('Queen', () => {
    let board;
    beforeEach(() => board = new Board());

    it('can move in straight line', () => {
        const queen = new Queen(Player.WHITE);
        board.setPiece(Square.at(1, 2), queen);

        const moves = queen.getAvailableMoves(board);

        const expectedMoves = [
            // Horizontal
            Square.at(1, 0), Square.at(1, 1), Square.at(1, 3), Square.at(1, 4), Square.at(1, 5), Square.at(1, 6), Square.at(1, 7),
            // Vertical
            Square.at(0, 2), Square.at(2, 2), Square.at(3, 2), Square.at(4, 2), Square.at(5, 2), Square.at(6, 2), Square.at(7, 2),
            // diagonal right
            Square.at(0,3), Square.at(2, 3), Square.at(3,4), Square.at(4,5), Square.at(5,6), Square.at(6, 7),
            // diagonal left
            Square.at(0,1), Square.at(2, 1), Square.at(3,0)
        ];

        moves.should.deep.include.members(expectedMoves);
    });

    it('cannot make any other moves', () => {
        const queen = new Queen(Player.WHITE);
        board.setPiece(Square.at(1, 2), queen);

        const moves = queen.getAvailableMoves(board);

        moves.should.have.length(23);
    });

    it('cannot move through friendly pieces', () => {
        const queen = new Queen(Player.WHITE);
        const friendlyPiece = new Pawn(Player.WHITE);
        board.setPiece(Square.at(4, 4), queen);
        board.setPiece(Square.at(4, 6), friendlyPiece);

        const moves = queen.getAvailableMoves(board);

        moves.should.not.deep.include(Square.at(4, 7));
    });

    it('cannot move through opposing pieces', () => {
        const queen = new Queen(Player.WHITE);
        const opposingPiece = new Pawn(Player.BLACK);
        board.setPiece(Square.at(4, 4), queen);
        board.setPiece(Square.at(4, 6), opposingPiece);

        const moves = queen.getAvailableMoves(board);

        moves.should.not.deep.include(Square.at(4, 7));
    });

    it('cannot take a friendly piece', () => {
        const queen = new Queen(Player.BLACK);
        const friendlyPiece = new Rook(Player.BLACK);
        board.setPiece(Square.at(4, 4), queen);
        board.setPiece(Square.at(3, 3), friendlyPiece);

        const moves = queen.getAvailableMoves(board);

        moves.should.not.deep.include(Square.at(3, 3));
    });
});
