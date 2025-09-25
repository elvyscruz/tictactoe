class TicTacToe {
    constructor() {
        this.board = Array(9).fill('');
        this.currentPlayer = 'X';
        this.gameActive = true;
        this.cells = document.querySelectorAll('.cell');
        this.currentPlayerElement = document.getElementById('current-player');
        this.resetButton = document.getElementById('reset-btn');
        this.winnerMessage = document.getElementById('winner-message');

        this.winningConditions = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Filas
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columnas
            [0, 4, 8], [2, 4, 6] // Diagonales
        ];

        this.initializeGame();
    }

    initializeGame() {
        this.cells.forEach((cell, index) => {
            cell.addEventListener('click', () => this.handleCellClick(index));
        });

        this.resetButton.addEventListener('click', () => this.resetGame());
        this.updateDisplay();
    }

    handleCellClick(index) {
        if (this.board[index] !== '' || !this.gameActive) {
            return;
        }

        this.makeMove(index);
    }

    makeMove(index) {
        this.board[index] = this.currentPlayer;
        this.updateCell(index);

        if (this.checkWinner()) {
            this.gameActive = false;
            this.showWinner();
            return;
        }

        if (this.checkDraw()) {
            this.gameActive = false;
            this.showDraw();
            return;
        }

        this.switchPlayer();
        this.updateDisplay();
    }

    updateCell(index) {
        const cell = this.cells[index];
        cell.textContent = this.currentPlayer;
        cell.classList.add(this.currentPlayer.toLowerCase());

        // Añadir animación
        cell.style.animation = 'none';
        cell.offsetHeight; // Trigger reflow
        cell.style.animation = 'pulse 0.3s ease-in-out';
    }

    checkWinner() {
        return this.winningConditions.some(condition => {
            const [a, b, c] = condition;
            return this.board[a] &&
                   this.board[a] === this.board[b] &&
                   this.board[a] === this.board[c];
        });
    }

    checkDraw() {
        return this.board.every(cell => cell !== '');
    }

    switchPlayer() {
        this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
    }

    updateDisplay() {
        this.currentPlayerElement.textContent = this.currentPlayer;
    }

    showWinner() {
        this.winnerMessage.textContent = `¡Jugador ${this.currentPlayer} gana!`;
        this.winnerMessage.classList.add('winner');
        this.highlightWinningCells();
    }

    showDraw() {
        this.winnerMessage.textContent = '¡Es un empate!';
        this.winnerMessage.classList.add('winner');
    }

    highlightWinningCells() {
        this.winningConditions.forEach(condition => {
            const [a, b, c] = condition;
            if (this.board[a] &&
                this.board[a] === this.board[b] &&
                this.board[a] === this.board[c]) {

                this.cells[a].style.background = '#c6f6d5';
                this.cells[b].style.background = '#c6f6d5';
                this.cells[c].style.background = '#c6f6d5';
            }
        });
    }

    resetGame() {
        this.board = Array(9).fill('');
        this.currentPlayer = 'X';
        this.gameActive = true;

        this.cells.forEach(cell => {
            cell.textContent = '';
            cell.classList.remove('x', 'o');
            cell.style.background = '#f7fafc';
            cell.style.animation = '';
        });

        this.winnerMessage.textContent = '';
        this.winnerMessage.classList.remove('winner');
        this.updateDisplay();
    }
}

// Inicializar el juego cuando el DOM esté cargado
document.addEventListener('DOMContentLoaded', () => {
    new TicTacToe();
});

// Añadir soporte para táctil en dispositivos móviles
document.addEventListener('touchstart', function() {}, {passive: true});

// Prevenir zoom en dispositivos móviles durante el juego
document.addEventListener('gesturestart', function(e) {
    e.preventDefault();
});

document.addEventListener('gesturechange', function(e) {
    e.preventDefault();
});