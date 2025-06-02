import Random from './Random.js';

/**
 * Clase que representa la comida en el juego Snake.
 * 
 * @class Food
 * @constructor
 * @method draw
 * @method generate
 */

class Food {
    constructor(x, y) {
        /**
         * Crea una instancia de Food con coordenadas x e y.
         * @param {number} x - La coordenada x de la comida.
         * @param {number} y - La coordenada y de la comida.
         */
        this.x = x || 0;
        this.y = y || 0;
        this.width = 10; // Ancho de la comida
        this.height = 10; // Altura de la comida
    };

    /**
     * Dibuja la comida en el canvas utilizando el contexto proporcionado.
     * @param {CanvasRenderingContext2D} ctx - El contexto del canvas donde se dibuja la comida.
     * @returns {void}
     */
    draw(ctx) {
        ctx.fillStyle = 'darkred'; // Establece el color de relleno de la comida
        ctx.fillRect(this.x, this.y, this.width, this.height); // Dibuja un rectángulo rojo en las coordenadas de la comida
    };

    /**
     * Funcion estarica que genera una nueva comida (Food) con coordenadas aleatorias.
     * @returns {Food} - Retorna una nueva instancia de Food con coordenadas aleatorias.
     */
    static generate() {
        return new Food(Random.get(0, 500), Random.get(0, 300));
    };
}

export default Food;
