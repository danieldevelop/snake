/**
 * Clase que representa un cuadrado/segmento de la serpiente.
 */

class Square {  
    constructor(x, y) {
        /**
         * Crea una instancia de Square con coordenadas x e y.
         * @param {number} x - La coordenada x del cuadrado.
         * @param {number} y - La coordenada y del cuadrado.
         */
        this.x = x || 0;
        this.y = y || 0;
        this.width = 10; // Ancho del cuadrado
        this.height = 10; // Altura del cuadrado
        this.back = null; // Referencia al cuadrado anterior en la serpiente (Cuadro de atras)
    };

    /**
     * Dibuja un cuadrado en el canvas utilizando el contexto proporcionado.
     * @param {CanvasRenderingContext2D} ctx - El contexto del canvas donde se dibuja.
     * @param {number} width - El ancho del cuadro.
     * @param {number} height - La altura del cuadro.
     * @returns {void}
     */
    draw(ctx) {
        ctx.fillStyle = 'white'; // Establece el color de relleno del cuadrado
        ctx.fillRect(this.x, this.y, this.width, this.height); // Dibuja un rectángulo en las coordenadas del cuadrado
        
        if (this.hasBack()) {
            // Si hay un cuadrado anterior, dibuja ese cuadrado en la posición actual
            this.back.draw(ctx);
        }
    };

    /**
     * Dibuja el cuadrado anterior (back) en la posición actual del cuadrado. Esto es útil para mantener 
     * la forma de la serpiente al agregar nuevos segmentos.
     * @returns {void}
     */
    add() {
        if (this.hasBack()) return this.back.add(); // Si ya hay un cuadrado anterior, llama a su método add
        this.back = new Square(this.x, this.y); // Si no hay cuadrado anterior, crea uno nuevo
    };

    /**
     * Verifica si el cuadrado tiene un cuadrado anterior (back).
     * @returns {boolean} - Retorna true si tiene un cuadrado anterior, false en caso contrario.
     */
    hasBack() {
        return this.back !== null;
    };

    /**
     * Crea una copia de las coordenadas actuales del cuadrado.
     * Esto es útil para mantener la posición anterior antes de mover el cuadrado.
     * @returns {void}
     */
    copy() {
        if (this.hasBack()) {
            // Si hay un cuadrado anterior, copia las coordenadas actuales al cuadrado anterior
            this.back.copy();
            // Actualiza las coordenadas del cuadrado anterior con las actuales
            this.back.x = this.x;
            this.back.y = this.y;
        }
    };

    /**
     * Mueve el cuadrado hacia la derecha incrementando su coordenada x.
     * @returns {void}
     */
    right() {
        this.copy(); // Copia las coordenadas actuales antes de mover
        this.x += 10;
    };

    /**
     * Mueve el cuadrado hacia la izquierda decrementando su coordenada x.
     * @returns {void}
     */
    left() {
        this.copy(); // Copia las coordenadas actuales antes de mover
        this.x -= 10;
    };

    /**
     * Mueve el cuadrado hacia arriba decrementando su coordenada y.
     * @returns {void}
     */
    up() {
        this.copy(); // Copia las coordenadas actuales antes de mover
        this.y -= 10;
    };

    /**
     * Mueve el cuadrado hacia abajo incrementando su coordenada y.
     * @returns {void}
     */
    down() {
        this.copy(); // Copia las coordenadas actuales antes de mover
        this.y += 10;
    };

    hit(head, segundo = false) {
        if (this === head && !this.hasBack()) return false; // Si es la cabeza y no tiene un cuadrado anterior, no hay colisión
        if (this === head) return this.back.hit(head, true); // Si es la cabeza, verifica la colisión con el cuadrado anterior

        if (segundo && !this.hasBack()) return false; // Si es el segundo cuadrado y no tiene un cuadrado anterior, no hay colisión
        if (segundo && this.hasBack()) return this.back.hit(head); // Si es el segundo cuadrado, verifica la colisión con el cuadrado anterior

        if (this.hasBack()) {
            return this.squareHit(head) || this.back.hit(head); // Verifica la colisión con el cuadrado anterior
        }

        return this.squareHit(head);
    }

    /**
     * Verifica si dos cuadrados colisionan entre sí.
     * @param {Square} other - El otro cuadrado
     * @returns {boolean} - Retorna true si hay colisión, false en caso contrario.
     */
    squareHit(other) {
        return this.x === other.x && this.y === other.y;
    };

    /**
     * Verifica si el cuadrado colisiona con los bordes del canvas.
     * @param {HTMLCanvasElement} canvas - El canvas donde se dibuja el cuadrado.
     * @returns {boolean} - Retorna true si colisiona con los bordes, false en caso contrario.
     */
    hitBorder(canvas) {
        return this.x + this.width > canvas.width || 
            this.x < 0 || 
            this.y + this.height > canvas.height || 
            this.y < 0;            
    }
}

export default Square;
