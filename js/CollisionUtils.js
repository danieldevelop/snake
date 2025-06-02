/**
 * Utilidades para detección de colisiones entre cuadrados.
 * @method hit
 * @method squareHit
 */

class CollisionUtils {
    /**
     * Verifica si dos objetos rectangulares colisionan entre sí.
     * @param {Object} a - Primer objeto con propiedades x, y, width, height.
     * @param {Object} b - Segundo objeto con propiedades x, y, width, height.
     * @returns {boolean} - Retorna true si colisionan, false en caso contrario.
     */
    static hit(a,b) {
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
    };

    static squareHit(cuadrado_uno, cuadrado_dos) {
        return cuadrado_uno.x === cuadrado_dos.x && cuadrado_uno.y === cuadrado_dos.y;
    };
}

export default CollisionUtils;
