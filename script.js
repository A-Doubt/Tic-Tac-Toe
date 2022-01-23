const game = (() => {
	const board = [
		[1, 2, 3],
		[4, 5, 6],
		[7, 8, 9],
	];
	let player1 = true;
	let player2 = false;
	let gameOver = false;
	let isWinner = false;
	let gameMoves = 0; // variable used to determine if the game is over with no winner

	// getting the board
	gameBoard = document.querySelector('.game-board');

	let tile = []
	function drawBoard() {
		var posV = 0; // position vertical
		var posH = 0; // position horizontal
		let counter = 0;

		board.forEach(outerElement => {
			posH = 0;
			outerElement.forEach(innerElement => {
				tile[counter] = document.createElement('div');
				tile[counter].classList.add('tile');
				tile[counter].setAttribute('id', `${posV}${posH}`);
				tile[counter].addEventListener('click', play);
				gameBoard.appendChild(tile[counter]);
				posH++;
				counter++;
			})
			posV++;
		});
		return tile;
	};
	drawBoard();

	function play() {
		if (gameOver) return;
		if (player1 && !this.textContent) {
			gameMoves++;
			board[this.id[0]][this.id[1]] = 'X';
			this.textContent = board[this.id[0]][this.id[1]];
			player1 = false;
			player2 = true;
			isWin();
			printWinner();
		}
		else if (player2 && !this.textContent) {
			gameMoves++;
			board[this.id[0]][this.id[1]] = 'O';
			this.textContent = board[this.id[0]][this.id[1]];
			player1 = true;
			player2 = false;
			isWin();
			printWinner();
		}
	}
	// win conditions
	function isWin() {
		if (board[0][0] == board[0][1] && board[0][1] == board [0][2] ||
			board[1][0] == board[1][1] && board[1][1] == board [1][2] ||
			board[2][0] == board[2][1] && board[2][1] == board [2][2] ||

			board[0][0] == board[1][0] && board[1][0] == board [2][0] ||
			board[0][1] == board[1][1] && board[1][1] == board [2][1] ||
			board[0][2] == board[1][2] && board[1][2] == board [2][2] ||

			board[0][0] == board[1][1] && board[1][1] == board [2][2] ||
			board[0][2] == board[1][1] && board[1][1] == board [2][0]
		) {
			isWinner = true;
			gameOver = true;
		} else if (gameMoves == 9) {
			gameOver = true;
		}
	}

	resetButton = document.querySelector('.reset-button');
	resetButton.addEventListener('click', reset);

	function printWinner() {
		if (!gameOver) return;
		winner = document.querySelector('.winner-print');
		resetButton.classList.toggle('reset-button-inactive');
		if (!isWinner) {
			winner.textContent = 'It\'s a tie!';
		}
		else if (player1) {
			winner.textContent = 'O WINS!'
		}
		else if (player2) {
			winner.textContent = 'X WINS!'
		}
	}

	function reset() {
		resetButton.classList.toggle('reset-button-inactive');
		isWinner = false;
		gameOver = false;
		player1 = true;
		player2 = false;
		gameMoves = 0;
		winner.textContent = 'X starts';
		let posV = 0;
		let posH = 0;
		let counter = 0;
		board.forEach(outerElement => {
			posH = 0;
			outerElement.forEach(innerElement => {
				tile[counter].textContent = '';
				board[posV][posH] = counter + 1;
				posH++;
				counter++;
			})
			posV++;
		})
	}
})();
