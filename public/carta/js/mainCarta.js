

document.addEventListener("DOMContentLoaded", async ()=>{

    const respuesta = await fetch("/api/platos?disponible=true");

    const platos = await respuesta.json();

    // Sacamos las categorías únicas de los platos que ya tenemos
    // Set elimina los duplicados automáticamente
    const categorias = [...new Set(platos.map(plato => plato.categoria))];

    const contenedor = document.getElementById("container-platos");

    // Por cada categoría creamos una sección con sus platos
    categorias.forEach(categoria => {

        // Filtramos los platos de esta categoría
        const platosDeLaCategoria = platos.filter(p => p.categoria === categoria);

        // Creamos el título de la sección
        const titulo = document.createElement("h2");
        titulo.classList.add("titulo-categoria");
        titulo.textContent = categoria;
        contenedor.appendChild(titulo);

        // Creamos el contenedor de las cards de esta categoría
        const grid = document.createElement("div");
        grid.classList.add("grid-categoria");
        contenedor.appendChild(grid);

        // Creamos cada card
        platosDeLaCategoria.forEach(plato => {
            const card = document.createElement("div");
            card.classList.add("card-menu");
            card.innerHTML = `
                <div class="informacion-plato">
                    <h3>${plato.nombre}</h3>
                    <p>${plato.descripcion}</p>
                </div>
                <div class="linea-punteada"></div>
                <div class="precio-plato">
                    <span>$${plato.precio}</span>
                </div>
            `;
            grid.appendChild(card);
        });
    });
});