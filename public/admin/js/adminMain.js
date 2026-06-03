// ─────────────────────────────────────────────
// VARIABLES GLOBALES
// ─────────────────────────────────────────────

// ID del plato que estamos editando, null si estamos agregando uno nuevo
let idEditando = null;

// ─────────────────────────────────────────────
// FUNCIONES DE TOKEN
// El token se guarda en localStorage para que
// no se pierda si el dueño recarga la página
// ─────────────────────────────────────────────

const guardarToken = (token) => localStorage.setItem("token", token);
const obtenerToken = () => localStorage.getItem("token");
const borrarToken = () => localStorage.removeItem("token");

// ─────────────────────────────────────────────
// MOSTRAR PANTALLA DE LOGIN O PANEL
// ─────────────────────────────────────────────

const mostrarPanel = () => {
    document.getElementById("pantalla-login").classList.add("oculto");
    document.getElementById("panel-admin").classList.remove("oculto");
    cargarPlatos();
};

const mostrarLogin = () => {
    document.getElementById("pantalla-login").classList.remove("oculto");
    document.getElementById("panel-admin").classList.add("oculto");
};

// ─────────────────────────────────────────────
// AL CARGAR LA PÁGINA
// Si ya hay un token guardado, mostramos el panel
// Si no, mostramos el login
// ─────────────────────────────────────────────

document.addEventListener("DOMContentLoaded", () => {
    if (obtenerToken()) {
        mostrarPanel();
    } else {
        mostrarLogin();
    }
});

// ─────────────────────────────────────────────
// LOGIN
// ─────────────────────────────────────────────

document.getElementById("btn-login").addEventListener("click", async () => {
    const usuario = document.getElementById("login-usuario").value.trim();
    const password = document.getElementById("login-password").value.trim();
    const errorMsg = document.getElementById("login-error");

    try {
        const respuesta = await fetch("/api/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ usuario, password })
        });

        const datos = await respuesta.json();

        if (!respuesta.ok) {
            // Si el servidor devolvió error mostramos el mensaje
            errorMsg.textContent = datos.error;
            return;
        }

        // Guardamos el token y mostramos el panel
        guardarToken(datos.token);
        errorMsg.textContent = "";
        mostrarPanel();

    } catch (error) {
        errorMsg.textContent = "Error al conectar con el servidor";
    }
});

// ─────────────────────────────────────────────
// LOGOUT
// ─────────────────────────────────────────────

document.getElementById("btn-logout").addEventListener("click", () => {
    borrarToken();
    mostrarLogin();
});

// ─────────────────────────────────────────────
// CARGAR Y MOSTRAR PLATOS
// ─────────────────────────────────────────────

const cargarPlatos = async () => {
    const lista = document.getElementById("lista-platos");
    lista.innerHTML = "Cargando...";

    try {
        const respuesta = await fetch("/api/platos");
        const platos = await respuesta.json();

        lista.innerHTML = "";

        if (platos.length === 0) {
            lista.innerHTML = "<p>No hay platos cargados.</p>";
            return;
        }

        platos.forEach(plato => {
            const item = document.createElement("div");
            item.classList.add("plato-item");

            item.innerHTML = `
                <div class="plato-item-info">
                    <strong>${plato.nombre}</strong>
                    <span>$${plato.precio} — ${plato.categoria}</span>
                    <small>
                        ${plato.disponible ? "✅ Disponible" : "❌ No disponible"} 
                        ${plato.destacados ? "⭐ Destacado" : ""}
                    </small>
                </div>
                <div class="plato-item-btns">
                    <button class="btn-editar" data-id="${plato._id}">Editar</button>
                    <button class="btn-borrar" data-id="${plato._id}">Borrar</button>
                </div>
            `;

            // Botón editar
            item.querySelector(".btn-editar").addEventListener("click", () => {
                cargarFormularioEdicion(plato);
            });

            // Botón borrar
            item.querySelector(".btn-borrar").addEventListener("click", () => {
                borrarPlato(plato._id);
            });

            lista.appendChild(item);
        });

    } catch (error) {
        lista.innerHTML = "<p>Error al cargar los platos.</p>";
    }
};

// ─────────────────────────────────────────────
// GUARDAR PLATO (AGREGAR O EDITAR)
// ─────────────────────────────────────────────

