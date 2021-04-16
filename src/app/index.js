/*
* Basado (pero muy modificado) en https://github.com/thiagodnf/wumpus-world-simulator. 
*/

let canvas,			// Canvas DOM element
	ctx,
    keys,
	env,
    playerOne,
    game$;

const restart = () => {

    // Creamos env
    env = new Environment();

    // Creamos player
    playerOne = new Player(env, 0, 0);
    playerTwo = new Player(env, 14*64, 6*64, true);

    /*
     Subscribimos funciones: me encantaría dejarlas como sólo 
     una subscripción del tipo Player.update, pero no funciona.
    */
    game$.subscribe(playerOne.update);
    game$.subscribe(playerTwo.update);

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
    // Funciones subscritas se activan con algún evento en game$.
    if (game$.next(keys)) {
		playerOne.score -= 10;
	}

	draw();
};

const draw = () => {

    // Limpio el canvas con lo que había antes.
	ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Dibujo el env.
	env.draw(ctx);

    // Dibujo al jugador 1
	playerOne.draw(ctx);

    // Dibujo al jugador 2
    playerTwo.draw(ctx);
}

$(function(){

    // Obtengo canvas del DOM y defino ctx y keys.
	canvas = document.getElementById("canvas");
	ctx = canvas.getContext("2d");
    keys = new Keys();

    // Definimos observable.
    game$ = new Rx.Subject();

    // Cargamos los recursos (img, jugador, etc).
    resources.load().then(() => {

        restart();
        resizeCanvas();

        // Por cada evento se ejecuta update
        window.addEventListener("keydown", update, false);

		draw();
    })
});
