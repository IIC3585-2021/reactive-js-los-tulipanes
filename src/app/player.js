/**
* Función para crear jugadores. 
* TODO: Crearla como clase
*/

let FACING_TO_UP = 1,
    FACING_TO_DOWN = 2,
    FACING_TO_LEFT = 3,
    FACING_TO_RIGHT = 4;

const Player = function(env, x, y, secondPlayer=false) {

    this.x = x;
  	this.y = y;
    this.env = env;
    this.speed = this.env.height;
    this.direction = secondPlayer ? FACING_TO_UP : FACING_TO_DOWN;
    this.secondPlayer = secondPlayer;
    this.score = 0;
    this.lifes = 3;
    this.bombs = 10;

    // Función subscrita a $game.
    this.putBomb = (keys) => {


        if (keys.space) {
            // si apreto space dejo la bomba
        }
    };

    // Función subscrita a $game.
    this.update = (keys) => {

		// Posición previa.
		let prevX = this.x,
			prevY = this.y;

        // Entro si y sólo si soy el segundo jugador y input corresponde al segundo jugador.
        if (!!this.secondPlayer === !!keys.secondInput) {
            // Me muevo dependiendo de la flecha apretada
            if (keys.up) {
                if(this.direction == FACING_TO_UP && this.y > 0 && this.env.legalMove(this.getPosI(), this.getPosJ() - 1)){
                    this.y -= this.speed;
                }else{
                    this.direction = FACING_TO_UP;
                }
            } else if (keys.down) {
                if(this.direction == FACING_TO_DOWN && this.y+this.speed < this.env.j*this.env.height && this.env.legalMove(this.getPosI(), this.getPosJ() + 1)){
                    this.y += this.speed;
                }else{
                    this.direction = FACING_TO_DOWN;
                }
            } else if (keys.left) {
                if(this.direction == FACING_TO_LEFT && this.x > 0 && this.env.legalMove(this.getPosI() - 1, this.getPosJ())){
                    this.x -= this.speed;
                }else{
                    this.direction = FACING_TO_LEFT;
                }
            } else if (keys.right) {
                if(this.direction == FACING_TO_RIGHT && this.x+this.speed < this.env.i*this.env.width && this.env.legalMove(this.getPosI() + 1, this.getPosJ())){
                    this.x += this.speed;
                }else{
                    this.direction = FACING_TO_RIGHT;
                }
            }
    
            keys.up = keys.down = keys.left = keys.right = keys.secondInput = false;
        }
        
        // Retorna true si jugador se movio, en caso contrario false.
		return (prevX != this.x || prevY != this.y) ? true : false;
	};

    this.getPosI = function(){
		return Math.floor(this.x / this.env.width);
	};

	this.getPosJ = function(y){
		return Math.floor(this.y / this.env.height);
	};

	this.draw = function(ctx) {
        if(this.direction == FACING_TO_DOWN){
            ctx.drawImage(resources.images['facing_to_down'], this.x, this.y, this.env.width, this.env.height);
        }else if(this.direction == FACING_TO_UP){
            ctx.drawImage(resources.images['facing_to_up'], this.x, this.y, this.env.width, this.env.height);
        }else if(this.direction == FACING_TO_LEFT){
            ctx.drawImage(resources.images['facing_to_left'], this.x, this.y, this.env.width, this.env.height);
        }else if(this.direction == FACING_TO_RIGHT){
            ctx.drawImage(resources.images['facing_to_right'], this.x, this.y, this.env.width, this.env.height);
        }
	};
};