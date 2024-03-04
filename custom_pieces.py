class Piece:
    # generally defined as a piece that can move in any direction

    def __init__(self, color, position = (-1, -1), n = False, s = False, e = False, w = False, ne = False, nw = False, se = False, sw = False, attack_jumps = [], move_jumps = [], traversable = False, takeable = True):
        self.directions = {n: (1,0), s: (-1,0), e: (0,1), w: (0,-1), ne: (1,1), nw: (1,-1), se: (-1,1), sw: (-1,-1)}
        self.color = color
        self.position = position
        self.n = n
        self.s = s
        self.e = e
        self.w = w
        self.ne = ne
        self.nw = nw
        self.se = se
        self.sw = sw
        self.attack_jumps = attack_jumps # a list of tuples representing the jumps a piece can make to attack
        self.move_jumps = move_jumps # a list of tuples representing the jumps a piece can make to move
        self.traversable = traversable # a piece that can be passed through, but taken when landed on

    def get_legal_moves(self, game):
        # parameters: game object
        # returns a dictionary of legal moves for the piece
        legal_moves = set()

        # check if the piece is pinned to the king
        if game.is_pinned(self): # if the piece is pinned, it can only move toward and away from the king
            # iterate through moves that are toward and away from the king
            pass

        # iterate through directions and add legal moves
        for direction, jump in self.directions.items():
            if direction:
                i, j = self.position
                while True:
                    # iterate through the direction until an untraversable space is reached
                    i += jump[0]
                    j += jump[1]
                    if i < 0 or i >= game.rows or j < 0 or j >= game.cols:
                        break
                    if game.board[i][j].traversable: # empty space or traversable piece
                        legal_moves.add((i,j))
                    else: # non-traversable piece
                        if game.board[i][j].color != self.color or game.self_capture: # takeable piece
                            legal_moves.add((i,j))
                        break
        
        # iterate through the attack jumps and add legal moves
        
    def is_move_legal(self, game, move):
        # parameters: game object
        # returns True if the move is legal, False otherwise
        pass

    def move(self, game, move):
        # parameters: game object, move
        # updates the game board with the move
        pass



class Queen(Piece):
    # standard queen piece
    def __init__(self, color, position):
        super().__init__(color, position, n = True, s = True, e = True, w = True, ne = True, nw = True, se = True, sw = True)

class King(Piece):
    # standard king piece
    def __init__(self, color, position):
        super().__init__(color, position, n = True, s = True, e = True, w = True, ne = True, nw = True, se = True, sw = True)

class Rook(Piece):
    # standard rook piece
    def __init__(self, color, position):
        super().__init__(color, position, n = True, s = True, e = True, w = True)
    
class Bishop(Piece):
    # standard bishop piece
    def __init__(self, color, position):
        super().__init__(color, position, ne = True, nw = True, se = True, sw = True)

class Knight(Piece):
    # standard knight piece
    def __init__(self, color, position):
        super().__init__(color, position, attack_jumps = [(1,2), (2,1), (-1,2), (-2,1), (1,-2), (2,-1), (-1,-2), (-2,-1)], move_jumps = [(1,2), (2,1), (-1,2), (-2,1), (1,-2), (2,-1), (-1,-2), (-2,-1)])
                         
class Pawn(Piece):
    # standard pawn piece
    def __init__(self, color, position):
        if color == "w":
            super().__init__(color, position, n = True, attack_jumps = [(-1,1), (-1,-1)], move_jumps = [(-1,0), (-2,0)])
        else:
            super().__init__(color, position, s = True, attack_jumps = [(1,1), (1,-1)], move_jumps = [(1,0), (2,0)])

class Empty(Piece):
    # empty space
    def __init__(self, position):
        super().__init__(None, position, traversable=True)

class enPassant(Piece):
    # empty square that can be taken by en passant
    def __init__(self, color, position):
        super().__init__(color, position, traversable=True)

        # mark the pawn that can be taken by en passant
        if color == "w":
            self.removable_pawn = (position[0]-1, position[1])
        else:
            self.removable_pawn = (position[0]+1, position[1])
        
        



