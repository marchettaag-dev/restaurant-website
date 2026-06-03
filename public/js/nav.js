// Guardamos la posición del scroll anterior para saber si subimos o bajamos
let scrollAnterior = 0;

window.addEventListener("scroll", () => {
    const scrollActual = window.scrollY;

    if (scrollActual > scrollAnterior && scrollActual > 80) {
        // Si bajamos y ya pasamos el header, lo ocultamos
        document.querySelector("header").classList.add("header-oculto");
    } else {
        // Si subimos, lo mostramos
        document.querySelector("header").classList.remove("header-oculto");
    }

    scrollAnterior = scrollActual;
});