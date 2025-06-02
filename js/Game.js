import Snake from './Snake.js';
import Food from './Food.js';
import CollisionUtils from './CollisionUtils.js';

/**
 * Clase principal que maneja la lógica del juego Snake.
 */

class Game {
    constructor(canvasId, scoreId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.scoreElement = document.getElementById(scoreId);

        this.snake = new Snake();
        this.foods = [];
        this.puntos = 0;
        this.gameRunning = false;
        this.animationInterval = null;
        this.foodGenerationInterval = null;

        this.init();
    }

    /**
     * Inicializa el juego
     */
    init() {
        this.updateScore();
        this.setupEventListeners();
        this.start();
    }

    /**
     * Configura los event listeners para el control del juego.
     */
    setupEventListeners() {
        window.addEventListener('keydown', (event) => {
            if (event.keyCode > 36 && event.keyCode < 41) {
                event.preventDefault(); // Evita el comportamiento por defecto de las teclas de flecha
            }

            switch (event.key) {
                case 'ArrowDown':
                    this.snake.down();
                    break;
                case 'ArrowRight':
                    this.snake.right();
                    break;
                case 'ArrowUp':
                    this.snake.up();
                    break;
                case 'ArrowLeft':
                    this.snake.left();
                    break;
            }
        });
    }

    /**
     * Inicia el juego, comenzando la animación y generando comida.
     */
    start() {
        if (this.gameRunning) return; // Evita iniciar el juego si ya está en ejecución

        this.gameRunning = true;

        // Loop principal del juego
        this.animationInterval = setInterval(() => {
            this.update();
            this.render();

            if (this.snake.dead(this.canvas)) {
                this.gameOver();
            }
        }, 1000 / 10); // 10 FPS

        // Gneración de comida
        this.foodGenerationInterval = setInterval(() => {
            this.generateFood();
        }, 4000); // Genera comida cada 4 segundos
    }

    /**
     * Actualiza la lógica del juego.
     */
    update() {
        this.snake.move();
        this.checkFoodCollisions();
    }

    /**
     * Renderiza el juego.
     */
    render() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); // Limpia el canvas
        this.snake.draw(this.ctx); // Dibuja la serpiente
        this.drawFoods(); // Dibuja la comida
    }

    /**
     * Genera una nueva comida.
     */
    generateFood() {
        const food = Food.generate(this.canvas.width, this.canvas.height);
        this.foods.push(food);

        // Elimina la comida después de 10 segundos
        setTimeout(() => {
            this.removeFood(food);
        }, 10000);
    }

    /**
     * Dibuja todas las comidas en el canvas.
     */
    drawFoods() {
        this.foods.forEach(food => {
            if (food) {
                food.draw(this.ctx);
            }
        });
    }

    /**
     * Verifica colisiones con la comida.
     */
    checkFoodCollisions() {
        this.foods.forEach(food => {
            if (CollisionUtils.hit(food, this.snake.head)) {
                this.snake.eat(() => {
                    this.puntos++;
                    this.updateScore();
                });
                this.removeFood(food);
            }
        });
    }

    /**
     * Elimina un comida del array
     * @param {Food} food - La comida a eliminar.
     */
    removeFood(food) {
        this.foods = this.foods.filter(f => f !== food);
    }

    /**
     * Actualiza la puntación en pantalla.
     */
    updateScore() {
        this.scoreElement.innerHTML = `Puntos: ${this.puntos}`;
    }

    /**
     * Maneja el final del juego.
     */
    gameOver() {
        this.gameRunning = false;
        
        if (this.animationInterval) {
            clearInterval(this.animationInterval);
        }
        if (this.foodGenerationInterval) {
            clearInterval(this.foodGenerationInterval);
        }

        Swal.fire({
            title: 'Game Over',
            text: `Your score: ${this.puntos}`,
            icon: 'error',
            confirmButtonText: 'Play Again'
        }).then(() => {
            window.location.reload(); // Recarga la página para reiniciar el juego
            this.puntos = 0; // Reinicia la puntuación
            this.updateScore(); // Actualiza la puntuación en pantalla 
        });
    }

    /**
     * Pausa el juego.
     */
    pause() {
        if (this.gameRunning) {
            clearInterval(this.animationInterval);
            clearInterval(this.foodGenerationInterval);
            this.gameRunning = false;
        }
    }

    /**
     * Reanuda el juego.
     */
    resume() {
        if (!this.gameRunning) {
            this.start();
        }
    }
}

export default Game;