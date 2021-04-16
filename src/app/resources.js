let resources = {

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
                this.loadImage('facing_to_up', 'assets/img/player_facing_to_up.png'),
                this.loadImage('facing_to_down', 'assets/img/player_facing_to_down.png'),
                this.loadImage('facing_to_left', 'assets/img/player_facing_to_left.png'),
                this.loadImage('facing_to_right', 'assets/img/player_facing_to_right.png'),
                this.loadImage('wall', 'assets/img/wall.png'),
                this.loadImage('floor', 'assets/img/floor.png'),
                this.loadImage('bomb', 'assets/img/bomb.png'),
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