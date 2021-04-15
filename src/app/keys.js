/**************************************************
** GAME KEYBOARD CLASS
**************************************************/
const Keys = function(up=false, left=false, right=false, down=false, space=false, enter=false) {

	var selected = function(e) {
		var that = this,
			c = e.keyCode;

		switch (c) {
			// Controls
			case 37: // Left
				that.left = true;
				break;
			case 38: // Up
				that.up = true;
				break;
			case 39: // Right
				that.right = true; // Will take priority over the left key
				break;
			case 40: // Down
				that.down = true;
				break;
			case 32: // Space
				that.space = true;
				break;
			case 13: // enter
				that.enter = true;
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
		selected: selected,
	};
};