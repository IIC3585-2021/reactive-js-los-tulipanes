import img_upImg from "../assets/img/player_facing_to_up.png"
import img_downImg from "../assets/img/player_facing_to_down.png"
import img_leftImg from "../assets/img/player_facing_to_left.png"
import img_rightImg from "../assets/img/player_facing_to_right.png"
import wallImg from "../assets/img/wall.png"
import floorImg from "../assets/img/floor.png"
import bombImg from "../assets/img/bomb.png"

export const resources = {

    images: {},

    loadImage(name, url) {

        return new Promise((resolve, reject) => {

            let image = new Image();

            image.onload = () => resolve([name, image]);

            // Se carga imagen según url
            image.src = url;
        });
    },

    loadImages() {

        return new Promise((resolve, reject) => {

            const files = [
                this.loadImage('facing_to_up', img_upImg),
                this.loadImage('facing_to_down', img_downImg),
                this.loadImage('facing_to_left', img_leftImg),
                this.loadImage('facing_to_right', img_rightImg),
                this.loadImage('wall', wallImg),
                this.loadImage('floor', floorImg),
                this.loadImage('bomb', bombImg),
            ];

            // Promesa se resuelve cuando se cargan todas las magenes
            Promise.all(files).then((result) => {
                resolve(["images", Object.fromEntries(result)]);
            }).catch((error) => {
                reject(error);
            });
        });
    },

    load() {

        // Promesa se resuelve con objeto key: nombreImg value: Imagen
        return new Promise((resolve, reject) => {

            const files = [
                this.loadImages(),
            ];

            Promise.all(files).then((result) => {

                result = Object.fromEntries(result);

                this.images = result.images;

                resolve(result);
            }).catch((error) => {
                reject(error);
            });
        });
    }
}