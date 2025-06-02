import Game from './Game.js';

/**
 * Inicialización del juego Snake.
 * Este archivo es el punto de entrada principal que instancia y configura el juego.
 */

// Modo stricto para evitar errores comunes y mejorar la seguridad del código
'use strict';

/**
 * Función que se ejecuta cuando el DOM está completamente cargado.
 */
document.addEventListener('DOMContentLoaded', () => {
    // Crear una nueva instancia del juego
    // Parámetros: ID del canvas y ID del elemento de puntuación
    const game = new Game('canvas', 'score');
});