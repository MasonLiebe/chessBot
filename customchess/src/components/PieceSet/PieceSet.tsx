import React from 'react';
import './PieceSet.css';

interface PieceSetProps {
  color: 'black' | 'white';
  selectedPiece: { piece: string | null; color: string } | null;
  onPieceSelect: (piece: string | null, color: string) => void;
}

function PieceSet({ color, selectedPiece, onPieceSelect }: PieceSetProps) {
  const pieces = [
    'king', // 'king' is the first piece in the array
    'pawn',
    'knight',
    'bishop',
    'rook',
    'queen',
    'custom1',
    'custom2',
    'custom3',
    'custom4',
    'custom5',
    'custom6',
  ];

  const piece_to_letter: Record<string, string> = {
    'pawn': color === 'black' ? 'p' : 'P',
    'knight': color === 'black' ? 'n' : 'N',
    'bishop': color === 'black' ? 'b' : 'B',
    'rook': color === 'black' ? 'r' : 'R',
    'queen': color === 'black' ? 'q' : 'Q',
    'custom1': color === 'black' ? 'a' : 'A',
    'custom2': color === 'black' ? 'c' : 'C',
    'custom3': color === 'black' ? 'd' : 'D',
    'custom4': color === 'black' ? 'e' : 'E',
    'custom5': color === 'black' ? 'f' : 'F',
    'custom6': color === 'black' ? 'g' : 'G',
    'king': color === 'black' ? 'k' : 'K',
  };

  const handlePieceClick = (piece: string) => {
    if (selectedPiece?.piece === piece_to_letter[piece] && selectedPiece?.color === color) {
      onPieceSelect(null, color);
    } else {
      onPieceSelect(piece_to_letter[piece], color);
    }
  };

  return (
    <div className="piece-set">
      {pieces.map((piece) => (
        <img
          key={piece}
          src={`/assets/pieces/${color}-${piece}.png`}
          alt={`${color} ${piece}`}
          className={`set-piece ${
            selectedPiece?.piece === piece_to_letter[piece] && selectedPiece?.color === color ? 'selected' : ''
          }`}
          onClick={() => handlePieceClick(piece)}
        />
      ))}
    </div>
    
  );
}

export default PieceSet;