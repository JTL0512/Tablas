const AVATARS = ['🧑‍🚀','👩‍🚀','👨‍🚀','🤖','👽','🦸‍♀️','🦸‍♂️','🧙‍♂️'];

const PLANETAS = {
  2: { nombre:'Mercurio', emoji:'🪨', color:'#a0a0a0' },
  3: { nombre:'Venus', emoji:'🌋', color:'#ff9800' },
  4: { nombre:'Tierra', emoji:'🌍', color:'#4caf50' },
  5: { nombre:'Marte', emoji:'🔴', color:'#f44336' },
  6: { nombre:'Júpiter', emoji:'🟤', color:'#ff7043' },
  7: { nombre:'Saturno', emoji:'🪐', color:'#ffd54f' },
  8: { nombre:'Urano', emoji:'🔵', color:'#29b6f6' },
  9: { nombre:'Neptuno', emoji:'🌊', color:'#5c6bc0' },
  10: { nombre:'Plutón', emoji:'⚪', color:'#ce93d8' }
};

const LOGROS = [
  {id:'primera_tabla', nombre:'🌟 Primera Conquista', desc:'Aprendiste tu primera tabla'},
  {id:'tres_tablas', nombre:'🚀 Explorador Espacial', desc:'Completaste 3 tablas'},
  {id:'cinco_tablas', nombre:'🌌 Viajero Galáctico', desc:'Completaste 5 tablas'},
  {id:'todas_tablas', nombre:'👑 Maestro del Universo', desc:'Completaste todas las tablas'},
  {id:'puntaje_500', nombre:'⚡ Supernova', desc:'Alcanzaste 500 puntos'},
  {id:'puntaje_1000', nombre:'🏆 Leyenda Cósmica', desc:'Alcanzaste 1000 puntos'},
  {id:'simce_completo', nombre:'📝 Científico Estelar', desc:'Completaste el ensayo SIMCE'},
  {id:'simce_perfecto', nombre:'🎯 Genio Matemático', desc:'Puntaje perfecto en SIMCE'},
  {id:'racha_5', nombre:'🔥 En Llamas', desc:'5 respuestas correctas seguidas'},
  {id:'velocista', nombre:'⏱️ Velocista Estelar', desc:'Completaste un desafío contrarreloj'},
  {id:'detective', nombre:'🔍 Detective Espacial', desc:'Resolviste un caso como detective'},
  {id:'memoria_perfecta', nombre:'🧠 Memoria Galáctica', desc:'Memoria perfecta sin errores'}
];

window.tablaActual = null;
window.juegoActual = null;
window.datosEstudiante = null;

function obtenerDatos() {
    const datos = localStorage.getItem('galaxiaMultiplicadora');
    return datos ? JSON.parse(datos) : null;
}

function guardarDatos(datos) {
    localStorage.setItem('galaxiaMultiplicadora', JSON.stringify(datos));
    window.datosEstudiante = datos;
}

function navegarA(seccionId) {
    document.querySelectorAll('.pantalla').forEach(p => {
        p.style.display = 'none';
        p.classList.remove('anim-fade-in');
    });
    const seccion = document.getElementById(seccionId);
    if(seccion) {
        seccion.style.display = 'block';
        seccion.classList.add('anim-fade-in');
    }
}

function volverMenu() {
    navegarA('pantalla-menu');
    renderizarMenu();
}

function mostrarNotificacion(mensaje, tipo = 'info') {
    let container = document.getElementById('notificacion-container');
    if(!container) {
        container = document.createElement('div');
        container.id = 'notificacion-container';
        container.style.position = 'fixed';
        container.style.top = '20px';
        container.style.right = '20px';
        container.style.zIndex = '9999';
        document.body.appendChild(container);
    }
    
    const notif = document.createElement('div');
    notif.className = `notificacion ${tipo} anim-slide-up`;
    notif.innerHTML = mensaje;
    container.appendChild(notif);
    
    setTimeout(() => {
        notif.style.opacity = '0';
        setTimeout(() => notif.remove(), 300);
    }, 3000);
}

