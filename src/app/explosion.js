import { env } from './environment'
import { explosionHandler$, draw } from './app'
import { resources } from './resources'

const Explosion = function (positions) {
  this.positions = [...positions]

  this.draw = (ctx) => {
    this.positions.forEach((p) => {
      ctx.drawImage(resources.images['explosion'], p[0] * env.width, p[1] * env.height, env.width, env.height);
    })
  }
}

export const Explosions = function () {
  this.explosions = [];


  this.newExplosion = (x, y) => {
    const positions = env.neighbors(x, y);
    // console.log(x, y)
    // console.log(positions)
    const explosion = new Explosion(positions)
    this.explosions.push(explosion)

    setTimeout(() => {
      const index = this.explosions.indexOf(explosion);
      this.explosions.splice(index, 1);
      draw();
    }, 2 * 1000)

  }

  this.draw = (ctx) => {
    //console.log(this.explosions)
    this.explosions.forEach((e) => {
      e.draw(ctx)
    });
  }
}

export const exp = new Explosions();