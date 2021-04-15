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
    // player = new Player(env, 0, 0);

    isAlive = true,

    animate();
}

// Browser window resize
const resizeCanvas = () => {
	canvas.width = env.width * env.i;
	canvas.height = env.height * env.j;
}

// Keyboard key down
const onKeydown = (e) => {
	// if (player) {
	// 	keys.onKeyDown(e);
	// };
	keys.onKeyDown(e);

	animate();
};

const update = () => {
    // Cada vez que ocurre un evento.
}

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

const animate = () => {
    // update(); implementar junto con el agente.
	draw();
}

$(function(){

    // Obtengo canvas del DOM y defino ctx y keys.
	canvas = document.getElementById("canvas");
	ctx = canvas.getContext("2d");
    // keys = new Keys();

    // Cargamos los recursos (img, jugador, etc).
    resources.load().then(() => {

        restart();
        resizeCanvas();

        // Start listening for events
        // window.addEventListener("keydown", onKeydown, false);

		animate();
    })
});