function renderizarMenu() {
    const d = window.datosEstudiante;
    document.getElementById('menu-avatar').textContent = AVATARS[d.avatar] || AVATARS[0];
    document.getElementById('menu-nombre').textContent = d.nombre;
    document.getElementById('menu-puntaje').textContent = d.puntajeTotal + ' pts';
    
    const mapa = document.getElementById('mapa-galaxia');
    mapa.innerHTML = '';
    
    let delay = 0;
    
    for (let i = 2; i <= 10; i++) {
        const planetaInfo = PLANETAS[i];
        const tablaData = d.tablas[i];
        const prevTablaData = i > 2 ? d.tablas[i - 1] : null;
        
        const desbloqueado = i === 2 || (prevTablaData && prevTablaData.aprendida);
        
        const card = document.createElement('div');
        card.className = `tarjeta-planeta anim-bounce ${desbloqueado ? '' : 'bloqueado'} ${tablaData.aprendida ? 'completado' : ''}`;
        card.style.animationDelay = `${delay}s`;
        delay += 0.1;
        
        let estrellasHTML = '';
        for(let s = 1; s <= 3; s++) {
            estrellasHTML += `<span class="estrella ${s <= tablaData.estrellas ? 'activa' : 'inactiva'}">⭐</span>`;
        }
        
        let esferaPlanetaHTML = '';
        if (desbloqueado) {
            esferaPlanetaHTML = `
                <div class="planeta-esfera-wrapper">
                    ${i === 7 ? '<div class="anillo-saturno"></div>' : ''}
                    <div class="planeta-esfera planeta-${i}"></div>
                </div>
            `;
        } else {
            esferaPlanetaHTML = `
                <div class="planeta-esfera-wrapper">
                    <span class="planeta-candado">🔒</span>
                </div>
            `;
        }
        
        card.innerHTML = `
            ${esferaPlanetaHTML}
            <div class="planeta-nombre">${planetaInfo.nombre}</div>
            <div class="planeta-tabla">Tabla del ${i}</div>
            <div class="planeta-estrellas">${desbloqueado ? estrellasHTML : ''}</div>
        `;
        
        if (desbloqueado) {
            card.onclick = () => mostrarOpcionesPlaneta(i);
        }
        
        mapa.appendChild(card);
    }
    
    const btnSimce = document.getElementById('btn-simce');
    if (btnSimce) {
        if (d.simceDesbloqueado) {
            btnSimce.disabled = false;
            btnSimce.classList.remove('bloqueado');
        } else {
            btnSimce.disabled = true;
            btnSimce.classList.add('bloqueado');
        }
    }
}

function mostrarOpcionesPlaneta(numTabla) {
    window.tablaActual = numTabla;
    const planeta = PLANETAS[numTabla];
    
    // Si ya existe modal previo, removerlo
    let modalPrevio = document.getElementById('modal-planeta');
    if (modalPrevio) modalPrevio.remove();

    const modal = document.createElement('div');
    modal.id = 'modal-planeta';
    modal.className = 'modal-overlay anim-fade-in';
    modal.innerHTML = `
        <div class="modal-card anim-bounce">
            <div class="planeta-esfera-wrapper" style="margin: 0 auto 15px auto; width: 85px; height: 85px;">
                ${numTabla === 7 ? '<div class="anillo-saturno" style="width: 110px; height: 32px;"></div>' : ''}
                <div class="planeta-esfera planeta-${numTabla}" style="width: 75px; height: 75px;"></div>
            </div>
            <h2 style="color: var(--color-gold); font-size: 1.8rem; margin-bottom: 5px;">${planeta.nombre}</h2>
            <p style="color: var(--color-primary); font-size: 1.2rem; font-weight: bold; margin-bottom: 20px;">Tabla del ${numTabla}</p>
            <p style="color: var(--color-text-muted); margin-bottom: 25px;">¿Qué misión deseas emprender, astronauta?</p>
            <div style="display: flex; gap: 15px; justify-content: center; flex-wrap: wrap;">
                <button class="btn-primario" id="modal-btn-aprender" style="min-width: 150px;">📖 Aprender</button>
                <button class="btn-acento" id="modal-btn-jugar" style="min-width: 150px;">🎮 Misiones y Juegos</button>
            </div>
            <button class="btn-secundario" id="modal-btn-cerrar" style="margin-top: 20px; padding: 6px 20px; font-size: 0.9rem;">Cerrar</button>
        </div>
    `;

    document.body.appendChild(modal);

    document.getElementById('modal-btn-aprender').onclick = () => {
        modal.remove();
        if(typeof iniciarAprendizaje === 'function') iniciarAprendizaje(numTabla);
    };

    document.getElementById('modal-btn-jugar').onclick = () => {
        modal.remove();
        if(typeof mostrarMenuJuegos === 'function') mostrarMenuJuegos(numTabla);
    };

    document.getElementById('modal-btn-cerrar').onclick = () => {
        modal.remove();
    };
}

function cerrarSesion() {
    localStorage.removeItem('galaxiaMultiplicadora');
    window.location.href = '../index.html';
}

function shuffle(array) {
    let currentIndex = array.length, randomIndex;
    while (currentIndex != 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
    return array;
}

function generarOpciones(correcta, tabla) {
    let opciones = [correcta];
    while(opciones.length < 4) {
        let op = tabla * (Math.floor(Math.random() * 10) + 1);
        if(!opciones.includes(op)) opciones.push(op);
    }
    return shuffle(opciones);
}

function salirJuego() {
    if(confirm('¿Estás seguro de que quieres salir del juego? Tu progreso se perderá.')) {
        if (typeof mostrarMenuJuegos === 'function') mostrarMenuJuegos(window.tablaActual);
    }
}

function confirmarSalirSimce() {
    if(confirm('¿Seguro que quieres salir del SIMCE? Tus respuestas no se guardarán.')) {
        volverMenu();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const datos = obtenerDatos();
    if (!datos) { 
        console.warn("No hay datos de estudiante. Asegúrate de iniciar sesión.");
        // window.location.href = '../index.html'; // Uncomment in prod
        // return; 
    } else {
        window.datosEstudiante = datos;
    }
    
    // Si hay datos, vamos al menú
    if (window.datosEstudiante) {
        navegarA('pantalla-menu');
        renderizarMenu();
    }
});
