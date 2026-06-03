// Cuando la página termina de cargar, ejecutamos esta función
document.addEventListener("DOMContentLoaded", async () => {

  // Le pedimos los platos a nuestra API
  const respuesta = await fetch("/api/platos?destacados=true");
  
  // Convertimos la respuesta a JSON
  const platos = await respuesta.json();

  // Agarramos el contenedor donde vamos a meter los platos
  const contenedor = document.getElementById("container-products");

  // Recorremos cada plato y creamos su card HTML
  platos.forEach((plato) => {
    // Creamos un div para cada plato
    const card = document.createElement("div");
    card.classList.add("card-plato");

    // Le ponemos el HTML adentro con los datos del plato
    card.innerHTML = `
      <h3>${plato.nombre}</h3>
      <p>${plato.descripcion}</p>
      <div></div>
      <span>$${plato.precio}</span>
    `;

    // Agregamos la card al contenedor
    contenedor.appendChild(card);
  }); 
});

// ─────────────────────────────────────────────
// FORMULARIO DE RESERVA → WHATSAPP
// Toma los datos del formulario y abre WhatsApp
// con un mensaje predefinido listo para enviar
// ─────────────────────────────────────────────

document.getElementById("form-reservation").addEventListener("submit", (e) => {
    // Evitamos que el formulario recargue la página
    e.preventDefault();

    // Leemos los datos del formulario
    const nombre = document.getElementById("fname").value.trim();
    const apellido = document.getElementById("fsurname").value.trim();
    const cantidad = document.getElementById("fquantity").value.trim();
    const telefono = document.getElementById("fphonenumber").value.trim();

    // Validación básica
    if (!nombre || !apellido || !cantidad || !telefono) {
        alert("Por favor completá todos los campos");
        return;
    }

    // Armamos los emojis de forma ultra segura
    const emojiUsuario = String.fromCodePoint(0x1F464);  // 👤
    const emojiGrupo = String.fromCodePoint(0x1F465);    // 👥
    const emojiCelular = String.fromCodePoint(0x1F4F1);  // 📱

    // Armamos el mensaje
    const mensaje = `Hola! Quisiera hacer una reserva:
${emojiUsuario} Nombre: ${nombre} ${apellido}
${emojiGrupo} Personas: ${cantidad}
${emojiCelular} Teléfono: ${telefono}`;

    console.log("Mensaje original:", mensaje);

    // Número del restaurante (con código de país, sin espacios ni guiones)
    // Argentina → 54 + código de área sin 0 + número sin 15
    const numeroRestaurante = "5491127353665";

    // Codificamos el mensaje para la URL
    const mensajeCodificado = encodeURIComponent(mensaje);

    // Abrimos WhatsApp en una nueva pestaña
    window.open(`https://wa.me/${numeroRestaurante}?text=${mensajeCodificado}`, "_blank");
});