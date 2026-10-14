function reproducirSonido(tipo) {
    try {
        if (typeof SonidosGalaxia !== 'undefined') {
            if (tipo === 'correcto') SonidosGalaxia.correcto();
            else if (tipo === 'error') SonidosGalaxia.error();
            else if (tipo === 'exito') SonidosGalaxia.exito();
            else if (tipo === 'click') SonidosGalaxia.click();
            else if (tipo === 'logro') SonidosGalaxia.logro();
            else if (tipo === 'siguiente') SonidosGalaxia.siguiente();
            else if (tipo === 'tick') SonidosGalaxia.tick();
            else if (tipo === 'alerta') SonidosGalaxia.alerta();
        }
    } catch (e) {
        console.warn('Error de sonido:', e);
    }
}


const AVATARS = ['🧑‍🚀','👩‍🚀','👨‍🚀','🤖','👽','🦸‍♀️','🦸‍♂️','🧙‍♂️'];

const PLANETAS = {
  2: { 
    nombre:'Mercurio', 
    emoji:'🪨', 
    color:'#a0a0a0',
    tituloMision: 'La Forja Solar de Mercurio',
    historia: 'El calor del Sol es extremo. Los paneles de la nave necesitan calibrar su energía en pares de 2. ¡Aprende la Tabla del 2 para activar los escudos térmicos y acceder a los simuladores de vuelo!',
    objeto: 'escudos solares'
  },
  3: { 
    nombre:'Venus', 
    emoji:'🌋', 
    color:'#ff9800',
    tituloMision: 'Los Volcanes Ácidos de Venus',
    historia: 'Tormentas de azufre azotan la atmósfera. Los droides deben sincronizar cristales en grupos de 3 para neutralizar los gases. ¡Domina la Tabla del 3 para despejar la niebla y jugar en la superficie!',
    objeto: 'cristales de energía'
  },
  4: { 
    nombre:'Tierra', 
    emoji:'🌍', 
    color:'#4caf50',
    tituloMision: 'La Estación Orbital Terrestre',
    historia: 'Desde la órbita de nuestro hogar, 4 cuadrantes de satélites necesitan alineación matemática. ¡Aprende la Tabla del 4 para enviar las coordenadas a la Tierra y desbloquear las misiones!',
    objeto: 'satélites de rescate'
  },
  5: { 
    nombre:'Marte', 
    emoji:'🔴', 
    color:'#f44336',
    tituloMision: 'La Base Marciana Roja',
    historia: 'Una tormenta de arena roja cubre la colonia. Cada rover de auxilio viaja en patrullas de 5 miembros. ¡Aprende la Tabla del 5 para encender las balizas y abrir los juegos de supervivencia!',
    objeto: 'naves rover'
  },
  6: { 
    nombre:'Júpiter', 
    emoji:'🟤', 
    color:'#ff7043',
    tituloMision: 'El Ojo del Gigante Júpiter',
    historia: 'Entras al gigante gaseoso. La Gran Mancha Roja crea campos de gravedad que requieren patrones de 6 núcleos de energía. ¡Aprende la Tabla del 6 para estabilizar la nave y comenzar el entrenamiento!',
    objeto: 'núcleos de plasma'
  },
  7: { 
    nombre:'Saturno', 
    emoji:'🪐', 
    color:'#ffd54f',
    tituloMision: 'Los Anillos Brillantes de Saturno',
    historia: 'Los asteroides de hielo en los anillos giran en 7 órbitas magnéticas. Para navegar sin chocar, debes calcular sus trayectorias. ¡Aprende la Tabla del 7 para activar los propulsores!',
    objeto: 'anillos de hielo'
  },
  8: { 
    nombre:'Urano', 
    emoji:'🔵', 
    color:'#29b6f6',
    tituloMision: 'El Abismo Congelado de Urano',
    historia: 'El frío cósmico amenaza los reactores de la nave. 8 generadores de calor deben sincronizarse a la perfección. ¡Aprende la Tabla del 8 para romper el hielo y jugar en la atmósfera!',
    objeto: 'cápsulas térmicas'
  },
  9: { 
    nombre:'Neptuno', 
    emoji:'🌊', 
    color:'#5c6bc0',
    tituloMision: 'Los Vórtices Cósmicos de Neptuno',
    historia: 'Los vientos supersónicos de Neptuno son los más veloces del sistema solar. Calcula con la Tabla del 9 las 9 corrientes de navegación para poder surcar las tormentas de gas.',
    objeto: 'balizas marinas'
  },
  10: { 
    nombre:'Plutón', 
    emoji:'⚪', 
    color:'#ce93d8',
    tituloMision: 'La Frontera Final de Plutón',
    historia: 'En el borde exterior de la galaxia, la baliza cósmica requiere 10 códigos numéricos decodificados. ¡Aprende la Tabla del 10 para coronarte como Guardián de la Galaxia y jugar las misiones finales!',
    objeto: 'medallas galácticas'
  }
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
    
    // Reproducir sonido según tipo de notificación
    if (tipo === 'exito') reproducirSonido('correcto');
    else if (tipo === 'error') reproducirSonido('error');
    else reproducirSonido('click');
    
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
        
        let estadoMisionBadge = '';
        if (desbloqueado) {
            if (tablaData.aprendida) {
                estadoMisionBadge = `<span style="font-size: 0.72rem; padding: 2px 8px; border-radius: 10px; background: rgba(0,230,118,0.2); color: #69f0ae; border: 1px solid rgba(0,230,118,0.4); margin-top: 4px;">🎮 Juegos Libres</span>`;
            } else {
                estadoMisionBadge = `<span style="font-size: 0.72rem; padding: 2px 8px; border-radius: 10px; background: rgba(255,107,53,0.2); color: #ffb74d; border: 1px solid rgba(255,107,53,0.4); margin-top: 4px;">📜 Misión: Aprender</span>`;
            }
        }

        card.innerHTML = `
            ${esferaPlanetaHTML}
            <div class="planeta-nombre">${planetaInfo.nombre}</div>
            <div class="planeta-tabla">Tabla del ${i}</div>
            ${estadoMisionBadge}
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
    const d = window.datosEstudiante;
    const tablaData = d.tablas[numTabla] || { aprendida: false, estrellas: 0 };
    const estaAprendida = tablaData.aprendida;
    
    // Si ya existe modal previo, removerlo
    let modalPrevio = document.getElementById('modal-planeta');
    if (modalPrevio) modalPrevio.remove();

    const modal = document.createElement('div');
    modal.id = 'modal-planeta';
    modal.className = 'modal-overlay anim-fade-in';
    modal.innerHTML = `
        <div class="modal-card anim-bounce">
            <div class="planeta-esfera-wrapper" style="margin: 0 auto 12px auto; width: 85px; height: 85px;">
                ${numTabla === 7 ? '<div class="anillo-saturno" style="width: 110px; height: 32px;"></div>' : ''}
                <div class="planeta-esfera planeta-${numTabla}" style="width: 75px; height: 75px;"></div>
            </div>
            <h2 style="color: var(--color-gold); font-size: 1.7rem; margin-bottom: 2px;">${planeta.nombre}</h2>
            <p style="color: var(--color-primary); font-size: 1.1rem; font-weight: bold; margin-bottom: 12px;">Tabla del ${numTabla}</p>
            
            <!-- Caja de Historia y Misión -->
            <div class="modal-historia-caja">
                <div class="modal-historia-titulo">
                    <span>📜</span> Misión: ${planeta.tituloMision}
                </div>
                <div class="modal-historia-texto">
                    "${planeta.historia}"
                </div>
                ${!estaAprendida ? `
                    <div class="modal-mision-alerta">
                        <span>⚠️</span> <strong>Fase obligatoria:</strong> Debes dominar la lección de la Tabla del ${numTabla} para calibrar los sistemas antes de desbloquear los juegos.
                    </div>
                ` : `
                    <div class="modal-mision-alerta completada">
                        <span>✅</span> <strong>¡Sistemas Calibrados!</strong> Has aprendido esta tabla. ¡Los simuladores y misiones de combate están listos!
                    </div>
                `}
            </div>

            <!-- Botones de Acción -->
            <div style="display: flex; gap: 12px; justify-content: center; flex-wrap: wrap;">
                <button class="btn-primario ${!estaAprendida ? 'btn-mision-activa' : ''}" id="modal-btn-aprender" style="min-width: 160px;">
                    📖 ${estaAprendida ? 'Repasar Lección' : '1. Aprender Tabla'}
                </button>
                <button class="${estaAprendida ? 'btn-acento' : 'btn-secundario btn-bloqueado-candado'}" id="modal-btn-jugar" style="min-width: 160px;">
                    ${estaAprendida ? '🎮 2. Jugar Misiones' : '🔒 Jugar (Bloqueado)'}
                </button>
            </div>
            <button class="btn-secundario" id="modal-btn-cerrar" style="margin-top: 20px; padding: 6px 20px; font-size: 0.9rem;">Volver al Mapa</button>
        </div>
    `;

    document.body.appendChild(modal);

    document.getElementById('modal-btn-aprender').onclick = () => {
        modal.remove();
        if(typeof iniciarAprendizaje === 'function') iniciarAprendizaje(numTabla);
    };

    document.getElementById('modal-btn-jugar').onclick = () => {
        if (!estaAprendida) {
            mostrarNotificacion(`🔒 ¡Misión bloqueada! Debes aprender y completar la Tabla del ${numTabla} primero.`, 'error');
            return;
        }
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

function reiniciarProgreso() {
    if(confirm('⚠️ ¿Estás seguro? Se borrará TODO el progreso del estudiante actual y se volverá a la pantalla de inicio. Esta acción no se puede deshacer.')) {
        localStorage.removeItem('galaxiaMultiplicadora');
        reproducirSonido('click');
        window.location.href = '../index.html';
    }
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
