// Modo estricto para evitar errores comunes y mejorar la seguridad
'use strict'; 

/**
 * Funcion anonima autoejecutable para evitar contaminar el espacio de nombres global
 * y encapsular el código.Esta función se ejecuta inmediatamente después de ser definida,
 * lo que significa que el código dentro de ella se ejecuta al instante.
 * 
 * Esto es útil para inicializar variables, configurar eventos o realizar tareas
 * de configuración sin necesidad de esperar a que el documento esté completamente cargado.
 * 
 * @returns {void}
 * @example
 * ;(() => {
 *   // Código que se ejecuta inmediatamente
 *  console.log('Función autoejecutable ejecutada');
 * })();
 */
;(() => {

    class Square {
        constructor(x, y) {
            /**
             * Crea una instancia de Square con coordenadas x e y.
             * @param {number} x - La coordenada x del cuadrado.
             * @param {number} y - La coordenada y del cuadrado.
             */
            this.x = x || 0;
            this.y = y || 0;
        }

        /**
         * Dibuja un cuadrado en el canvas utilizando el contexto proporcionado.
         * @param {CanvasRenderingContext2D} ctx - El contexto del canvas donde se dibuja.
         * @param {number} width - El ancho del cuadro.
         * @param {number} height - La altura del cuadro.
         * @returns {void}
         */
        draw() {
            ctx.fillRect(this.x, this.y, 10, 10);
        }
    };


    class Snake {
        constructor() {
            this.head = new Square(100, 0);
            this.draw();
            this.direction = 'right'; // Dirección inicial de la serpiente
        };

        draw() {
            this.head.draw();
        };

        /**
         * Mueve la cabeza de la serpiente hacia abajo.
         * @returns {void}
         */
        right() {
            this.direction = 'right';
        };

        
        /**
         * Mueve la cabeza de la serpiente hacia la izquierda.
         * @returns {void}
        */
       left() {
           this.direction = 'left';
        };

        /**
         * Mueve la cabeza de la serpiente hacia arriba.
         * @returns {void}
         */
        up() {
            this.direction = 'up';
        };

        /**
         * Mueve la cabeza de la serpiente hacia arriba.
         * @returns {void}
         */
        down() {
            this.direction = 'down';
        };

        /**
         * Mueve la cabeza de la serpiente en la dirección actual. Dependiendo de la dirección, 
         * actualiza las coordenadas de la cabeza.
         * 
         * @returns {void}
         */
        move() {
            if (this.direction === 'up') return this.head.y -= 10;
            if (this.direction === 'down') return this.head.y += 10;
            if (this.direction === 'left') return this.head.x -= 10;
            if (this.direction === 'right') return this.head.x += 10;
        }
    };



    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    
    const snake = new Snake();


    window.addEventListener('keydown', (event) => {
        /**
         * Maneja el evento de pulsación de tecla para mover la serpiente.
         * @param {KeyboardEvent} event - El evento de teclado.
         */
        // switch (event.key) {
        //     case 'ArrowUp':
        //         snake.up();
        //         break;
        //     case 'ArrowDown':
        //         snake.down();
        //         break;
        //     case 'ArrowLeft':
        //         snake.left();
        //         break;
        //     case 'ArrowRight':
        //         snake.right();
        //         break;
        //     default:
        //         break;
        // }
        if (event.key === 'ArrowDown') return snake.down();
        if (event.key === 'ArrowRight') return snake.right();
        if (event.key === 'ArrowUp') return snake.up();
        if (event.key === 'ArrowLeft') return snake.left();

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        snake.draw();
    });



    setInterval(() => {
        snake.move();
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        snake.draw();
    }, 1000 / 5);
})();