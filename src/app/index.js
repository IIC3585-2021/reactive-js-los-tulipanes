/*
* Basado (pero muy modificado) en https://github.com/thiagodnf/wumpus-world-simulator. 
*/

let canvas,			// Canvas DOM element
	ctx,
    keys,
	env,
    player;

const restart = () => {

    // Creamos env
    env = new Environment();

    // TODO!!
    player = new Player(env, 0, 0);

    isAlive = true,

    draw();
}

// Browser window resize
const resizeCanvas = () => {
	canvas.width = env.width * env.i;
	canvas.height = env.height * env.j;
}

// Función se ejecuta cada vez que hay un evento.
const update = (e) => {
	
	keys.selected(e);

    // Acá debería ejecutar las funciones subscritas a game.
    if (player.update(keys)) {
		player.score -= 10;
	}

	draw();
};

const draw = () => {

    // Limpio el canvas con lo que había antes.
	ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Dibujo el env.
    if (env) {
	    env.draw(ctx);
    }
    // Dibujo al jugador
    if (player) {
	    player.draw(ctx);
    }
}

$(function(){

    // Obtengo canvas del DOM y defino ctx y keys.
	canvas = document.getElementById("canvas");
	ctx = canvas.getContext("2d");
    keys = new Keys();

    // Cargamos los recursos (img, jugador, etc).
    resources.load().then(() => {

        restart();
        resizeCanvas();

        // Por cada evento se ejecuta update
        window.addEventListener("keydown", update, false);

		draw();
    })
});
