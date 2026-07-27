/**
 * script.js - Lógica Front-End para el sitio web estático (Vanilla JS)
 */

document.addEventListener("DOMContentLoaded", () => {
    // ==========================================
    // LÓGICA DEL CARRUSEL DE NOVEDADES
    // ==========================================
    
    // 1. Seleccionamos los elementos del DOM necesarios
    const slides = document.querySelectorAll(".novedades__item");
    const indicadores = document.querySelectorAll(".carrusel__indicador");
    const flechaSiguiente = document.querySelector(".carrusel__flecha");

    let slideActual = 0;

    /**
     * Función para actualizar el estado visual del carrusel
     * @param {number} indice - Índice de la noticia a mostrar
     */
    const actualizarCarrusel = (indice) => {
        // Mostramos el slide correspondiente y ocultamos los demás
        slides.forEach((slide, i) => {
            if (i === indice) {
                slide.style.display = "block";
            } else {
                slide.style.display = "none";
            }
        
    // ==========================================
    // LÓGICA DEL CARRUSEL DE ENCUENTROS
    // ==========================================
    const contenedorEncuentros = document.getElementById("encuentros-scroll");
    const flechaEncuentros = document.querySelector(".carrusel-encuentros__flecha");

    if (flechaEncuentros && contenedorEncuentros) {
        flechaEncuentros.addEventListener("click", () => {
            // Obtenemos el ancho de una tarjeta usando el primer hijo
            const tarjetaWidth = contenedorEncuentros.firstElementChild.offsetWidth;
            // Sumamos el gap aproximado (ej. 16px) o simplemente deslizamos el ancho de la tarjeta entera
            const scrollAmount = tarjetaWidth + 16;
            
            // Verificamos si estamos cerca del final para volver al inicio, o simplemente avanzar
            if (contenedorEncuentros.scrollLeft + contenedorEncuentros.clientWidth >= contenedorEncuentros.scrollWidth - 10) {
                contenedorEncuentros.scrollTo({ left: 0, behavior: "smooth" });
            } else {
                contenedorEncuentros.scrollBy({ left: scrollAmount, behavior: "smooth" });
            }
        });
    }

});

        // Actualizamos las clases y atributos de los indicadores
        indicadores.forEach((indicador, i) => {
            if (i === indice) {
                indicador.classList.add("carrusel__indicador--activo");
                indicador.setAttribute("aria-selected", "true");
            } else {
                indicador.classList.remove("carrusel__indicador--activo");
                indicador.setAttribute("aria-selected", "false");
            }
        });
    };

    // Inicializamos el carrusel mostrando únicamente la primera noticia
    if (slides.length > 0) {
        actualizarCarrusel(slideActual);
    }

    // 2. Evento para avanzar a la siguiente noticia mediante la flecha
    if (flechaSiguiente) {
        flechaSiguiente.addEventListener("click", () => {
            slideActual = (slideActual + 1) % slides.length;
            actualizarCarrusel(slideActual);
        });
    }

    // 3. Evento para navegar directamente a través de los indicadores
    indicadores.forEach((indicador, index) => {
        indicador.addEventListener("click", () => {
            slideActual = index;
            actualizarCarrusel(slideActual);
        });
    });
});
