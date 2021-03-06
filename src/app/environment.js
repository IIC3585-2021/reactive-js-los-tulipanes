/**
 * Función para crear tablero del juego.
 * TODO: Crearla como clase
 */

import { resources } from './resources';

const Environment = function (i = 15, j = 7, width = 64, height = 64) {
  this.i = i; //columnas
  this.j = j; // filas
  this.width = width; // ancho bloque
  this.height = height; // alto bloque
  this.block = [];
  for (let n = 1; n < this.i; n += 2) {
    for (let k = 1; k < this.j; k += 2) {
      this.block.push([n, k]);
    }
  }
  // this.boxes = [[10,10]];

  this.unsafeNeighbors = (x, y) => {
    return [
      [x, y + 1],
      [x, y - 1],
      [x - 1, y],
      [x + 1, y],
      [x, y],
    ];
  };

  this.isSafe = (x, y) => {
    if (x < 0 || x > this.i) return false;
    if (y < 0 || y > this.j) return false;
    return true;
  };

  this.neighbors = (x, y) => {
    const allNeighbors = this.unsafeNeighbors(x, y);
    const safeNeighbors = allNeighbors.filter((p) => this.isSafe(...p));
    return safeNeighbors;
  };

  /*
    Retorna true si (x, y) corresponde a posición de un bloque
    false en otro caso. 
    */
  this.legalMove = (x, y) => {
    let movement = true;
    this.block.forEach((element) => {
      if (element[0] == x && element[1] == y) {
        movement = false;
      }
    });
    return movement;
  };

  // Método para dibujar el tablero.
  this.draw = (ctx) => {
    for (let i = 0; i < this.i; i++) {
      for (var j = 0; j < this.j; j++) {
        ctx.drawImage(
          resources.images['floor'],
          i * this.width,
          j * this.height,
          this.width,
          this.height
        );
      }
    }

    this.block.forEach((element) => {
      ctx.drawImage(
        resources.images['wall'],
        element[0] * this.width,
        element[1] * this.height,
        this.width,
        this.height
      );
    });
  };
};

export const env = new Environment();
