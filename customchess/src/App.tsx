import React, { useState, useEffect } from 'react';
import './App.css';
import BoardCustomizer from './components/BoardCustomizer/BoardCustomizer';
import BoardPanel from './components/BoardPanel/BoardPanel';
import PieceSet from './components/PieceSet/PieceSet';
import { standardBoard } from './constants';

function App() {
  const [rows, setRows] = useState(8);
  const [columns, setColumns] = useState(8);
  const [isSquare, setIsSquare] = useState(true);
  const [pieces, setPieces] = useState<string[]>(standardBoard.split(''));
  const [selectedPieceType, setSelectedPieceType] = useState<{ piece: string; color: string } | null>(null);
  const [selectedBoardPiece, setSelectedBoardPiece] = useState<number | null>(null);

  const handlePieceSelect = (piece: string | null, color: string) => {
    if (piece) {
      setSelectedPieceType({ piece, color });
    } else {
      setSelectedPieceType(null);
    }
  };

  const handleRowsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newRows = parseInt(event.target.value);
    setRows(newRows);
    if (isSquare) {
      setColumns(newRows);
    }
  };

  const handleColumnsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newColumns = parseInt(event.target.value);
    setColumns(newColumns);
    if (isSquare) {
      setRows(newColumns);
    }
  };

  const handleSquareToggle = () => {
    setIsSquare(!isSquare);
    if (!isSquare) {
      setRows(8);
      setColumns(8);
    }
  };

  const handleBoardClick = (index: number) => {
    console.log(index);
    if (selectedBoardPiece !== null) {
      // Move the selected board piece to the clicked square
      const updatedPieces = [...pieces];
      updatedPieces[index] = pieces[selectedBoardPiece];
      updatedPieces[selectedBoardPiece] = '.';
      setPieces(updatedPieces);
      setSelectedBoardPiece(null);
    } else if (selectedPieceType) {
      // Place the selected piece type on the clicked square
      const updatedPieces = [...pieces];
      console.log(selectedPieceType.piece);
      updatedPieces[index] = selectedPieceType.piece;
      setPieces(updatedPieces);
      setSelectedPieceType(null);
    } else {
      // Select the clicked board piece
      if (pieces[index] !== '.') {
        setSelectedBoardPiece(index);
      }
    }
  };

  useEffect(() => {
    if (isSquare) {
      setColumns(rows);
    }
  }, [isSquare, rows]);

  return (
    <div className="app">
      <h1 className="app-title">Custom Chess Workshop</h1>
      <div className="main-container">
        <div className="chessboard-wrapper">
          <div className="chessboard-container">
            <PieceSet color="black" selectedPiece={selectedPieceType} onPieceSelect={handlePieceSelect} />
            <BoardCustomizer
              rows={rows}
              columns={columns}
              pieces={pieces}
              onSquareClick={handleBoardClick}
            />
            <PieceSet color="white" selectedPiece={selectedPieceType} onPieceSelect={handlePieceSelect} />
          </div>
        </div>
        <BoardPanel
          rows={rows}
          columns={columns}
          isSquare={isSquare}
          onRowsChange={handleRowsChange}
          onColumnsChange={handleColumnsChange}
          onSquareToggle={handleSquareToggle}
        />
      </div>
    </div>
  );
}

export default App;