/**************************************************
** GAME KEYBOARD CLASS
**************************************************/
export const Keys = function (up = false, left = false, right = false, down = false, space = false, enter = false, secondInput = false) {

	const selected = function (e) {

		let c = e.keyCode;

		switch (c) {
			// Controls
			case 37: // Left
				this.left = true;
				break;
			case 65: // Left Second Player
				this.left = true;
				this.secondInput = true;
				break;
			case 38: // Up
				this.up = true;
				break;
			case 87: // Up Second Player
				this.up = true;
				this.secondInput = true;
				break;
			case 39: // Right
				this.right = true;
				break;
			case 68: // Right Second Player
				this.right = true;
				this.secondInput = true;
				break;
			case 40: // Down
				this.down = true;
				break;
			case 83: // Down Second Player
				this.down = true;
				this.secondInput = true;
				break;
			case 13: // Bomb (Bomba primer jugador)
				this.space = true;
				break;
			case 32: // Bomb (Bomba segundo jugador)
				this.space = true;
				this.secondInput = true;
				break;
		};
	};

	return {
		up: up,
		left: left,
		right: right,
		down: down,
		space: space,
		enter: enter,
		secondInput: secondInput,
		selected: selected,
	};
};