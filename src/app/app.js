/*
 * Basado (pero muy modificado) en https://github.com/thiagodnf/wumpus-world-simulator.
 */
import $ from 'jquery';
import * as Rx from 'rxjs';
import { Keys } from './keys';
import { resources } from './resources';
import { env } from './environment';
import { Player } from './player';
import { exp } from './explosion';

let canvas, // Canvas DOM element
  ctx,
  keys,
  playerOne,
  playerTwo,
  game$;

export var bombHandler$;
export var explosionHandler$;

const restart = () => {
  // Creamos player
  playerOne = new Player(env, 0, 0);
  playerTwo = new Player(env, 14 * 64, 6 * 64, true);

  /*
       Subscribimos funciones: me encantaría dejarlas como sólo 
       una subscripción del tipo Player.update, pero no funciona.
      */
  game$.subscribe(playerOne.update);
  game$.subscribe(playerTwo.update);
  game$.subscribe(playerOne.putBomb);
  game$.subscribe(playerTwo.putBomb);
  game$.subscribe(playerOne.explode);
  game$.subscribe(playerTwo.explode);

  bombHandler$.subscribe(playerOne.updateStats);
  bombHandler$.subscribe(playerTwo.updateStats);
  bombHandler$.subscribe(playerOne.boom);
  bombHandler$.subscribe(playerTwo.boom);

  //isAlive = true,

  draw();
};

// Browser window resize
const resizeCanvas = () => {
  canvas.width = env.width * env.i;
  canvas.height = env.height * env.j;
};

// Función se ejecuta cada vez que hay un evento.
const update = (e) => {
  keys.selected(e);

  // Acá debería ejecutar las funciones subscritas a game.
  // Funciones subscritas se activan con algún evento en game$.
  game$.next(keys);

  draw();
};

export const draw = () => {
  // Limpio el canvas con lo que había antes.
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Dibujo el env.
  env.draw(ctx);

  // Dibujo al jugador 1
  playerOne.draw(ctx);

  // Dibujo al jugador 2
  playerTwo.draw(ctx);

  //explosiones
  exp.draw(ctx);
};

export const run = () => {
  // Obtengo canvas del DOM y defino ctx y keys.
  canvas = document.getElementById('canvas');
  ctx = canvas.getContext('2d');
  keys = new Keys();

  // Definimos observables.
  game$ = new Rx.Subject();
  bombHandler$ = new Rx.Subject();
  explosionHandler$ = new Rx.Subject();

  // Cargamos los recursos (img, jugador, etc).
  resources.load().then(() => {
    restart();
    resizeCanvas();

    // Por cada evento se ejecuta update
    window.addEventListener('keydown', update, false);

    draw();
  });
};
