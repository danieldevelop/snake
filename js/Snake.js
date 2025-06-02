import Square from './Square.js';

/**
 * Clase que representa la serpiente del juego.
 */

class Snake {
    constructor() {
        this.head = new Square(100, 0);
        this.direction = 'right'; // Dirección inicial de la serpiente
        this.head.add(); // Agrega un segmento de la serpiente
        this.head.add(); // Agrega otro segmento de la serpiente
    };

    /**
     * Dibuja la cabeza de la serpiente en el canvas utilizando el contexto proporcionado.
     * @param {CanvasRenderingContext2D} ctx - El contexto del canvas donde se dibuja la serpiente.
     * @returns {void}
     */
    draw(ctx) {
        this.head.draw(ctx);
    };

    /**
     * Mueve la cabeza de la serpiente hacia abajo.
     * @returns {void}
     */
    right() {
        if (this.direction === 'left') return; // Evita que la serpiente se mueva en dirección opuesta
        this.direction = 'right';
    };

    
    /**
     * Mueve la cabeza de la serpiente hacia la izquierda.
     * @returns {void}
    */
    left() {
        if (this.direction === 'right') return; // Evita que la serpiente se mueva en dirección opuesta
        this.direction = 'left';
    };

    /**
     * Mueve la cabeza de la serpiente hacia arriba.
     * @returns {void}
     */
    up() {
        if (this.direction === 'down') return; // Evita que la serpiente se mueva en dirección opuesta
        this.direction = 'up';
    };

    /**
     * Mueve la cabeza de la serpiente hacia arriba.
     * @returns {void}
     */
    down() {
        if (this.direction === 'up') return; // Evita que la serpiente se mueva en dirección opuesta
        this.direction = 'down';
    };

    /**
     * Mueve la cabeza de la serpiente en la dirección actual. Dependiendo de la dirección, 
     * actualiza las coordenadas de la cabeza.
     * @returns {void}
     */
    move() {
        if (this.direction === 'up') return this.head.up();;
        if (this.direction === 'down') return this.head.down();
        if (this.direction === 'left') return this.head.left();
        if (this.direction === 'right') return this.head.right();
    }

    /**
     * Método que se llama cuando la serpiente "come" una comida.
     * Agrega un nuevo segmento a la serpiente en la posición actual de la cabeza.
     * @param {Function} onEat - Callback que se ejecuta cuando la serpiente come.
     * @returns {void}
     */
    eat(onEat) {
        this.head.add(); // Agrega un nuevo segmento a la serpiente
        if (onEat) onEat();
    }

    /**
     * Verifica si la serpiente ha colisionado consigo misma, esto se hace comprobando si la cabeza 
     * de la serpiente colisiona con su propio cuerpo o con los bordes del canvas.
     * @param {HTMLCanvasElement} canvas - El canvas donde se dibuja la serpiente.
     * @returns {boolean} - Retorna true si la serpiente está viva (no ha colisionado consigo misma), false en caso contrario.
     */
    dead(canvas) {
        return this.head.hit(this.head) || this.head.hitBorder(canvas);
    }
};

export default Snake;
