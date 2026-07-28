/**
 * script.js - Lógica Front-End para el sitio web estático (Vanilla JS)
 */

document.addEventListener("DOMContentLoaded", () => {
    // ==========================================
    // LÓGICA DEL CARRUSEL DE NOVEDADES
    // ==========================================
    
    const contenedorNovedades = document.querySelector(".novedades__carrusel");
    const indicadores = document.querySelectorAll(".carrusel__indicador");
    const flechaSiguiente = document.querySelector(".carrusel__flecha");

    let autoSlideInterval;

    const getSlideIndex = () => {
        if (!contenedorNovedades) return 0;
        const width = contenedorNovedades.clientWidth;
        if (width === 0) return 0;
        return Math.round(contenedorNovedades.scrollLeft / width);
    };

    const actualizarIndicadores = () => {
        const indice = getSlideIndex();
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

    const avanzarNovedades = () => {
        if (!contenedorNovedades) return;
        const width = contenedorNovedades.clientWidth;
        const maxScroll = contenedorNovedades.scrollWidth - contenedorNovedades.clientWidth;
        
        if (contenedorNovedades.scrollLeft >= maxScroll - 10) {
            contenedorNovedades.scrollTo({ left: 0, behavior: "smooth" });
        } else {
            contenedorNovedades.scrollBy({ left: width, behavior: "smooth" });
        }
    };

    if (contenedorNovedades) {
        contenedorNovedades.addEventListener("scroll", () => {
            actualizarIndicadores();
        });

        autoSlideInterval = setInterval(avanzarNovedades, 10000);
    }

    if (flechaSiguiente) {
        flechaSiguiente.addEventListener("click", () => {
            avanzarNovedades();
            clearInterval(autoSlideInterval);
            autoSlideInterval = setInterval(avanzarNovedades, 10000);
        });
    }

    indicadores.forEach((indicador, index) => {
        indicador.addEventListener("click", () => {
            if (!contenedorNovedades) return;
            const width = contenedorNovedades.clientWidth;
            contenedorNovedades.scrollTo({ left: width * index, behavior: "smooth" });
            clearInterval(autoSlideInterval);
            autoSlideInterval = setInterval(avanzarNovedades, 10000);
        });
    });

    // ==========================================
    // LÓGICA DEL CARRUSEL DE ENCUENTROS
    // ==========================================
    const contenedorEncuentros = document.getElementById("encuentros-scroll");
    const flechaEncuentros = document.querySelector(".carrusel-encuentros__flecha");

    if (flechaEncuentros && contenedorEncuentros) {
        flechaEncuentros.addEventListener("click", () => {
            const tarjetaWidth = contenedorEncuentros.firstElementChild.offsetWidth;
            const scrollAmount = tarjetaWidth + 16;
            
            if (contenedorEncuentros.scrollLeft + contenedorEncuentros.clientWidth >= contenedorEncuentros.scrollWidth - 10) {
                contenedorEncuentros.scrollTo({ left: 0, behavior: "smooth" });
            } else {
                contenedorEncuentros.scrollBy({ left: scrollAmount, behavior: "smooth" });
            }
        });
    }
});