document.getElementById("btn-guardar").addEventListener("click", async () => {
    const errorMsg = document.getElementById("form-error");
    const exitoMsg = document.getElementById("form-exito");
    errorMsg.textContent = "";
    exitoMsg.textContent = "";

    // Leemos los valores del formulario
    const plato = {
        nombre: document.getElementById("input-nombre").value.trim(),
        descripcion: document.getElementById("input-descripcion").value.trim(),
        precio: Number(document.getElementById("input-precio").value),
        categoria: document.getElementById("input-categoria").value.trim(),
        imagen: document.getElementById("input-imagen").value.trim() || null,
        disponible: document.getElementById("input-disponible").checked,
        destacados: document.getElementById("input-destacado").checked,
    };

    // Definimos si es POST (nuevo) o PUT (edición)
    const url = idEditando ? `/api/platos/${idEditando}` : "/api/platos";
    const method = idEditando ? "PUT" : "POST";

    try {
        const respuesta = await fetch(url, {
            method,
            headers: {
                "Content-Type": "application/json",
                // Mandamos el token en el header Authorization
                "Authorization": `Bearer ${obtenerToken()}`
            },
            body: JSON.stringify(plato)
        });

        const datos = await respuesta.json();

        if (!respuesta.ok) {
            errorMsg.textContent = datos.error || "Error al guardar el plato";
            return;
        }

        // Todo salió bien
        exitoMsg.textContent = idEditando ? "Plato actualizado correctamente" : "Plato agregado correctamente";
        limpiarFormulario();
        cargarPlatos();

    } catch (error) {
        errorMsg.textContent = "Error al conectar con el servidor";
    }
});

// ─────────────────────────────────────────────
// CARGAR DATOS EN EL FORMULARIO PARA EDITAR
// ─────────────────────────────────────────────

const cargarFormularioEdicion = (plato) => {
    // Guardamos el ID del plato que estamos editando
    idEditando = plato._id;

    // Llenamos el formulario con los datos del plato
    document.getElementById("input-nombre").value = plato.nombre;
    document.getElementById("input-descripcion").value = plato.descripcion;
    document.getElementById("input-precio").value = plato.precio;
    document.getElementById("input-categoria").value = plato.categoria;
    document.getElementById("input-imagen").value = plato.imagen || "";
    document.getElementById("input-disponible").checked = plato.disponible;
    document.getElementById("input-destacado").checked = plato.destacados;

    // Cambiamos el título y mostramos el botón cancelar
    document.getElementById("form-titulo").textContent = "Editar Plato";
    document.getElementById("btn-cancelar").classList.remove("oculto");

    // Scrolleamos al formulario
    document.getElementById("form-titulo").scrollIntoView({ behavior: "smooth" });
};

// ─────────────────────────────────────────────
// CANCELAR EDICIÓN
// ─────────────────────────────────────────────

document.getElementById("btn-cancelar").addEventListener("click", () => {
    limpiarFormulario();
});

// ─────────────────────────────────────────────
// LIMPIAR FORMULARIO
// ─────────────────────────────────────────────

const limpiarFormulario = () => {
    idEditando = null;

    document.getElementById("input-nombre").value = "";
    document.getElementById("input-descripcion").value = "";
    document.getElementById("input-precio").value = "";
    document.getElementById("input-categoria").value = "";
    document.getElementById("input-imagen").value = "";
    document.getElementById("input-disponible").checked = true;
    document.getElementById("input-destacado").checked = false;

    document.getElementById("form-titulo").textContent = "Agregar Plato";
    document.getElementById("btn-cancelar").classList.add("oculto");
    document.getElementById("form-error").textContent = "";
    document.getElementById("form-exito").textContent = "";
};

// ─────────────────────────────────────────────
// BORRAR PLATO
// ─────────────────────────────────────────────

const borrarPlato = async (id) => {
    // Pedimos confirmación antes de borrar
    if (!confirm("¿Seguro que querés borrar este plato?")) return;

    try {
        const respuesta = await fetch(`/api/platos/${id}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${obtenerToken()}`
            }
        });

        if (!respuesta.ok) {
            alert("Error al borrar el plato");
            return;
        }

        // Recargamos la lista
        cargarPlatos();

    } catch (error) {
        alert("Error al conectar con el servidor");
    }
};
