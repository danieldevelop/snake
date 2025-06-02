/**
 * Clase utilitaria para generar números aleatorios.
 * 
 * @class Random
 * @method get
 */

class Random {
    /**
     * Genera un número aleatorio entre un mínimo y un máximo.
     * @param {number} min - El valor mínimo del rango.
     * @param {number} max - El valor máximo del rango.
     * @returns {number} - Un número aleatorio entre min y max.
     */
    static get(min, max) {
        return Math.floor(Math.random() * max) + min; // Genera un número aleatorio entre min y max
    };
}

export default Random;
