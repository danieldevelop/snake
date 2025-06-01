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
    class Random {
        /**
         * Genera un número aleatorio entre un mínimo y un máximo.
         * @param {number} min - El valor mínimo del rango.
         * @param {number} max - El valor máximo del rango.
         * @returns {number} - Un número aleatorio entre min y max.
         */
        static get(min, max) {
            // return Math.floor(Math.random() * (max - min + 1)) + min; // Genera un número aleatorio entre min y max, incluyendo ambos extremos
            return Math.floor(Math.random() * max) + min; // Genera un número aleatorio entre min y max
        };
    };

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
         * @returns {void}
         */
        draw() {
            ctx.fillStyle = 'red'; // Color de la comida
            ctx.fillRect(this.x, this.y, this.width, this.height); // Dibuja un rectángulo rojo en las coordenadas de la comida
        };

        /**
         * Funcion estarica que genera una nueva comida (Food) con coordenadas aleatorias.
         * @returns {Food} - Retorna una nueva instancia de Food con coordenadas aleatorias.
         */
        static generate() {
            return new Food(Random.get(0, 500), Random.get(0, 300));
        };
    };

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
        draw() {
            ctx.fillRect(this.x, this.y, this.width, this.height); // Dibuja un rectángulo en las coordenadas del cuadrado
            
            if (this.hasBack()) {
                // Si hay un cuadrado anterior, dibuja ese cuadrado en la posición actual
                this.back.draw();
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

            // No es ni la cabeza ni el segundo
            if (this.hasBack()) {
                return squareHit(this, head) || this.back.hit(head); // Verifica la colisión con el cuadrado anterior
            }

            // No es la cabeza ni el segundo, y soy el ultimo cuadrado
            return squareHit(this, head); // Verifica la colisión con la cabeza
        }

        /**
         * Verifica si el cuadrado colisiona con los bordes del canvas.
         * @returns {boolean} - Retorna true si colisiona con los bordes, false en caso contrario.
         */
        hitBorder() {
            // return this.x > 490 || this.x < 0 || this.y > 290 || this.y < 0;
            return this.x + this.width > canvas.width || this.x < 0 || this.y + this.height > canvas.height || this.y < 0;            
        }
    };


    class Snake {
        constructor() {
            this.head = new Square(100, 0);
            this.draw();
            this.direction = 'right'; // Dirección inicial de la serpiente
            this.head.add(); // Agrega un segmento de la serpiente
            this.head.add(); // Agrega otro segmento de la serpiente
        };

        draw() {
            this.head.draw();
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
         * 
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
         * 
         * @returns {void}
         */
        eat() {
            puntos++;
            document.getElementById('score').innerText = `Puntos: ${puntos}`; // Muestra los puntos en el elemento con id 'puntos'
            this.head.add(); // Agrega un nuevo segmento a la serpiente
        }

        /**
         * Verifica si la serpiente ha colisionado consigo misma, esto se hace comprobando si la cabeza 
         * de la serpiente colisiona con su propio cuerpo o con los bordes del canvas.
         * @returns {boolean} - Retorna true si la serpiente está viva (no ha colisionado consigo misma), false en caso contrario.
         */
        dead() {
            return this.head.hit(this.head) || this.head.hitBorder();
        }
    };



    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    let puntos = 0; // Variable para almacenar los puntos del jugador
    const snake = new Snake();
    let foods = []; // Array para almacenar las comidas generadas

    
    window.addEventListener('keydown', (event) => {
        if (event.keyCode > 36 && event.keyCode < 41) event.preventDefault(); // Evita el comportamiento por defecto del navegador al presionar teclas

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
        
        return false; // Evita que se realice la acción por defecto del navegador
    });
    
    document.getElementById('score').innerText = `Puntos: ${puntos}`; // Muestra los puntos en el elemento con id 'puntos'
    
    const animacion = setInterval(() => {
        snake.move();
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        snake.draw();
        drawFoods(); // Dibuja las comidas en cada frame

        // if (snake.dead()) {
        //     console.log('¡La serpiente ha muerto!'); // Mensaje de depuración
        //     alert('¡Game Over!'); // Muestra un mensaje de alerta al jugador
        //     window.location.reload(); // Recarga la página para reiniciar el juego
        // }

        if (snake.dead()) {
            window.clearInterval(animacion); // Detiene la animación
            alert('¡Game Over!'); // Muestra un mensaje de alerta al jugador
            window.location.reload(); // Recarga la página para reiniciar el juego
        }
    }, 1000 / 10); // 10 FPS (Frames por segundo)


    // Generar comida
    setInterval(() => {
        const food = Food.generate();
        foods.push(food); // Agrega la nueva comida al array de comidas

        // Elimina la comida del array después de 10 segundos
        setTimeout(() => {
            removeFromFoods(food); // Elimina la comida del array
            ctx.clearRect(food.x, food.y, 10, 10); // Limpia el área donde estaba la comida
        }, 10000); // Elimina la comida después de 10 segundos
    }, 4000); // Genera comida cada 4 segundos
    
    /**
     * Dibuja todas las comidas almacenadas en el array de comidas.
     * @returns {void}
    */
   const drawFoods = () => {
       for(const index in foods) {
            const food = foods[index];
            if (typeof food !== 'undefined') {
                food.draw() // Dibuja cada comida en el canvas

                // Verifica si la cabeza de la serpiente colisiona con la comida
                if (hit(food, snake.head)) {
                    snake.eat(); // Llama al método eat de la serpiente
                    removeFromFoods(food); // Elimina la comida del array
                }
            }
        }
    };

    drawFoods(); // Llama a la función para dibujar las comidas al inicio
    
    const removeFromFoods = (food) => {
        foods = foods.filter(f => f !== food);
    };

    /**
     * Verifica si dos cuadrados colisionan entre sí.
     * @param {Object} cuadrado_uno - El primer cuadrado con propiedades x, y, width, height.
     * @param {Object} cuadrado_dos - El segundo cuadrado con propiedades x, y, width, height.
     * @returns {boolean} - Retorna true si los cuadrados colisionan, false en caso contrario.
     */
    const squareHit = (cuadrado_uno, cuadrado_dos) => {
        return cuadrado_uno.x == cuadrado_dos.x && cuadrado_uno.y == cuadrado_dos.y;
    };

    const hit = (a,b) => {
        let hit = false;

        // Colisiones horizontales
        if (b.x + b.width >= a.x && b.x <= a.x + a.width) {
            // Colisiones verticales
            if (b.y + b.height >= a.y && b.y <= a.y + a.height) 
                hit = true; // Hay colisión
        }

        // Colisiones de a con b
        if (b.x <= a.x && b.x + b.width >= a.x + a.width) {
            // Colisiones verticales
            if (b.y <= a.y && b.y + b.height >= a.y + a.height) 
                hit = true; // Hay colisión
        }

        // Colisiones de b con a
        if (a.x <= b.x && a.x + a.width >= b.x + b.width) {
            // Colisiones verticales
            if (a.y <= b.y && a.y + a.height >= b.y + b.height) 
                hit = true; // Hay colisión
        }

        return hit; // Retorna true si hay colisión, false en caso contrario
    }
})();