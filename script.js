// 1. Select all the screens (sections)
const pantallaBienvenida = document.getElementById('pantalla-bienvenida');
const pantallaOpciones = document.getElementById('pantalla-opciones');
const seccionCarta = document.getElementById('seccion-carta');
const seccionGaleria = document.getElementById('seccion-galeria');
const seccionTorta = document.getElementById('seccion-torta');

// 2. Select all the buttons
const btnEmpezar = document.getElementById('btn-empezar');
const btnCarta = document.getElementById('btn-carta');
const btnGaleria = document.getElementById('btn-galeria');
const btnTorta = document.getElementById('btn-torta');
const botonesVolver = document.querySelectorAll('.btn-volver');

// 3. Create a helper function to swap the screens smoothly
function cambiarPantalla(pantallaOcultar, pantallaMostrar) {
    pantallaOcultar.classList.remove('activa');
    pantallaOcultar.classList.add('oculta');
    
    pantallaMostrar.classList.remove('oculta');
    pantallaMostrar.classList.add('activa');
}

// 4. Tell the buttons what to do when clicked
btnEmpezar.addEventListener('click', () => {
    cambiarPantalla(pantallaBienvenida, pantallaOpciones);
});

btnCarta.addEventListener('click', () => {
    cambiarPantalla(pantallaOpciones, seccionCarta);
    efectoMaquinaDeEscribir(); // Inicia el efecto de la máquina de escribir
});

btnGaleria.addEventListener('click', () => {
    cambiarPantalla(pantallaOpciones, seccionGaleria);
});

btnTorta.addEventListener('click', () => {
    cambiarPantalla(pantallaOpciones, seccionTorta);
});

// 5. Make all "Volver" (Back) buttons return to the main menu
botonesVolver.forEach(boton => {
    boton.addEventListener('click', function() {
        // Find which section the clicked button is currently inside
        const seccionActual = this.parentElement;
        cambiarPantalla(seccionActual, pantallaOpciones);
    });
});

// --- Lógica de la Máquina de Escribir ---
const contenedorTexto = document.getElementById('texto-maquina');
// ¡Aquí puedes escribir tu mensaje real! Usa \n para hacer saltos de línea.
const mensajeCarta = "ESTAS SON LAS MAÑANITAS QUE CANTABA EL REY DAVIID \n\nHOY POR SER DIA DE TU SANTO TE LA CANTAMOS A TIIII 🎂🥳 \n\n(es importante esa introducción) \n\n Querida Adri,\n\nHoy celebramos el día en que el mundo se volvió un poco más brillante porque tú llegaste a él. Sabes... este año manifesté intentar nuevas cosas, nuevas emociones, crear mas recuerdos... porque es nuestro ultimo año, y a veces siento que se esta cumpliendo, pero no como uno espera. \n\nPero, a pesar de todo seguimos viviendo. \n\nHoy quiero aprovechar este día especial para agradecerte por todo el apoyo que me has brindado, las conversaciones pasajeras y dentro de ellas los buenos consejos. Algunas fueron profundas, otras bastante graciosas, y unas cuantas probablemente deberían quedarse archivadas para siempre.\n\nDesde el fondo de mi corazón espero que este nuevo año te traiga tantas sonrisas como las que tú nos regalas a todos, todos los días. Disfruta mucho tu cumpleaños, recibe muchos abrazos, come bastante pastel y no te preocupes por los años que cumples, piensa que solo estás acumulando experiencia... aunque algunas personas le llamen edad. \n\n¡Feliz Cumpleañooooooooooooooooooooooooooooooooooooooos!\n\nCon mucho cariño,\nErica";

let indiceEscritura = 0;
let escribiendo = false;

function efectoMaquinaDeEscribir() {
    // Evita que la función corra varias veces a la vez
    if (escribiendo) return; 
    escribiendo = true;
    
    // Limpia el contenedor y añade el cursor
    contenedorTexto.innerHTML = '<span id="cursor" class="cursor"></span>';
    indiceEscritura = 0;
    
    function escribirLetra() {
        if (indiceEscritura < mensajeCarta.length) {
            // Inserta la letra justo antes del cursor
            const cursor = document.getElementById('cursor');
            const letra = mensajeCarta.charAt(indiceEscritura);
            
            // Revisa si es un salto de línea
            if (letra === '\n') {
                cursor.insertAdjacentHTML('beforebegin', '<br>');
            } else {
                cursor.insertAdjacentText('beforebegin', letra);
            }
            
            indiceEscritura++;
            // Ajusta el número '45' para que escriba más rápido o más lento
            setTimeout(escribirLetra, 45); 
        } else {
            escribiendo = false; // Terminó de escribir
        }
    }
    
    // Inicia el efecto con un pequeño retraso
    setTimeout(escribirLetra, 500); 
}

// --- Lógica de la Torta y Confeti ---
const btnApagar = document.getElementById('btn-apagar');
const llamas = document.querySelectorAll('.llama');
const audioCelebracion = document.getElementById('audio-celebracion'); // 1. Seleccionamos el audio

btnApagar.addEventListener('click', () => {
    // 1. Apagar las llamas
    llamas.forEach(llama => llama.classList.add('apagada'));
    
    // 2. Cambiar el texto del botón
    btnApagar.innerText = "¡Deseo pedido! Pero para que se cumpla, presiona varias veces ✨";
    btnApagar.style.backgroundColor = "#5c3a21";

    // 3. ¡Reproducir la música! 🎵
    audioCelebracion.play();

    // 4. Lanzar confeti vintage
    lanzarConfeti();
});


function lanzarConfeti() {
    const colores = ['#8b5a2b', '#c0a080', '#f4ebd0', '#d3c0a5'];
    
    for (let i = 0; i < 100; i++) {
        const confeti = document.createElement('div');
        confeti.classList.add('confeti');
        confeti.style.backgroundColor = colores[Math.floor(Math.random() * colores.length)];
        confeti.style.left = Math.random() * 100 + 'vw';
        confeti.style.top = '-10px';
        confeti.style.transform = `rotate(${Math.random() * 360}deg)`;
        
        document.body.appendChild(confeti);

        // Animación de caída
        const duracion = Math.random() * 3 + 2;
        confeti.animate([
            { transform: `translateY(0) rotate(0deg)`, opacity: 1 },
            { transform: `translateY(100vh) rotate(${Math.random() * 360}deg)`, opacity: 0 }
        ], {
            duration: duracion * 1000,
            easing: 'linear'
        });

        // Limpiar el confeti del HTML después de la animación
        setTimeout(() => confeti.remove(), duracion * 1000);
    }
}